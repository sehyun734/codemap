export const parseDiagram = (diagramStr) => {
  return JSON.parse(decodeURIComponent(atob(diagramStr)))
}
