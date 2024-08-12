import { useCallback } from 'react'
import { useModal } from 'shared/hook/useModal'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import style from '../ui/style.module.css'

export const useRename = () => {
  const { handleModal } = useModal()

  const handleRename = useCallback((e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const newName = formData.get('newName')

    const { setName } = useDiagramStore.getState()

    setName(newName)
  }, [])

  const handleRenameModal = useCallback(() => {
    const { name } = useDiagramStore.getState()

    handleModal({
      submitBtn: <button>Rename</button>,
      handleSubmit: handleRename,
      innerForm: (
        <>
          <span className={style.title}>Rename "{name}"</span>
          <input name="newName" type="text" className={style.input} />
        </>
      ),
    })
  }, [handleModal, handleRename])

  return { handleRenameModal }
}
