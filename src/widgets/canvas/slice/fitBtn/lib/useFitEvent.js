import { useCallback } from 'react'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useFitEvent = () => {
  const calculateMinMax = useCallback((nodes) => {
    return Object.values(nodes).reduce(
      (acc, node) => {
        const { x, y } = node.position
        const { width, height } = node.size
        return {
          minX: Math.min(acc.minX, x - width / 2),
          maxX: Math.max(acc.maxX, x + width / 2),
          minY: Math.min(acc.minY, y - height / 2),
          maxY: Math.max(acc.maxY, y + height / 2),
        }
      },
      { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
    )
  }, [])

  const handleFit = useCallback(() => {
    const { setScreenPosition, screenScale, nodes, screenRef } =
      useDiagramStore.getState()
    const { offsetWidth: scrWidth, offsetHeight: scrHeight } = screenRef.current

    const { minX, maxX, minY, maxY } = calculateMinMax(nodes)

    const centerX = (minX + maxX) / 2 || 0
    const centerY = (minY + maxY) / 2 || 0

    setScreenPosition({
      x: scrWidth / 2 - centerX * screenScale + 4, // editorHandle width / 2
      y: scrHeight / 2 - centerY * screenScale,
    })
  }, [calculateMinMax])

  return { handleFit }
}
