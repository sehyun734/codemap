import { useState, useCallback, useEffect } from 'react'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useZIndex = () => {
  const nodes = useDiagramStore((state) => state.nodes)
  const [zIndex, setZIndex] = useState({})

  // 노드 z-index 업데이트 함수
  const handleZIndexUpdate = useCallback((nodes) => {
    setZIndex((prev) => {
      const currentNodeLabels = new Set(
        Object.values(nodes).map((node) => node.label)
      )
      const newZIndex = { ...prev }

      // 삭제된 노드의 z-index 제거
      Object.keys(newZIndex).forEach((label) => {
        if (!currentNodeLabels.has(label)) {
          delete newZIndex[label]
        }
      })

      // 새로운 노드에 z-index 할당
      const maxZ = Math.max(2, ...Object.values(newZIndex))
      Object.values(nodes).forEach((node, i) => {
        if (!newZIndex[node.label]) {
          newZIndex[node.label] = maxZ + i * 2 + 2
        }
      })

      return newZIndex
    })
  }, [])

  // 클릭된 노드와 연결된 노드들의 z-index를 최대화하는 함수
  const handleZIndexMaximize = useCallback((clickedLabel) => {
    setZIndex((prev) => {
      const { connections } = useDiagramStore.getState()
      const maxZ = Math.max(2, ...Object.values(prev)) + 2

      // 연결된 노드 찾기
      const connectedNodes = new Set(
        Object.values(connections).flatMap(({ source, target }) =>
          source === clickedLabel
            ? target
            : target === clickedLabel
            ? source
            : []
        )
      )

      // 연결된 노드와 클릭된 노드의 z-index 업데이트
      return {
        ...prev,
        ...Object.fromEntries(
          [...connectedNodes].map((label) => [label, maxZ - 1])
        ),
        [clickedLabel]: maxZ,
      }
    })
  }, [])

  // 노드가 변경될 때마다 z-index 업데이트
  useEffect(() => {
    handleZIndexUpdate(nodes)
  }, [nodes, handleZIndexUpdate])

  return { zIndex, handleZIndexMaximize }
}
