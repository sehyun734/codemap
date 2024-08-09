import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MSG } from 'shared/const/msg'
import { useMsg } from 'shared/hook/useMsg'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import { parseDiagram } from 'shared/util/parseDiagram'

export const useLoad = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useSearchParams()
  const { handleMsg } = useMsg()

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
      setQuery({})
    },
    [handleMsg, setQuery]
  )

  useEffect(() => {
    try {
      const diagramStr = query.get('diagram')

      if (!diagramStr) return

      setStore(parseDiagram(diagramStr))
    } catch {
      handleMsg(MSG.ALERT.INVALID_DIAGRAM_URL, 'alert')
    } finally {
      setIsLoading(false)
    }
  }, [query, setStore, handleMsg])

  return { isLoading }
}
