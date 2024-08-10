import { useCallback, useState } from 'react'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import { useMsg } from './useMsg'
import { MSG } from 'shared/const/msg'

export const useSave = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { handleMsg } = useMsg()

  const handleSave = useCallback(() => {
    try {
      const { nodes, connections, editorText, screenPosition, screenScale } =
        useDiagramStore.getState()

      const diagramJSON = JSON.stringify({
        nodes,
        connections,
        editorText,
        screenPosition,
        screenScale,
      })

      localStorage.setItem('diagram', diagramJSON)
      handleMsg(MSG.DEFAULT.SAVE_SUCCESS)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, handleSave }
}
