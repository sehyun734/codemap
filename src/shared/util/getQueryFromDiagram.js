import { useDiagramStore } from 'shared/store/useDiagramStore'
import lz from 'lz-string'

export const getQueryFromDiagram = () => {
  const { name, nodes, connections, editorText, screenPosition, screenScale } =
    useDiagramStore.getState()

  const diagramObj = {
    name,
    nodes,
    connections,
    editorText,
    screenPosition,
    screenScale,
  }

  return lz.compressToEncodedURIComponent(JSON.stringify(diagramObj))
}
