import { useMemo, useCallback } from 'react'
import { CONST } from 'shared/const/const'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useScreenStyles = () => {
  // 상태 가져오기
  const screenPosition = useDiagramStore((state) => state.screenPosition)
  const screenScale = useDiagramStore((state) => state.screenScale)

  // 상수 구조 분해 할당
  const { GRID_SIZE, FADE_THRESHOLD, MIN_OPACITY, MAX_OPACITY, MAX_ZOOM } =
    CONST

  // 불투명도 계산 함수
  const calculateOpacity = useCallback(
    (scale) => {
      if (scale <= FADE_THRESHOLD) return 0
      const opRange = MAX_OPACITY - MIN_OPACITY
      const scaleRange = MAX_ZOOM - FADE_THRESHOLD
      return Math.floor(
        MIN_OPACITY + ((scale - FADE_THRESHOLD) / scaleRange) * opRange
      )
    },
    [FADE_THRESHOLD, MIN_OPACITY, MAX_OPACITY, MAX_ZOOM]
  )

  // 그리드 크기 계산 함수
  const calculateGridSize = useCallback(
    (scale) => (GRID_SIZE / 2) * scale,
    [GRID_SIZE]
  )

  // 배경 스타일 계산
  const bgStyle = useMemo(() => {
    if (screenScale <= FADE_THRESHOLD) return { backgroundImage: 'none' }

    const opacity = calculateOpacity(screenScale)
    const gridSize = calculateGridSize(screenScale)

    return {
      backgroundImage: `
        repeating-linear-gradient(
          to right,
          rgba(var(--theme-bgOpposite-rgb), ${opacity * 0.1}%) 0px,
          rgba(var(--theme-bgOpposite-rgb), ${opacity * 0.1}%) 1px,
          transparent 1px,
          transparent ${gridSize}px
        ),
        repeating-linear-gradient(
          to right,
          rgba(var(--theme-bgOpposite-rgb), ${opacity * 0.2}%) 0px,
          rgba(var(--theme-bgOpposite-rgb), ${opacity * 0.2}%) 1px,
          transparent 1px,
          transparent ${gridSize * 4}px
        ),
        repeating-linear-gradient(
          to bottom,
          rgba(var(--theme-bgOpposite-rgb), ${opacity * 0.1}%) 0px,
          rgba(var(--theme-bgOpposite-rgb), ${opacity * 0.1}%) 1px,
          transparent 1px,
          transparent ${gridSize}px
        ),
        repeating-linear-gradient(
          to bottom,
          rgba(var(--theme-bgOpposite-rgb), ${opacity * 0.2}%) 0px,
          rgba(var(--theme-bgOpposite-rgb), ${opacity * 0.2}%) 1px,
          transparent 1px,
          transparent ${gridSize * 4}px
        )
      `,
      backgroundPosition: `${screenPosition.x}px ${screenPosition.y}px`,
      backgroundSize: `${gridSize * 4}px ${gridSize * 4}px`,
    }
  }, [
    screenPosition,
    screenScale,
    calculateOpacity,
    calculateGridSize,
    FADE_THRESHOLD,
  ])

  // 중앙 요소 스타일 계산
  const centerStyle = useMemo(
    () => ({
      transform: `translate(${screenPosition.x}px, ${screenPosition.y}px) scale(${screenScale})`,
    }),
    [screenPosition, screenScale]
  )

  return { bgStyle, centerStyle }
}
