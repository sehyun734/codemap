import { useCallback } from 'react'
import { useMonacoStore } from 'shared/store/useMonacoStore'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import { parseText } from '../util/parseText'
import { getDecorations } from '../util/getDecorations'
import { getSuggestions } from '../util/getSuggestions'
import { CONST } from 'shared/const/const'

export const useMonacoUpdate = (
  decorationsRef,
  suggestionsRef,
  updateTimeoutRef
) => {
  const updateNodesAndConnections = useCallback((newNodes, newConns) => {
    const {
      nodes: oldNodes,
      updateNode,
      deleteNode,
      connections: oldConns,
      updateConnection,
      deleteConnection,
      screenRef,
      screenPosition,
      screenScale,
    } = useDiagramStore.getState()

    // nodes 업데이트 로직
    Object.keys(oldNodes).forEach((key) => !newNodes[key] && deleteNode(key))
    Object.entries(newNodes).forEach(([key, newNode]) => {
      const roundToGrid = (size) =>
        Math.ceil(size / CONST.GRID_SIZE) * CONST.GRID_SIZE

      const oldNode = oldNodes[key]
      if (!oldNode) {
        // 새 노드 추가
        updateNode({
          ...newNode,
          position: {
            x: roundToGrid(
              (-screenPosition.x + screenRef.current.offsetWidth / 2) /
                screenScale
            ),
            y: roundToGrid(
              (-screenPosition.y + screenRef.current.offsetHeight / 2) /
                screenScale
            ),
          },
          size: { width: undefined, height: undefined },
        })
      } else if (oldNode.content !== newNode.content) {
        // 기존 노드 내용 업데이트
        updateNode({ ...oldNode, content: newNode.content })
      }
    })

    // connection 업데이트 로직
    Object.keys(oldConns).forEach(
      (key) => !newConns[key] && deleteConnection(key)
    )
    Object.entries(newConns).forEach(([key, newConn]) => {
      const oldConn = oldConns[key]
      if (!oldConn || JSON.stringify(oldConn) !== JSON.stringify(newConn)) {
        updateConnection(newConn)
      }
    })
  }, [])

  // 에러 표시 업데이트 함수
  const updateEditorMarkers = useCallback((monaco, model, errors) => {
    monaco.editor.setModelMarkers(
      model,
      'editor',
      errors.map(({ wordRange, message }) => ({
        severity: monaco.MarkerSeverity.Error,
        startLineNumber: wordRange.begin.y,
        startColumn: wordRange.begin.x,
        endLineNumber: wordRange.end.y,
        endColumn: wordRange.end.x,
        message,
      }))
    )
  }, [])

  // 자동완성 업데이트 함수
  const updateSuggestions = useCallback(
    (result, editor) => {
      suggestionsRef.current = getSuggestions(result, editor.getPosition())
    },
    [suggestionsRef]
  )

  // 데코레이션 업데이트 함수
  const updateDecorations = useCallback(
    (result, monaco, editor) => {
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current)
      updateTimeoutRef.current = setTimeout(() => {
        const newDecorations = getDecorations(result).map(
          ({ range, options }) => ({
            range: new monaco.Range(
              range.begin.y,
              range.begin.x,
              range.end.y,
              range.end.x
            ),
            options,
          })
        )
        decorationsRef.current = editor.deltaDecorations(
          decorationsRef.current,
          newDecorations
        )
      }, 1)
    },
    [decorationsRef, updateTimeoutRef]
  )

  // Monaco 에디터 업데이트 핸들러
  const handleUpdateMonaco = useCallback(() => {
    const { monaco, editor } = useMonacoStore.getState()
    const { setEditorText, setErrors } = useDiagramStore.getState()

    if (!editor || !monaco) return

    const model = editor.getModel()
    const value = model.getValue()

    const {
      result,
      errors,
      nodes: newNodes,
      connections: newConns,
      isSuccess,
    } = parseText(value)

    setEditorText(value)
    setErrors(errors)

    if (isSuccess) {
      updateNodesAndConnections(newNodes, newConns)
    }

    updateEditorMarkers(monaco, model, errors)
    updateSuggestions(result, editor)
    updateDecorations(result, monaco, editor)
  }, [
    updateNodesAndConnections,
    updateEditorMarkers,
    updateSuggestions,
    updateDecorations,
  ])

  return {
    handleUpdateMonaco,
  }
}
