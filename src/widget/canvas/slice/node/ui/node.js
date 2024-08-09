import React, { useRef } from 'react'
import style from './style.module.css'
import { useNodeStyles } from '../lib/useNodeStyles'
import { useNodeListener } from '../lib/useNodeListener'

export const Node = React.memo(({ node, handleZIndexMaximize, zIndex }) => {
  const containerRef = useRef(null)
  const labelRef = useRef(null)
  const contentRef = useRef(null)

  const { containerStyle, contentStyle } = useNodeStyles(
    node,
    zIndex,
    containerRef,
    labelRef,
    contentRef
  )
  useNodeListener(containerRef, node, handleZIndexMaximize)

  return (
    <span className={style.container} ref={containerRef} style={containerStyle}>
      <span className={style.label} ref={labelRef}>
        {node.label}
      </span>
      <span
        className={style.content}
        ref={contentRef}
        style={contentStyle}
        dangerouslySetInnerHTML={{ __html: node.content || '' }}
      />
    </span>
  )
})
