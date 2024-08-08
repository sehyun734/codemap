import { create } from 'zustand'

export const useMonacoStore = create((set) => ({
  monaco: null,
  setMonaco: (newMonaco) => set({ monaco: newMonaco }),

  editor: null,
  setEditor: (newEditor) => set({ editor: newEditor }),
}))
