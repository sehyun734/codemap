'use client'

import { ArrangeBtn, FitBtn } from '../slice'
import style from './style.module.css'

export const Toolbar = () => {
  return (
    <div className={style.btns}>
      <FitBtn />
      <ArrangeBtn />
    </div>
  )
}
