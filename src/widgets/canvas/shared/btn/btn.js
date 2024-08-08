import React from "react"
import style from "./style.module.css"

export const Btn = React.memo(({ children, ...props }) => {
  return (
    <button {...props} className={`${style.btn} ${style.animation}`}>
      {children}
    </button>
  )
})
