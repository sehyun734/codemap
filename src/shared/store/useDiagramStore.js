import { create } from 'zustand'

export const useDiagramStore = create((set) => ({
  editorText: `table-1 {\n    content {\n        # lets gooooo\n\n        > hello there!!\n\n        |idx|product|\n        |---|---|\n        |1|lec|\n        |2|dic|\n        |3|sda|\n        |4|asq|\n        |5|ooi|\n        |6|zbn|\n        |7|buu|\n    }\n    connection {\n        table-2 arrow dashed\n    }\n}\ntable-2 {\n    content {\n        # wellll......\n\n       - [x] 체크\n        - [ ] **notice** ~~that~~\n\n        \`\`\`\n        com on!! 반가워\n        print("hello world")\n        \`\`\`\n    }\n    connection {\n        table-1 arrow \n    }\n}`,
  setEditorText: (newEditorText) => set({ editorText: newEditorText }),

  nodes: {
    'table-1': {
      label: 'table-1',
      content:
        '<h1>lets gooooo</h1>\n<blockquote>\n<p>hello there!!</p>\n</blockquote>\n<table>\n<thead>\n<tr>\n<th>idx</th>\n<th>product</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>lec</td>\n</tr>\n<tr>\n<td>2</td>\n<td>dic</td>\n</tr>\n<tr>\n<td>3</td>\n<td>sda</td>\n</tr>\n<tr>\n<td>4</td>\n<td>asq</td>\n</tr>\n<tr>\n<td>5</td>\n<td>ooi</td>\n</tr>\n<tr>\n<td>6</td>\n<td>zbn</td>\n</tr>\n<tr>\n<td>7</td>\n<td>buu</td>\n</tr>\n</tbody></table>\n',
      position: {
        x: 264,
        y: -110,
      },
      size: {
        width: 220,
        height: 396,
      },
    },
    'table-2': {
      label: 'table-2',
      content:
        '<h1>wellll......</h1>\n<ul>\n<li><input checked disabled type="checkbox" /> 체크</li>\n<li><input disabled type="checkbox" /> <strong>notice</strong> <del>that</del></li>\n</ul>\n<pre><code>com on!! 반가워\nprint("hello world")\n</code></pre>\n',
      position: {
        x: -176,
        y: 121,
      },
      size: {
        width: 242,
        height: 484,
      },
    },
  },
  setNodes: (newNodes) => set({ nodes: newNodes }),
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

  connections: {
    'table-1-table-2': {
      target: 'table-2',
      source: 'table-1',
      style: 'dashed',
      arrow: true,
    },
    'table-2-table-1': {
      target: 'table-1',
      source: 'table-2',
      arrow: true,
    },
  },

  setConnections: (newConnections) => set({ connections: newConnections }),
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

  screenPosition: {
    x: 600.5820135779869,
    y: 748.0345537464397,
  },
  setScreenPosition: (newScreenPosition) =>
    set({ screenPosition: newScreenPosition }),

  screenScale: 1,
  setScreenScale: (newScreenScale) => set({ screenScale: newScreenScale }),

  screenRef: null,
  setScreenRef: (newScreenRef) => set({ screenRef: newScreenRef }),
}))
