import { useRef, useCallback, useEffect } from 'react'
import { CONST } from 'shared/const/const'

export const useHandleEvents = (editorRef, setEditorStyle, handleRef) => {
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const handleMouseDown = useCallback(
    (e) => {
      isDragging.current = true
      startX.current = e.clientX
      startWidth.current = editorRef.current.getBoundingClientRect().width
      document.body.style.cursor = 'ew-resize'
    },
    [editorRef, isDragging, startX, startWidth]
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging.current) return

      const diff = e.clientX - startX.current
      const newWidth = startWidth.current + diff

      setEditorStyle((prev) => ({
        ...prev,
        width: Math.min(
          CONST.MAX_EDITOR_WIDTH,
          Math.max(CONST.MIN_EDITOR_WIDTH, newWidth)
        ),
        display: newWidth < CONST.MIN_EDITOR_WIDTH / 2 ? 'none' : '',
      }))
    },
    [setEditorStyle, isDragging, startX, startWidth]
  )

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    document.body.style.cursor = ''
  }, [isDragging])

  useEffect(() => {
    const curHandleRef = handleRef.current

    curHandleRef.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      curHandleRef.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleRef, handleMouseDown, handleMouseMove, handleMouseUp])

  return {}
}
