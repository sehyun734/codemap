import { useCallback } from 'react'
import { MSG } from 'shared/const/msg'
import { useMsg } from 'shared/hook/useMsg'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useShare = () => {
  const { handleMsg } = useMsg()

  const getUrl = useCallback((diagramStr) => {
    const curUrl = new URL(
      window.location.protocol + '//' + window.location.host
    )
    curUrl.searchParams.set('diagram', diagramStr)
    const url = curUrl.toString()

    return url
  }, [])

  const getDiagramStr = useCallback((diagramObj) => {
    const diagramStr = btoa(encodeURIComponent(JSON.stringify(diagramObj)))

    return diagramStr
  }, [])

  const handleDataToUrl = useCallback(() => {
    const { nodes, connections, editorText, screenPosition, screenScale } =
      useDiagramStore.getState()

    const diagramObj = {
      nodes,
      connections,
      editorText,
      screenPosition,
      screenScale,
    }

    const url = getUrl(getDiagramStr(diagramObj))
    navigator.clipboard.writeText(url)
    handleMsg(MSG.DEFAULT.SHARE)
  }, [handleMsg, getUrl, getDiagramStr])

  return { handleDataToUrl }
}
