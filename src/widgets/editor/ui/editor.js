import React, { useRef, useState } from 'react'
import style from './style.module.css'
import { Handle, HideBtn, Monaco } from '../slice'

export const Editor = React.memo(() => {
  const editorRef = useRef(null)
  const [editorStyle, setEditorStyle] = useState({})

  return (
    <div className={style.wrapper}>
      <div className={style.editor} ref={editorRef} style={editorStyle}>
        <Monaco />
      </div>
      <div className={style.side}>
        <Handle editorRef={editorRef} setEditorStyle={setEditorStyle} />
        <HideBtn
          editorStyleDisplay={editorStyle.display}
          setEditorStyle={setEditorStyle}
        />
      </div>
      <div className=""></div>
    </div>
  )
})
