import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MSG } from 'shared/const/msg'
import { useMsg } from 'shared/hook/useMsg'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useLoad = () => {
  const [query] = useSearchParams()
  const { handleMsg } = useMsg()

  const parseData = useCallback((diagramStr) => {
    const data = JSON.parse(decodeURIComponent(atob(diagramStr)))

    return data
  }, [])

  const setStore = useCallback(
    (diagramObj) => {
      const {
        setEditorText,
        setNodes,
        setConnections,
        setScreenPosition,
        setScreenScale,
      } = useDiagramStore.getState()

      setNodes(diagramObj.nodes)
      setConnections(diagramObj.connections)
      setEditorText(diagramObj.editorText)
      setScreenPosition(diagramObj.screenPosition)
      setScreenScale(diagramObj.screenScale)

      handleMsg(MSG.DEFAULT.LOAD_SUCCESS)
    },
    [handleMsg]
  )

  useEffect(() => {
    try {
      const diagramStr = query.get('diagram')
      if (!diagramStr) return
      setStore(parseData(diagramStr))
    } catch {
      handleMsg(MSG.ALERT.INVALID_DIAGRAM_URL, 'alert')
    }
  }, [query, parseData, setStore, handleMsg])

  return {}
}
