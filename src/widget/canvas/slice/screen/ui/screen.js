import React, { useRef } from 'react'
import style from './style.module.css'
import { useScreenStyles } from '../lib/useScreenStyles'
import { useScreenListener } from '../lib/useScreenListener'

export const Screen = React.memo(({ children }) => {
  const bgRef = useRef(null)

  const { bgStyle, centerStyle } = useScreenStyles()
  useScreenListener(bgRef)

  return (
    <div className={style.bg} ref={bgRef} style={bgStyle}>
      <div className={style.center} style={centerStyle}>
        {children}
      </div>
    </div>
  )
})
