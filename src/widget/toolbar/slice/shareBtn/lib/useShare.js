import { useCallback } from 'react'
import { MSG } from 'shared/const/msg'
import { useMsg } from 'shared/hook/useMsg'
import { getQueryFromDiagram } from 'shared/util/getQueryFromDiagram'

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

  const handleDataToUrl = useCallback(() => {
    const url = getUrl(getQueryFromDiagram())
    navigator.clipboard.writeText(url)
    handleMsg(MSG.DEFAULT.SHARE)
  }, [handleMsg, getUrl])

  return { handleDataToUrl }
}
