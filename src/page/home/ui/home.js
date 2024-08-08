import { Editor } from 'widget/editor/ui/editor'
import { Toolbar } from 'widget/toolbar/ui/toolbar'
import { Canvas } from 'widget/canvas/ui/canvas'
import style from './style.module.css'
import { useUrlToDiagram } from '../lib/useUrlToDiagram'

export const Home = () => {
  useUrlToDiagram()

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
