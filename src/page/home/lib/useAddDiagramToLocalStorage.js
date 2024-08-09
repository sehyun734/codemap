import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MSG } from 'shared/const/msg'
import { useMsg } from 'shared/hook/useMsg'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import { getDiagramFromQuery } from 'shared/util/getDiagramFromQuery'

export const useAddDiagramToLocalStorage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useSearchParams()
  const { handleMsg } = useMsg()

  useEffect(() => {
    try {
      const diagramQuery = query.get('diagram')

      if (!diagramQuery) return

      const { setInit } = useDiagramStore.getState()

      const diagramObj = getDiagramFromQuery(diagramQuery)

      setInit({
        nodes: diagramObj.nodes,
        connections: diagramObj.connections,
        editorText: diagramObj.editorText,
        screenPosition: diagramObj.screenPosition,
        screenScale: diagramObj.screenScale,
      })

      handleMsg(MSG.DEFAULT.LOAD_SUCCESS)
      setQuery({})
    } catch {
      handleMsg(MSG.ALERT.INVALID_DIAGRAM_URL, 'alert')
    } finally {
      setIsLoading(false)
    }
  }, [query, handleMsg, setQuery])

  return { isLoading }
}
