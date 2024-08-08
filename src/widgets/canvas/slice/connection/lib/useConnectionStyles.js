import { useCallback, useEffect, useState, useMemo } from 'react'
import { CONST } from '../../../const/const'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useConnectionStyles = (
  connection,
  isInteractive,
  sourcePosition,
  sourceSize,
  targetPosition,
  targetSize,
  zIndex
) => {
  const [lineStyle, setLineStyle] = useState({})
  const [arrowStyle, setArrowStyle] = useState({})

  // 요소와 선의 교차점 계산
  const calculateIntersection = useCallback((width, height, angle) => {
    const { screenScale } = useDiagramStore.getState()
    const w2 = width / (2 * screenScale)
    const h2 = height / (2 * screenScale)
    const tanAngle = Math.tan(angle)

    return (
      (Math.abs(tanAngle) < height / width
        ? Math.abs(w2 / Math.cos(angle))
        : Math.abs(h2 / Math.sin(angle))) * screenScale
    )
  }, [])

  // 선의 기하학적 특성 계산
  const lineGeometry = useMemo(() => {
    const dx = targetPosition.x - sourcePosition.x
    const dy = targetPosition.y - sourcePosition.y
    const angle = Math.atan2(dy, dx)
    const fullLength = Math.sqrt(dx * dx + dy * dy)

    const sourceIntersect = calculateIntersection(
      sourceSize.width,
      sourceSize.height,
      angle
    )
    const targetIntersect = calculateIntersection(
      targetSize.width,
      targetSize.height,
      angle + Math.PI
    )

    return { angle, fullLength, sourceIntersect, targetIntersect }
  }, [
    sourcePosition,
    targetPosition,
    sourceSize,
    targetSize,
    calculateIntersection,
  ])

  // 선 스타일 설정
  const handleLineStyle = useCallback(() => {
    const { angle, fullLength, sourceIntersect, targetIntersect } = lineGeometry
    const shortenedLength =
      fullLength -
      sourceIntersect -
      targetIntersect -
      (connection.arrow ? CONST.CONN_SPACE * 2.4 : CONST.CONN_SPACE * 2)

    if (shortenedLength < 0) {
      return setLineStyle({ display: 'none' })
    }

    const newStartX =
      sourcePosition.x + Math.cos(angle) * (sourceIntersect + CONST.CONN_SPACE)
    const newStartY =
      sourcePosition.y + Math.sin(angle) * (sourceIntersect + CONST.CONN_SPACE)

    setLineStyle({
      top: `${newStartY}px`,
      left: `${newStartX}px`,
      width: `${shortenedLength}px`,
      transform: `rotate(${angle * (180 / Math.PI)}deg) ${
        isInteractive ? 'translateY(150%)' : ''
      }`,
      borderStyle: connection.style || 'solid',
      borderWidth: `${CONST.CONN_WIDTH}px`,
      borderTopColor: connection.color,
      zIndex,
    })
  }, [lineGeometry, connection, isInteractive, sourcePosition, zIndex])

  // 화살표 스타일 설정
  const handleArrowStyle = useCallback(() => {
    setArrowStyle(
      connection.arrow
        ? {
            left: `100%`,
            top: `calc(50% - ${CONST.CONN_WIDTH / 2}px)`,
            backgroundColor: connection.color,
          }
        : { display: 'none' }
    )
  }, [connection.arrow, connection.color])

  // 스타일 업데이트 효과
  useEffect(() => {
    handleArrowStyle()
    handleLineStyle()
  }, [handleArrowStyle, handleLineStyle])

  return { lineStyle, arrowStyle }
}
