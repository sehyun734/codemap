import lz from 'lz-string'

export const getDiagramFromQuery = (diagramQuery) => {
  return JSON.parse(lz.decompressFromEncodedURIComponent(diagramQuery))
}
