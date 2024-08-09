import { getCurrentDateTime } from 'shared/util/getCurrentDateTime'
import { create } from 'zustand'

export const useDiagramStore = create((set) => ({
  setInit: (initialData) => set((state) => ({ ...state, ...initialData })),

  createdAt: getCurrentDateTime(),
  setCreatedAt: (newIndex) => set((state) => ({ createdAt: newIndex })),

  name: 'untitled',
  setName: (newName) => set((state) => ({ name: newName })),

  order: [],
  setOrder: (newOrder) => set((state) => ({ order: newOrder })),

  editorText: '',
  setEditorText: (newEditorText) =>
    set((state) => ({ editorText: newEditorText })),

  errors: [],
  setErrors: (newErrors) => set((state) => ({ errors: newErrors })),

  nodes: {},
  updateNode: (newNode) =>
    set((state) => ({
      nodes: {
        ...state.nodes,
        [newNode.label]: newNode,
      },
    })),
  deleteNode: (key) => {
    set((state) => {
      const { [key]: _, ...restNodes } = state.nodes
      return { nodes: restNodes }
    })
  },

  connections: {},
  updateConnection: (newConnection) => {
    set((state) => ({
      connections: {
        ...state.connections,
        [`${newConnection.source}-${newConnection.target}`]: newConnection,
      },
    }))
  },
  deleteConnection: (key) => {
    set((state) => {
      const { [key]: _, ...restConnections } = state.connections
      return { connections: restConnections }
    })
  },

  screenPosition: { x: 0, y: 0 },
  setScreenPosition: (newScreenPosition) =>
    set({ screenPosition: newScreenPosition }),

  screenScale: 1,
  setScreenScale: (newScreenScale) => set({ screenScale: newScreenScale }),

  screenRef: null,
  setScreenRef: (newScreenRef) => set({ screenRef: newScreenRef }),
}))
