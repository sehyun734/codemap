import { useState, useCallback, useLayoutEffect } from 'react'
import { CONST } from '../../../const/const'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useNodeStyles = (
  node,
  zIndex,
  containerRef,
  labelRef,
  contentRef
) => {
  const [containerStyle, setContainerStyle] = useState({})
  const [labelStyle, setLabelStyle] = useState({})
  const [contentStyle, setContentStyle] = useState({})

  const handleStyle = useCallback(() => {
    if (!containerRef.current || !labelRef.current || !contentRef.current)
      return

    const { updateNode } = useDiagramStore.getState()

    // 크기를 그리드에 맞춰 반올림
    const roundToGrid = (size) =>
      Math.ceil(size / CONST.GRID_SIZE) * CONST.GRID_SIZE

    const contentWidth = roundToGrid(contentRef.current.offsetWidth)
    const contentHeight = roundToGrid(contentRef.current.offsetHeight)
    const maxWidth = Math.max(
      contentWidth,
      roundToGrid(labelRef.current.offsetWidth)
    )

    const radiusDiff = Math.max(
      0,
      Math.min(contentWidth - labelRef.current.offsetWidth, 5)
    )

    // 노드 크기가 변경된 경우 전역상태 업데이트
    if (node.size?.width !== maxWidth || node.size?.height !== contentHeight) {
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
      borderTopRightRadius: radiusDiff,
    })
  }, [node, zIndex])

  // 이미지 로딩이 완료된 후 스타일 적용
  useLayoutEffect(() => {
    handleStyle()
  }, [handleStyle])

  return { containerStyle, labelStyle, contentStyle }
}
