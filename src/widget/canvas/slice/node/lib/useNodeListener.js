import { useCallback, useEffect, useRef } from 'react'
import { CONST } from 'shared/const/const'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useNodeListener = (containerRef, node, handleZIndexMaximize) => {
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (e.target.tagName === 'A') {
        window.open(e.target.href)
        return
      }

      const { screenScale } = useDiagramStore.getState()

      // 드래그 시작 시 오프셋 계산
      isDragging.current = true
      offset.current = {
        x: e.clientX / screenScale - node.position.x,
        y: e.clientY / screenScale - node.position.y,
      }
      handleZIndexMaximize(node.label)
    },
    [node.position.x, node.position.y, node.label, handleZIndexMaximize]
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging.current) return

      const { x: offsetX, y: offsetY } = offset.current
      const gridHalf = CONST.GRID_SIZE / 2

      const { screenScale, updateNode } = useDiagramStore.getState()

      // 그리드에 스냅하는 새로운 위치 계산
      const newX =
        Math.round((e.clientX / screenScale - offsetX) / gridHalf) * gridHalf
      const newY =
        Math.round((e.clientY / screenScale - offsetY) / gridHalf) * gridHalf

      // 위치가 변경된 경우에만 노드 업데이트
      if (node.position.x !== newX || node.position.y !== newY) {
        updateNode({ ...node, position: { x: newX, y: newY } })
      }
    },
    [node]
  )

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    const curContainerRef = containerRef.current

    curContainerRef?.addEventListener('contextmenu', handleContextMenu)
    curContainerRef?.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      curContainerRef?.removeEventListener('contextmenu', handleContextMenu)
      curContainerRef?.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleContextMenu,
  ])

  return {}
}
