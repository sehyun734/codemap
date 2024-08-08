import React from "react"
import style from "./style.module.css"
import { useConnectionStyles } from "../lib/useConnectionStyles"

export const Connection = React.memo(
  ({ connection, isInteractive, sourcePosition, sourceSize, targetPosition, targetSize, zIndex }) => {
    const { lineStyle, arrowStyle } = useConnectionStyles(
      connection,
      isInteractive,
      sourcePosition,
      sourceSize,
      targetPosition,
      targetSize,
      zIndex
    )

    return (
      <span className={style.line} style={lineStyle}>
        <span className={style.arrow} style={arrowStyle} />
      </span>
    )
  }
)
