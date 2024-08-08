import { useState, useCallback, useLayoutEffect } from 'react'
import { CONST } from 'shared/const/const'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useNodeStyles = (
  node,
  zIndex,
  containerRef,
  labelRef,
  contentRef
) => {
  const [containerStyle, setContainerStyle] = useState({})
  const [contentStyle, setContentStyle] = useState({})

  const handleStyle = useCallback(() => {
    if (!containerRef.current || !labelRef.current || !contentRef.current)
      return

    // 크기를 그리드에 맞춰 반올림
    const roundToGrid = (size) =>
      Math.ceil(size / CONST.GRID_SIZE) * CONST.GRID_SIZE

    const contentWidth = roundToGrid(contentRef.current.offsetWidth)
    const contentHeight = roundToGrid(contentRef.current.offsetHeight)
    const maxWidth = Math.max(
      contentWidth,
      roundToGrid(labelRef.current.offsetWidth)
    )

    // 노드 크기가 변경된 경우 전역상태 업데이트
    if (node.size.width !== maxWidth || node.size.height !== contentHeight) {
      const { updateNode } = useDiagramStore.getState()
      updateNode({ ...node, size: { width: maxWidth, height: contentHeight } })
    }

    // 컨테이너, 라벨, 컨텐츠 스타일 설정
    setContainerStyle({
      width: maxWidth,
      left: node.position.x,
      top: node.position.y,
      zIndex,
    })
    setContentStyle({
      height: contentHeight,
    })
  }, [node, containerRef, labelRef, contentRef, zIndex])

  useLayoutEffect(() => {
    handleStyle()
  }, [handleStyle])

  return { containerStyle, contentStyle }
}
