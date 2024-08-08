'use client'

import React, { useRef } from 'react'
import style from './style.module.css'
import { useHandleEvents } from '../lib/useHandleEvents'
import { shared } from '../../../shared'

export const Handle = React.memo(({ editorRef, setEditorStyle }) => {
  const handleRef = useRef(null)
  useHandleEvents(editorRef, setEditorStyle, handleRef)

  return <span ref={handleRef} className={`${shared.animation} ${style.bar}`} />
})
