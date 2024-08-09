import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import style from './style.module.css'

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const modalRef = useRef(null)

  const handleModal = useCallback(({ submitBtn, handleSubmit, innerForm }) => {
    const submitBtnWithClick = React.cloneElement(submitBtn, {
      className: `${style.btn} ${style.animation}`,
    })

    const handleSubmitWithClose = (e) => {
      e.preventDefault()
      handleSubmit(e)
      setIsOpen(false)
    }

    setModalContent({
      submitBtnWithClick,
      handleSubmitWithClose,
      innerForm,
    })
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleOutsideClick = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, handleOutsideClick])

  return (
    <ModalContext.Provider value={{ handleModal }}>
      {children}
      {isOpen && modalContent && (
        <div className={style.bg}>
          <div className={style.modal} ref={modalRef}>
            <form
              className={style.form}
              onSubmit={modalContent.handleSubmitWithClose}
            >
              {modalContent.innerForm}
              <span className={style.btns}>
                {modalContent.submitBtnWithClick}
                <button
                  type="button"
                  onClick={handleClose}
                  className={`${style.btn} ${style.animation}`}
                >
                  cancel
                </button>
              </span>
            </form>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}
