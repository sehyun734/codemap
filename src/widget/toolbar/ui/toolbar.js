import React from 'react'
import {
  ArrangeBtn,
  FitBtn,
  MadeBy,
  DarkToggle,
  ShareBtn,
  SaveBtn,
} from '../slice'
import style from './style.module.css'

export const Toolbar = React.memo(() => {
  return (
    <header className={style.toolbar}>
      <FitBtn />
      <ArrangeBtn />
      <div className={style.divider} />
      <ShareBtn />
      <SaveBtn />
      <div className={style.divider} />
      <DarkToggle />
      <MadeBy />
    </header>
  )
})
