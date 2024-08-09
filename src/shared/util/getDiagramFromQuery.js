export const getDiagramFromQuery = (diagramQuery) => {
  return JSON.parse(decodeURIComponent(atob(diagramQuery)))
}
