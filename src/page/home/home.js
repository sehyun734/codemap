import { Editor } from 'widget/editor/ui/editor'
import { Canvas } from '../../widget/canvas/ui/canvas'
import style from './style.module.css'
import { Toolbar } from 'widget/toolbar/ui/toolbar'

export const Home = () => {
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
