import { Editor } from 'widgets/editor/ui/editor'
import { Canvas } from '../../widgets/canvas/ui/canvas'
import style from './style.module.css'

export const Home = () => {
  return (
    <div className={style.page}>
      <Editor />
      <Canvas />
    </div>
  )
}
