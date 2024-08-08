import { useCallback, useEffect, useRef } from 'react'
import { CONST } from '../../../const/const'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useNodeEvents = (containerRef, node, zIndexHandler) => {
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

      // 드래그 시작 시 오프셋 계산
      const { screenScale: scale } = useDiagramStore.getState()
      isDragging.current = true
      offset.current = {
        x: e.clientX / scale - node.position.x,
        y: e.clientY / scale - node.position.y,
      }
      zIndexHandler(node.label)
    },
    [node.position.x, node.position.y, zIndexHandler]
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging.current) return

      const { screenScale: scale, updateNode } = useDiagramStore.getState()
      const { x: offsetX, y: offsetY } = offset.current
      const gridHalf = CONST.GRID_SIZE / 2

      // 그리드에 스냅하는 새로운 위치 계산
      const newX =
        Math.round((e.clientX / scale - offsetX) / gridHalf) * gridHalf
      const newY =
        Math.round((e.clientY / scale - offsetY) / gridHalf) * gridHalf

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

  useEffect(() => {
    const preventContext = (e) => e.preventDefault()
    containerRef.current?.addEventListener('contextmenu', preventContext)
    containerRef.current?.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      containerRef.current?.removeEventListener('contextmenu', preventContext)
      containerRef.current?.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp])

  return {}
}
