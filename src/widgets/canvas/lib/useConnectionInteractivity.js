import { useCallback } from 'react'
import { useDiagramStore } from 'shared/store/useDiagramStore'

export const useConnectionInteractivity = () => {
  const connections = useDiagramStore((state) => state.connections)

  const handleInteractiveCheck = useCallback(
    (source, target) => `${target}-${source}` in connections,
    [connections]
  )

  return { handleInteractiveCheck }
}
