import { Editor } from 'widgets/editor/ui/editor'
import { Canvas } from '../../widgets/canvas/ui/canvas'
import style from './style.module.css'
import { Toolbar } from 'widgets/toolbar/ui/toolbar'

export const Home = () => {
  return (
    <div className={style.page}>
      <Editor />
      <div className={style.box}>
        <Toolbar />
        <Canvas />
      </div>
    </div>
  )
}
