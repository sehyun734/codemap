import { useDiagramStore } from 'shared/store/useDiagramStore'
import style from './style.module.css'
import React, { useEffect, useState } from 'react'

export const ErrorMsg = React.memo(({ editorStyleDisplay }) => {
  const [isDelay, setIsDelay] = useState(true)
  const errors = useDiagramStore((state) => state.errors)

  useEffect(() => {
    setIsDelay(true)
    const timer = setTimeout(() => {
      setIsDelay(false)
    }, 700)

    return () => clearTimeout(timer)
  }, [errors])

  if (isDelay || editorStyleDisplay === 'none') {
    return null
  }

  return (
    <>
      {errors.map(({ message: msg, wordRange }, index) => {
        return (
          <div key={index} className={style.error}>
            <span>
              {wordRange.begin.y}:{wordRange.begin.x}{' '}
            </span>
            <span>{msg}</span>
          </div>
        )
      })}
    </>
  )
})
