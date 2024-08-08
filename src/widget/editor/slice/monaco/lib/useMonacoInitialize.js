import { useCallback } from 'react'
import { useMonacoStore } from 'shared/store/useMonacoStore'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import { monacoConfig } from '../config/monacoConfig'

export const useMonacoInitialize = (handleUpdateMonaco, suggestionsRef) => {
  const initializeMonaco = useCallback(
    (editor, monaco) => {
      const { setEditor, setMonaco } = useMonacoStore.getState()
      const { editorText } = useDiagramStore.getState()
      setEditor(editor)
      setMonaco(monaco)

      monaco.languages.registerCompletionItemProvider(monacoConfig.language, {
        triggerCharacters: ['c', 's', 'd', 'a', '{'],
        provideCompletionItems: (model, position) => ({
          suggestions: suggestionsRef.current.filter((s) =>
            s.label
              .toLowerCase()
              .startsWith(
                model.getWordUntilPosition(position).word.toLowerCase()
              )
          ),
        }),
      })

      const model = editor.getModel()
      if (model) {
        model.setValue(editorText)
      }

      handleUpdateMonaco()
      editor.onDidChangeModelContent(handleUpdateMonaco)

      monaco.languages.register({ id: monacoConfig.language })
      monaco.languages.setLanguageConfiguration(
        monacoConfig.language,
        monacoConfig.languageConfig
      )
      monaco.editor.defineTheme(monacoConfig.theme, monacoConfig.themeConfig)
      monaco.editor.setTheme(monacoConfig.theme)
    },
    [handleUpdateMonaco, suggestionsRef]
  )

  return { initializeMonaco }
}
