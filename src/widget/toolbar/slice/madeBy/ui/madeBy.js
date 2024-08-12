import { useMadeByListener } from '../lib/useMadeByListener'
import style from './style.module.css'

export const MadeBy = () => {
  const { isShow, handleMouseEnter, handleMouseLeave, handleClick } =
    useMadeByListener()

  return (
    <>
      <h5
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={style.madeBy}
      >
        Made by SEHYUN
        {isShow && (
          <div className={style.container}>✉️ &nbsp;sehyun030526@gmail.com</div>
        )}
      </h5>
    </>
  )
}
