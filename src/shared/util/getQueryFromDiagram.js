import { useDiagramStore } from 'shared/store/useDiagramStore'
import lz from 'lz-string'

export const getQueryFromDiagram = () => {
  const { nodes, connections, editorText, screenPosition, screenScale } =
    useDiagramStore.getState()

  const diagramObj = {
    nodes,
    connections,
    editorText,
    screenPosition,
    screenScale,
  }

  return lz.compressToEncodedURIComponent(JSON.stringify(diagramObj))
}
