import { ArrangeBtn, FitBtn, MadeBy, DarkToggle } from '../slice'
import style from './style.module.css'

export const Toolbar = () => {
  return (
    <div className={style.btns}>
      <FitBtn />
      <ArrangeBtn />
      <DarkToggle />
      <MadeBy />
    </div>
  )
}
