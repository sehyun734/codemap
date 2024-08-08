import React, { useRef, useState } from 'react'
import style from './style.module.css'
import { Handle, HideBtn, Monaco } from '../slice'

export const Editor = React.memo(() => {
  const textareaRef = useRef(null)
  const [textareaStyle, setTextareaStyle] = useState({})

  return (
    <div className={style.wrapper}>
      <div className={style.textarea} ref={textareaRef} style={textareaStyle}>
        <Monaco />
      </div>
      <div className={style.side}>
        <Handle textareaRef={textareaRef} setTextareaStyle={setTextareaStyle} />
        <HideBtn
          textareaStyleDisplay={textareaStyle.display}
          setTextareaStyle={setTextareaStyle}
        />
      </div>
    </div>
  )
})
