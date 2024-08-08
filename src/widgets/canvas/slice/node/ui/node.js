import React, { useRef } from 'react'
import style from './style.module.css'
import { useNodeStyles } from '../lib/useNodeStyles'
import { useNodeEvents } from '../lib/useNodeEvents'

export const Node = React.memo(({ node, zIndexHandler, zIndex }) => {
  const containerRef = useRef(null)
  const labelRef = useRef(null)
  const contentRef = useRef(null)

  const { containerStyle, labelStyle, contentStyle } = useNodeStyles(
    node,
    zIndex,
    containerRef,
    labelRef,
    contentRef
  )
  useNodeEvents(containerRef, node, zIndexHandler)

  return (
    <span className={style.container} ref={containerRef} style={containerStyle}>
      <span className={style.label} ref={labelRef} style={labelStyle}>
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
