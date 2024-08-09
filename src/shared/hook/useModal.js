import { useContext } from 'react'
import { ModalContext } from 'shared/provider/modalProvider/modalProvider'

export const useModal = () => useContext(ModalContext)
