import { create } from 'zustand'

export const useDiagramStore = create((set) => ({
  editorText: `
table-1 {
    content {
        # Lets gooooo

        > 그렇구나~~~~
        그런거였어~


        |idx|product|
        |---|---|
        |1|lec|
        |2|dic|
        |3|sda|
        |4|asq|
        |5|ooi|
        |6|zbn|

        크핫
    }
    connection {
        table-2 arrow dashed
    }
}

table-2 {
    content {
        # wellll......
    }
    connection {
        table-1 arrow 
    }
}

hello-world! {
    content {

        반가우이 **안뇽!** 크핫
        lecomeon!
        hello world

        hahah lets goooooooooooo

        - [x] letsgoooo

        [lets gooooooo]()
    }
    connection {
        table-1 arrow,
    }
}

그레고리 {
    content {
        lets gooooooooo
    }
}`,
  setEditorText: (newEditorText) => set({ editorText: newEditorText }),

  nodes: {
    'table-1': {
      label: 'table-1',
      content:
        '<h1>Lets gooooo</h1>\n<blockquote>\n<p>그렇구나~~~~\n그런거였어~</p>\n</blockquote>\n<table>\n<thead>\n<tr>\n<th>idx</th>\n<th>product</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>lec</td>\n</tr>\n<tr>\n<td>2</td>\n<td>dic</td>\n</tr>\n<tr>\n<td>3</td>\n<td>sda</td>\n</tr>\n<tr>\n<td>4</td>\n<td>asq</td>\n</tr>\n<tr>\n<td>5</td>\n<td>ooi</td>\n</tr>\n<tr>\n<td>6</td>\n<td>zbn</td>\n</tr>\n</tbody></table>\n<p>크핫</p>\n',
      position: {
        x: 49.5,
        y: -280.5,
      },
      size: {
        width: 198,
        height: 429,
      },
    },
    'table-2': {
      label: 'table-2',
      content: '<h1>wellll......</h1>\n',
      position: {
        x: -165,
        y: 330,
      },
      size: {
        width: 165,
        height: 66,
      },
    },
    'hello-world!': {
      label: 'hello-world!',
      content:
        '<p>반가우이 <strong>안뇽!</strong> 크핫\nlecomeon!\nhello world</p>\n<p>hahah lets goooooooooooo</p>\n<ul>\n<li><input checked disabled type="checkbox" /> letsgoooo</li>\n</ul>\n<p><a>lets gooooooo</a></p>\n',
      position: {
        x: -379.5,
        y: -82.5,
      },
      size: {
        width: 198,
        height: 198,
      },
    },
    그레고리: {
      label: '그레고리',
      content: '<p>lets gooooooooo</p>\n',
      position: {
        x: -346.5,
        y: -544.5,
      },
      size: {
        width: 132,
        height: 66,
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
    'hello-world!-table-1': {
      target: 'table-1',
      source: 'hello-world!',
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
    x: 423.47237069666545,
    y: 734.1585349654125,
  },
  setScreenPosition: (newScreenPosition) =>
    set({ screenPosition: newScreenPosition }),

  screenScale: 0.5981368734922745,
  setScreenScale: (newScreenScale) => set({ screenScale: newScreenScale }),

  screenRef: null,
  setScreenRef: (newScreenRef) => set({ screenRef: newScreenRef }),
}))
