import { useDiagramStore } from 'shared/store/useDiagramStore'
import style from './style.module.css'
import React, { useEffect, useState } from 'react'

export const ErrorMsg = React.memo(({ editorStyleDisplay }) => {
  const [isDelay, setIsDelay] = useState(true)
  const [errors, setErrors] = useState([])
  const storedErrors = useDiagramStore((state) => state.errors)

  useEffect(() => {
    if (JSON.stringify(errors) !== JSON.stringify(storedErrors)) {
      setErrors([...storedErrors])
    }
  }, [storedErrors, setErrors])

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
