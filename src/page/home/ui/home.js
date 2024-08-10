import { Editor } from 'widget/editor/ui/editor'
import { Toolbar } from 'widget/toolbar/ui/toolbar'
import { Canvas } from 'widget/canvas/ui/canvas'
import style from './style.module.css'
import { useHomeListener } from '../lib/useHomeListener'
import { useLoad } from '../lib/useLoad'

export const Home = () => {
  const { isLoading: isKeyDownSaveLoading } = useHomeListener()
  useLoad()

  return (
    <div className={style.wrapper}>
      <Editor />
      <div className={style.right}>
        <Toolbar />
        <Canvas />
      </div>
    </div>
  )
}
