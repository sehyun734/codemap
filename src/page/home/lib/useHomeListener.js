import { useCallback, useEffect } from 'react'
import { useSave } from 'shared/hook/useSave'

export const useHomeListener = () => {
  const { handleSave, isLoading } = useSave()

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    },
    [handleSave]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return { isLoading }
}
