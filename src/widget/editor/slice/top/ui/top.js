import { useDiagramStore } from 'shared/store/useDiagramStore'
import style from './style.module.css'
import { asset } from 'shared/asset'
import { useRename } from '../lib/useRename'

export const Top = () => {
  const { handleRenameModal } = useRename()

  const name = useDiagramStore((state) => state.name)

  return (
    <div className={style.top}>
      <div className={style.name}>{name}</div>
      <button
        onClick={handleRenameModal}
        className={`${style.btn} ${style.animation}`}
      >
        <asset.svg.Rename />
      </button>
    </div>
  )
}
