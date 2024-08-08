import { useContext } from 'react'
import { MsgContext } from 'shared/provider/msgProvider/msgProvider'

export const useMsg = () => useContext(MsgContext)
