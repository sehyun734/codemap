export const monacoConfig = {
  language: 'customLanguage',
  languageConfig: {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
    ],
    wordPattern: /[a-zA-Z0-9_]+/,
    comments: { lineComment: '//', blockComment: ['/*', '*/'] },
  },
  theme: 'customLanguageTheme',
  themeConfig: {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '' }],
    colors: {
      'editor.background': '#1b1d1e',
      'editor.foreground': '#e6e6e6',
    },
  },
  editorOptions: {
    minimap: { enabled: false },
    quickSuggestions: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    tabCompletion: 'on',
    wordBasedSuggestions: false,
    fontSize: 13,
  },
}
