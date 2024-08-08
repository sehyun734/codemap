import { useCallback } from 'react'
import { CONST } from 'shared/const/const'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useArrangeEvent = () => {
  // 노드들의 전체 크기를 계산하는 함수
  const getDimensions = useCallback((nodes) => {
    return nodes.reduce(
      (acc, { size: { width, height } }) => ({
        totalWidth: acc.totalWidth + width,
        maxHeight: Math.max(acc.maxHeight, height),
      }),
      { totalWidth: 0, maxHeight: 0 }
    )
  }, [])

  const handleArrange = useCallback(() => {
    const { setScreenPosition, screenScale, nodes, updateNode, screenRef } =
      useDiagramStore.getState()
    const nodeList = Object.values(nodes)
    const { width: screenWidth, height: screenHeight } =
      screenRef.current.getBoundingClientRect()

    // 노드들의 전체 크기 계산
    const { totalWidth, maxHeight } = getDimensions(nodeList)
    const totalWidthWithSpacing =
      totalWidth + CONST.NODE_SPACE * (nodeList.length - 1)
    const startX = -totalWidthWithSpacing / 2

    // 노드 정렬 및 업데이트
    nodeList.reduce((curX, node) => {
      const { width, height } = node.size
      updateNode({
        ...node,
        position: { x: curX + width / 2, y: height / 2 },
      })
      return curX + width + CONST.NODE_SPACE
    }, startX)

    // 화면 중앙에 맞추기
    setScreenPosition({
      x: screenWidth / 2,
      y: screenHeight / 2 - (maxHeight * screenScale) / 2,
    })
  }, [getDimensions])

  return { handleArrange }
}
