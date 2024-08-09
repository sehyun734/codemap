import { shared } from '../../../shared'
import { asset } from 'shared/asset'
import { useShareEvent } from '../lib/useShareEvent'

export const ShareBtn = () => {
  const { handleDataToUrl } = useShareEvent()
  return (
    <shared.Btn onClick={handleDataToUrl}>
      <asset.svg.Share />
    </shared.Btn>
  )
}
