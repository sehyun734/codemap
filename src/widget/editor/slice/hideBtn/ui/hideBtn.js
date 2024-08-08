'use client'

import React from 'react'
import style from './style.module.css'
import { useHideEvent } from '../lib/useHideEvent'
import { shared } from '../../../shared'
import { asset } from 'shared/asset'

export const HideBtn = React.memo(({ editorStyleDisplay, setEditorStyle }) => {
  const { handleHide } = useHideEvent(setEditorStyle)

  return (
    <span
      className={`${style.hideBtn} ${shared.animation}`}
      onClick={handleHide}
    >
      {editorStyleDisplay === 'none' ? (
        <asset.svg.ArrowRight />
      ) : (
        <asset.svg.ArrowLeft />
      )}
    </span>
  )
})
