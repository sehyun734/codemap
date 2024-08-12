import { asset } from 'shared/asset'
import { shared } from '../../../shared'
import { useSave } from 'shared/hook/useSave'

export const SaveBtn = () => {
  const { handleSave } = useSave()

  return (
    <shared.Btn onClick={handleSave}>
      <asset.svg.Save />
    </shared.Btn>
  )
}
