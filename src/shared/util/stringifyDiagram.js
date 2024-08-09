export const stringifyDiagram = (diagramObj) => {
  return btoa(encodeURIComponent(JSON.stringify(diagramObj)))
}
