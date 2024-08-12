import { useCallback, useState } from 'react'
import { MSG } from 'shared/const/msg'
import { useMsg } from 'shared/hook/useMsg'

export const useMadeByListener = () => {
  const { handleMsg } = useMsg()
  const [isShow, setIsShow] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsShow(true)
  }, [setIsShow])

  const handleMouseLeave = useCallback(() => {
    setIsShow(false)
  }, [setIsShow])

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText('sehyun030526@gmail.com')
    handleMsg(MSG.DEFAULT.SHARE)
  }, [handleMsg])

  return { isShow, handleMouseEnter, handleMouseLeave, handleClick }
}
