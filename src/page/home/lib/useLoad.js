import { useCallback, useEffect } from 'react'
import { useModal } from 'shared/hook/useModal'
import { useSearchParams } from 'react-router-dom'
import { getDiagramFromQuery } from 'shared/util/getDiagramFromQuery'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import { useMonacoStore } from 'shared/store/useMonacoStore'
import { useMsg } from 'shared/hook/useMsg'
import { MSG } from 'shared/const/msg'
import style from '../ui/style.module.css'

export const useLoad = () => {
  const { handleModal } = useModal()
  const { handleMsg } = useMsg()
  const [query, setQuery] = useSearchParams()

  const handleLocal = useCallback(() => {
    try {
      const { setInit } = useDiagramStore.getState()
      const diagramObj = JSON.parse(localStorage.getItem('diagram') || '{}')
      setInit(diagramObj)
      handleMsg(MSG.DEFAULT.LOAD_LOCAL_SUCCESS)
    } catch {
      handleMsg(MSG.DEFAULT.LOAD_LOCAL_FAIL, 'alert')
    }
  }, [handleMsg])

  const handleRemote = useCallback(() => {
    try {
      const { setInit } = useDiagramStore.getState()
      const { editor } = useMonacoStore.getState()
      const diagramQuery = query.get('diagram')
      const diagramObj = getDiagramFromQuery(diagramQuery)

      setInit(diagramObj)

      if (editor) {
        const model = editor.getModel()
        if (model) {
          model.setValue(diagramObj.editorText)
        }
      }

      handleMsg(MSG.DEFAULT.LOAD_QUERY_SUCCESS)
    } catch {
      handleMsg(MSG.DEFAULT.LOAD_QUERY_FAIL, 'alert')
    }
  }, [handleMsg, query])

  useEffect(() => {
    const isExistLocal = localStorage.getItem('diagram')
    const isExistRemote = query.get('diagram')

    if (isExistLocal) {
      handleLocal()
    }

    if (isExistRemote) {
      if (isExistLocal) {
        handleModal({
          submitBtn: <button>Confirm</button>,
          handleSubmit: handleRemote,
          innerForm: (
            <>
              <span className={style.title}>CAUTION!</span>
              <span className={style.sub}>
                Loading a new diagram will
                <span
                  style={{ color: 'var(--root-color-4)', fontWeight: '800' }}
                >
                  {' '}
                  replace{' '}
                </span>
                your current work.
                <br />
                Are you sure you want to proceed?
              </span>
            </>
          ),
        })
      } else {
        handleRemote()
      }
    }

    setQuery({}, { replace: true })
  }, [handleLocal, handleModal, handleRemote, setQuery, query])

  return {}
}
