import { useCallback } from 'react'

export const useHide = (setEditorStyle) => {
  const handleHide = useCallback(() => {
    setEditorStyle((prev) => ({
      ...prev,
      display: prev.display === 'none' ? '' : 'none',
    }))
  }, [setEditorStyle])

  return { handleHide }
}
