'use client'

import React from 'react'
import style from './style.module.css'
import { useHideEvent } from '../lib/useHideEvent'
import { shared } from '../../../shared'
import { asset } from 'shared/assets'

export const HideBtn = React.memo(
  ({ textareaStyleDisplay, setTextareaStyle }) => {
    const { handleHide } = useHideEvent(setTextareaStyle)

    return (
      <span
        className={`${style.hideBtn} ${shared.animation}`}
        onClick={handleHide}
      >
        {textareaStyleDisplay === 'none' ? (
          <asset.svg.ArrowRight />
        ) : (
          <asset.svg.ArrowLeft />
        )}
      </span>
    )
  }
)
