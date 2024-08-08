import { createContext, useCallback, useEffect, useState } from 'react'
import style from './style.module.css'

export const MsgContext = createContext()

export const MsgProvider = ({ children }) => {
  const [msg, setMsg] = useState(null)

  const handleMsg = useCallback(
    (value) => {
      setMsg({ value, createdAt: new Date() })
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
        <div key={msg.createdAt} className={style.msg}>
          {msg.value}
        </div>
      )}
    </MsgContext.Provider>
  )
}
