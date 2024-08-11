import React, { useRef, useEffect } from 'react'
import { Connection, Node, Screen } from '../slice'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import { useZIndex } from '../lib/useZIndex'
import { useConnectionInteractivity } from '../lib/useConnectionInteractivity'
import style from './style.module.css'

export const Canvas = React.memo(() => {
  const nodes = useDiagramStore((state) => state.nodes)
  const connections = useDiagramStore((state) => state.connections)
  const wrapperRef = useRef(null)

  console.log(useDiagramStore.getState())

  const { zIndex, handleZIndexMaximize } = useZIndex()
  const { handleInteractiveCheck } = useConnectionInteractivity()

  useEffect(() => {
    const { setScreenRef } = useDiagramStore.getState()
    setScreenRef(wrapperRef)
  })

  return (
    <div className={style.wrapper} ref={wrapperRef}>
      <Screen>
        {Object.values(nodes).map((node) => (
          <Node
            key={`${node.label}-${node.content}`}
            node={node}
            zIndex={zIndex[node.label]}
            handleZIndexMaximize={handleZIndexMaximize}
          />
        ))}
        {Object.entries(connections).map(([key, connection]) => (
          <Connection
            key={key}
            connection={connection}
            isInteractive={handleInteractiveCheck(
              connection.source,
              connection.target
            )}
            sourcePosition={nodes[connection.source].position}
            targetPosition={nodes[connection.target].position}
            sourceSize={nodes[connection.source].size}
            targetSize={nodes[connection.target].size}
            zIndex={Math.min(
              zIndex[connection.source] - 1 || 1,
              zIndex[connection.target] - 1 || 1
            )}
          />
        ))}
      </Screen>
    </div>
  )
})
