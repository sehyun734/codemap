import { useCallback, useEffect, useRef } from 'react'
import { CONST } from '../../../const/const'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useScreenEvents = (bgRef) => {
  const screenPosition = useDiagramStore((state) => state.screenPosition)
  const screenScale = useDiagramStore((state) => state.screenScale)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback(
    (e) => {
      const { x: screenX, y: screenY } = screenPosition
      isDraggingRef.current = true
      // 드래그 시작 위치 저장
      dragStartRef.current = { x: e.clientX - screenX, y: e.clientY - screenY }
    },
    [screenPosition]
  )

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) {
      const { x, y } = dragStartRef.current

      const { setScreenPosition } = useDiagramStore.getState()
      // 새로운 화면 위치 계산 및 설정
      setScreenPosition({
        x: e.clientX - x,
        y: e.clientY - y,
      })
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault()
      const { MIN_ZOOM, ZOOM_SPEED, MAX_ZOOM } = CONST
      const { setScreenPosition, setScreenScale } = useDiagramStore.getState()

      // 마우스 위치 계산
      const { left, top } = e.currentTarget.getBoundingClientRect()
      const mouseX = e.clientX - left
      const mouseY = e.clientY - top

      // 새로운 스케일 계산
      const delta = e.deltaY * (-ZOOM_SPEED * screenScale)
      const newScale = Math.min(
        Math.max(MIN_ZOOM, screenScale + delta),
        MAX_ZOOM
      )
      const scaleChange = newScale - screenScale

      // 줌 중심점을 마우스 위치로 설정하기 위한 새로운 위치 계산
      const newPosition = {
        x:
          screenPosition.x -
          ((mouseX - screenPosition.x) / screenScale) * scaleChange,
        y:
          screenPosition.y -
          ((mouseY - screenPosition.y) / screenScale) * scaleChange,
      }

      setScreenPosition(newPosition)
      setScreenScale(newScale)
    },
    [screenPosition, screenScale]
  )

  useEffect(() => {
    bgRef.current?.addEventListener('wheel', handleWheel, { passive: false })
    bgRef.current?.addEventListener('mousedown', handleMouseDown)
    bgRef.current?.addEventListener('mousemove', handleMouseMove)
    bgRef.current?.addEventListener('mouseleave', handleMouseUp)
    bgRef.current?.addEventListener('mouseup', handleMouseUp)

    return () => {
      bgRef.current?.removeEventListener('wheel', handleWheel)
      bgRef.current?.removeEventListener('mousedown', handleMouseDown)
      bgRef.current?.removeEventListener('mousemove', handleMouseMove)
      bgRef.current?.removeEventListener('mouseleave', handleMouseUp)
      bgRef.current?.removeEventListener('mouseup', handleMouseUp)
    }
  }, [bgRef, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp])

  return {}
}
