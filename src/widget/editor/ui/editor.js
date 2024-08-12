import React, { useRef, useState } from 'react'
import style from './style.module.css'
import { ErrorMsg, Handle, HideBtn, Monaco, Top } from '../slice'

export const Editor = React.memo(() => {
  const editorRef = useRef(null)
  const [editorStyle, setEditorStyle] = useState({})

  return (
    <div className={style.wrapper}>
      <div className={style.editor} ref={editorRef} style={editorStyle}>
        <Top />
        <Monaco />
      </div>
      <div className={style.side}>
        <Handle editorRef={editorRef} setEditorStyle={setEditorStyle} />
        <HideBtn
          editorStyleDisplay={editorStyle.display}
          setEditorStyle={setEditorStyle}
        />
      </div>
      <div className={style.errors}>
        <ErrorMsg editorStyleDisplay={editorStyle.display} />
      </div>
    </div>
  )
})
