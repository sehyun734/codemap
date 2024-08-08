import { shared } from '../../../shared'
import { asset } from 'shared/asset'
import { useDiagramToUrl } from '../lib/useDiagramToUrl'

export const ShareBtn = () => {
  const { handleDataToUrl } = useDiagramToUrl()
  return (
    <shared.Btn onClick={handleDataToUrl}>
      <asset.svg.Share />
    </shared.Btn>
  )
}
