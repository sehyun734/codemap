import { useDiagramStore } from 'shared/store/useDiagramStore'

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

  return btoa(encodeURIComponent(JSON.stringify(diagramObj)))
}
