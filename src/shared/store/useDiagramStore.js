import { create } from 'zustand'

export const useDiagramStore = create((set) => ({
  editorText: `
table-1 {
    content {
        # Lets goooo

        |idx|product|
        |---|---|
        |1|lec|
        |2|dic|
        |3|sda|
        |4|asq|
        |5|ooi|
        |6|zbn|
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

Lorem-ipsum {
    content {
        **Lorem Ipsum** is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    }
    connection {
        table-1 arrow
    }
}

hello-world! {
    content {
        # 반가우이

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
}
  `,

  setEditorText: (newEditorText) =>
    set((state) => ({ editorText: newEditorText })),

  errors: [],
  setErrors: (newErrors) => set((state) => ({ errors: newErrors })),

  nodes: {
    'table-1': {
      label: 'table-1',
      content:
        '<h1>Lets goooo</h1>\n<table>\n<thead>\n<tr>\n<th>idx</th>\n<th>product</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>lec</td>\n</tr>\n<tr>\n<td>2</td>\n<td>dic</td>\n</tr>\n<tr>\n<td>3</td>\n<td>sda</td>\n</tr>\n<tr>\n<td>4</td>\n<td>asq</td>\n</tr>\n<tr>\n<td>5</td>\n<td>ooi</td>\n</tr>\n<tr>\n<td>6</td>\n<td>zbn</td>\n</tr>\n</tbody></table>\n',
      position: {
        x: -396,
        y: 214.5,
      },
      size: {
        width: 198,
        height: 297,
      },
    },
    'table-2': {
      label: 'table-2',
      content: '<h1>wellll......</h1>\n',
      position: {
        x: -214.5,
        y: -181.5,
      },
      size: {
        width: 165,
        height: 66,
      },
    },
    'hello-world!': {
      label: 'hello-world!',
      content:
        '<h1>반가우이</h1>\n<p>반가우이 <strong>안뇽!</strong> 크핫\nlecomeon!\nhello world</p>\n<p>hahah lets goooooooooooo</p>\n<ul>\n<li><input checked disabled type="checkbox" /> letsgoooo</li>\n</ul>\n<p><a>lets gooooooo</a></p>\n',
      position: {
        x: -16.5,
        y: 297,
      },
      size: {
        width: 231,
        height: 264,
      },
    },
    그레고리: {
      label: '그레고리',
      content: '<p>lets gooooooooo</p>\n',
      position: {
        x: 66,
        y: 66,
      },
      size: {
        width: 165,
        height: 66,
      },
    },
    'Lorem-ipsum': {
      label: 'Lorem-ipsum',
      content:
        "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s,\nwhen an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n",
      position: {
        x: -132,
        y: 594,
      },
      size: {
        width: 660,
        height: 99,
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
    'Lorem-ipsum-table-1': {
      target: 'table-1',
      source: 'Lorem-ipsum',
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
    x: 511.7349027652133,
    y: 472.99107479914414,
  },
  setScreenPosition: (newScreenPosition) =>
    set({ screenPosition: newScreenPosition }),

  screenScale: 0.9,
  setScreenScale: (newScreenScale) => set({ screenScale: newScreenScale }),

  screenRef: null,
  setScreenRef: (newScreenRef) => set({ screenRef: newScreenRef }),
}))
