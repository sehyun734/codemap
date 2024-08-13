import { create } from 'zustand'

export const useDiagramStore = create((set) => ({
  setInit: (initialData) => set((state) => ({ ...state, ...initialData })),

  name: 'codemap-untitled',
  setName: (newName) => set((state) => ({ name: newName })),

  editorText:
    "\nintro {\n    content {\n        # Welcome to CodeMap! 👋 \n\n        Hi, I'm **Sehyun**,\n\n        Thank you for using my codemap service.\n\n        I hope you enjoy working with `codemap`!\n    }\n    connection {\n        getting-started dashed\n    }\n}\n\npepe {\n    content {\n        ⠄⠄⠄⠄⣠⣴⣿⣿⣿⣷⣦⡠⣴⣶⣶⣶⣦⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄\n        ⠄⠄⠄⣴⣿⣿⣫⣭⣭⣭⣭⣥⢹⣟⣛⣛⣛⣃⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄\n        ⠄⣠⢸⣿⣿⣿⣿⢯⡓⢻⠿⠿⠷⡜⣯⠭⢽⠿⠯⠽⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄\n        ⣼⣿⣾⣿⣿⣿⣥⣝⠂⠐⠈⢸⠿⢆⠱⠯⠄⠈⠸⣛⡒⠄⠄⠄⠄⠄⠄⠄⠄⠄\n        ⣿⣿⣿⣿⣿⣿⣿⣶⣶⣭⡭⢟⣲⣶⡿⠿⠿⠿⠿⠋⠄⠄⣴⠶⠶⠶⠶⠶⢶⡀\n        ⣿⣿⣿⣿⣿⢟⣛⠿⢿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣷⡄⠄⢰⠇⠄⠄⠄⠄⠄⠈⣧\n        ⣿⣿⣿⣿⣷⡹⣭⣛⠳⠶⠬⠭⢭⣝⣛⣛⣛⣫⣭⡥⠄⠸⡄⣶⣶⣾⣿⣿⢇⡟\n        ⠿⣿⣿⣿⣿⣿⣦⣭⣛⣛⡛⠳⠶⠶⠶⣶⣶⣶⠶⠄⠄⠄⠙⠮⣽⣛⣫⡵⠊⠁\n        ⣍⡲⠮⣍⣙⣛⣛⡻⠿⠿⠿⠿⠿⠿⠿⠖⠂⠄⠄⠄⠄⠄⠄⠄⠄⣸⠄⠄⠄⠄\n        ⣿⣿⣿⣶⣦⣬⣭⣭⣭⣝⣭⣭⣭⣴⣷⣦⡀⠄⠄⠄⠄⠄⠄⠠⠤⠿⠦⠤⠄⠄\n    }\n}\n\ngetting-started {\n    content {\n        # Getting Started\n\n        Let's begin your codemap journey!\n    }\n    connection {\n        tutorial-1 arrow\n    }\n}\n\ntutorial-1 {\n    content {\n        ## Declaring a `node`\n\n        > You can declare a node with its name followed by braces.\n\n        For example:\n\n        ```\n        node-1 {}\n        ```\n    }\n    connection {\n        tutorial-2 arrow,\n    }\n}\n\ntutorial-2 {\n    content {\n       ## Adding `keywords`\n\n        > You can add keywords inside a node block.\n\n        For example:\n\n        ```\n        node-1 {\n            content {}\n            connection {}\n        }\n        ```\n\n        There are two types of keywords:\n        - `content`: For adding node content\n        - `connection`: For specifying node relationships\n    }\n    connection {\n        tutorial-3 arrow, tutorial-4 arrow\n    }\n}\n\ntutorial-3 {\n    content {\n        ## Using `content`\n\n        The `content` keyword is for writing the node's content.\n        You can use **Markdown language** here.\n\n        For example:\n        - `**bold text**` renders as **bold text**\n        - `*italic text*` renders as *italic text*\n        - `# Heading` creates a heading\n    }\n}\ntutorial-4 {\n    content {\n        ## Using `connection`\n\n        The `connection` keyword is for drawing relationships between nodes.\n\n        You can specify four parameters inside a connection:\n\n        1. Target node (required)\n        2. Color (optional): Use hexcode\n        3. Arrow (optional): Add directionality\n        4. Style (optional): e.g., 'dashed'\n\n        For example:\n\n        ```\n        ...\n\n        connection {\n            node-1 arrow,\n            node-2 dashed #fff,\n        }\n        ```\n    }\n}",
  setEditorText: (newEditorText) =>
    set((state) => ({ editorText: newEditorText })),

  errors: [],
  setErrors: (newErrors) => set((state) => ({ errors: newErrors })),

  nodes: {
    'tutorial-1': {
      label: 'tutorial-1',
      content:
        '<h2>Declaring a <code>node</code></h2>\n<blockquote>\n<p>You can declare a node with its name followed by braces.</p>\n</blockquote>\n<p>For example:</p>\n<pre><code>node-1 {}\n</code></pre>\n',
      position: { x: -66, y: 445.5 },
      size: { width: 462, height: 264 },
    },
    'tutorial-2': {
      label: 'tutorial-2',
      content:
        '<h2>Adding <code>keywords</code></h2>\n<blockquote>\n<p>You can add keywords inside a node block.</p>\n</blockquote>\n<p>For example:</p>\n<pre><code>node-1 {\n    content {}\n    connection {}\n}\n</code></pre>\n<p>There are two types of keywords:</p>\n<ul>\n<li><code>content</code>: For adding node content</li>\n<li><code>connection</code>: For specifying node relationships</li>\n</ul>\n',
      position: { x: -693, y: 528 },
      size: { width: 363, height: 429 },
    },
    'getting-started': {
      label: 'getting-started',
      content:
        "<h1>Getting Started</h1>\n<p>Let's begin your codemap journey!</p>\n",
      position: { x: -66, y: 132 },
      size: { width: 264, height: 99 },
    },
    'tutorial-3': {
      label: 'tutorial-3',
      content:
        "<h2>Using <code>content</code></h2>\n<p>The <code>content</code> keyword is for writing the node's content.\nYou can use <strong>Markdown language</strong> here.</p>\n<p>For example:</p>\n<ul>\n<li><code>**bold text**</code> renders as <strong>bold text</strong></li>\n<li><code>*italic text*</code> renders as <em>italic text</em></li>\n<li><code># Heading</code> creates a heading</li>\n</ul>\n",
      position: { x: -957, y: 1072.5 },
      size: { width: 429, height: 264 },
    },
    'tutorial-4': {
      label: 'tutorial-4',
      content:
        "<h2>Using <code>connection</code></h2>\n<p>The <code>connection</code> keyword is for drawing relationships between nodes.</p>\n<p>You can specify four parameters inside a connection:</p>\n<ol>\n<li>Target node (required)</li>\n<li>Color (optional): Use hexcode</li>\n<li>Arrow (optional): Add directionality</li>\n<li>Style (optional): e.g., 'dashed'</li>\n</ol>\n<p>For example:</p>\n<pre><code>...\n\nconnection {\n    node-1 arrow,\n    node-2 dashed #fff,\n}\n</code></pre>\n",
      position: { x: -396, y: 1171.5 },
      size: { width: 495, height: 462 },
    },
    pepe: {
      label: 'pepe',
      content:
        '<p>⠄⠄⠄⠄⣠⣴⣿⣿⣿⣷⣦⡠⣴⣶⣶⣶⣦⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⠄⠄⠄⣴⣿⣿⣫⣭⣭⣭⣭⣥⢹⣟⣛⣛⣛⣃⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⠄⣠⢸⣿⣿⣿⣿⢯⡓⢻⠿⠿⠷⡜⣯⠭⢽⠿⠯⠽⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⣼⣿⣾⣿⣿⣿⣥⣝⠂⠐⠈⢸⠿⢆⠱⠯⠄⠈⠸⣛⡒⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⣿⣿⣿⣿⣿⣿⣿⣶⣶⣭⡭⢟⣲⣶⡿⠿⠿⠿⠿⠋⠄⠄⣴⠶⠶⠶⠶⠶⢶⡀\n⣿⣿⣿⣿⣿⢟⣛⠿⢿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣷⡄⠄⢰⠇⠄⠄⠄⠄⠄⠈⣧\n⣿⣿⣿⣿⣷⡹⣭⣛⠳⠶⠬⠭⢭⣝⣛⣛⣛⣫⣭⡥⠄⠸⡄⣶⣶⣾⣿⣿⢇⡟\n⠿⣿⣿⣿⣿⣿⣦⣭⣛⣛⡛⠳⠶⠶⠶⣶⣶⣶⠶⠄⠄⠄⠙⠮⣽⣛⣫⡵⠊⠁\n⣍⡲⠮⣍⣙⣛⣛⡻⠿⠿⠿⠿⠿⠿⠿⠖⠂⠄⠄⠄⠄⠄⠄⠄⠄⣸⠄⠄⠄⠄\n⣿⣿⣿⣶⣦⣬⣭⣭⣭⣝⣭⣭⣭⣴⣷⣦⡀⠄⠄⠄⠄⠄⠄⠠⠤⠿⠦⠤⠄⠄</p>\n',
      position: { x: -66, y: -561 },
      size: { width: 330, height: 231 },
    },
    intro: {
      label: 'intro',
      content:
        "<h1>Welcome to CodeMap! 👋</h1>\n<p>Hi, I'm <strong>Sehyun</strong>,</p>\n<p>Thank you for using my codemap service.</p>\n<p>I hope you enjoy working with <code>codemap</code>!</p>\n",
      position: { x: -66, y: -280.5 },
      size: { width: 396, height: 198 },
    },
  },
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
    'getting-started-tutorial-1': {
      target: 'tutorial-1',
      source: 'getting-started',
      arrow: true,
    },
    'tutorial-1-tutorial-2': {
      target: 'tutorial-2',
      source: 'tutorial-1',
      arrow: true,
    },
    'tutorial-2-tutorial-3': {
      target: 'tutorial-3',
      source: 'tutorial-2',
      arrow: true,
    },
    'tutorial-2-tutorial-4': {
      target: 'tutorial-4',
      source: 'tutorial-2',
      arrow: true,
    },
    'intro-getting-started': {
      target: 'getting-started',
      source: 'intro',
      style: 'dashed',
    },
  },
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

  screenPosition: { x: 455, y: 610 },
  setScreenPosition: (newScreenPosition) =>
    set({ screenPosition: newScreenPosition }),

  screenScale: 0.75,
  setScreenScale: (newScreenScale) => set({ screenScale: newScreenScale }),

  screenRef: null,
  setScreenRef: (newScreenRef) => set({ screenRef: newScreenRef }),
}))
