import { shared } from '../../../shared'
import { asset } from 'shared/asset'
import { useShare } from '../lib/useShare'

export const ShareBtn = () => {
  const { handleDataToUrl } = useShare()
  return (
    <shared.Btn onClick={handleDataToUrl}>
      <asset.svg.Share />
    </shared.Btn>
  )
}
