import { createContext, useCallback, useEffect, useState } from 'react'
import style from './style.module.css'

export const MsgContext = createContext()

export const MsgProvider = ({ children }) => {
  const [msg, setMsg] = useState(null)

  const handleMsg = useCallback(
    (text, type = 'normal') => {
      setMsg({
        text,
        createdAt: new Date(),
        type:
          type === 'normal'
            ? style.normal
            : type === 'alert'
            ? style.alert
            : null,
      })
    },
    [setMsg]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg(null)
    }, 2000)

    return () => clearTimeout(timer)
  }, [msg, setMsg])

  return (
    <MsgContext.Provider value={{ handleMsg }}>
      {children}
      {msg && (
        <div key={msg.createdAt} className={`${style.msg} ${msg.type}`}>
          {msg.text}
        </div>
      )}
    </MsgContext.Provider>
  )
}
