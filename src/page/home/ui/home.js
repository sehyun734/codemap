import { Editor } from 'widget/editor/ui/editor'
import { Toolbar } from 'widget/toolbar/ui/toolbar'
import { Canvas } from 'widget/canvas/ui/canvas'
import { useAddDiagramToLocalStorage } from '../lib/useAddDiagramToLocalStorage'
import style from './style.module.css'
import { useHomeListener } from '../lib/useHomeListener'
import { Nav } from 'widget/nav/ui/nav'

export const Home = () => {
  const { isLoading: isAddLoading } = useAddDiagramToLocalStorage()
  const { isLoading: isKeyDownSaveLoading } = useHomeListener()

  return (
    <div className={style.wrapper}>
      <Editor />
      <div className={style.right}>
        <Toolbar />
        <Canvas />
        <Nav />
      </div>
    </div>
  )
}
