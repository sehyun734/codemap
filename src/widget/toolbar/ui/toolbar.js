import React from 'react'
import { ArrangeBtn, FitBtn, MadeBy, DarkToggle, ShareBtn } from '../slice'
import style from './style.module.css'

export const Toolbar = React.memo(() => {
  return (
    <div className={style.toolbar}>
      <FitBtn />
      <ArrangeBtn />
      <DarkToggle />
      <ShareBtn />
      <MadeBy />
    </div>
  )
})
