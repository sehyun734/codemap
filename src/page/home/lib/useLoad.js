import { useCallback, useEffect } from 'react'
import { useModal } from 'shared/hook/useModal'
import style from '../ui/style.module.css'
import { useSearchParams } from 'react-router-dom'
import { getDiagramFromQuery } from 'shared/util/getDiagramFromQuery'
import { useDiagramStore } from 'shared/store/useDiagramStore'
import { useMonacoStore } from 'shared/store/useMonacoStore'
import { useMsg } from 'shared/hook/useMsg'
import { MSG } from 'shared/const/msg'

export const useLoad = () => {
  const { handleModal } = useModal()
  const { handleMsg } = useMsg()
  const [query, setQuery] = useSearchParams()

  const handleLocal = useCallback(() => {
    try {
      const { setInit } = useDiagramStore.getState()

      const { nodes, connections, screenPosition, editorText, screenScale } =
        JSON.parse(localStorage.getItem('diagram'))

      setInit({
        nodes,
        editorText,
        connections,
        screenPosition,
        screenScale,
      })
      handleMsg(MSG.DEFAULT.LOAD_LOCAL_SUCCESS)
    } catch {
      handleMsg(MSG.DEFAULT.LOAD_LOCAL_FAIL)
    } finally {
    }
  }, [])

  const handleRemote = useCallback(() => {
    try {
      const { editor } = useMonacoStore.getState()
      if (!editor) {
        const { setInit } = useDiagramStore.getState()

        const diagramQuery = query.get('diagram')
        const { nodes, connections, screenPosition, editorText, screenScale } =
          getDiagramFromQuery(diagramQuery)

        setInit({
          nodes,
          connections,
          editorText,
          screenPosition,
          screenScale,
        })
      } else {
        const { setInit } = useDiagramStore.getState()

        const diagramQuery = query.get('diagram')
        const { nodes, connections, screenPosition, editorText, screenScale } =
          getDiagramFromQuery(diagramQuery)

        setInit({
          nodes,
          connections,
          screenPosition,
          screenScale,
        })

        const model = editor.getModel()
        if (model) {
          model.setValue(editorText)
        }
      }

      setQuery({})

      handleMsg(MSG.DEFAULT.LOAD_QUERY_SUCCESS)
    } catch {
      handleMsg(MSG.DEFAULT.LOAD_QUERY_FAIL)
    } finally {
    }
  }, [])

  useEffect(() => {
    try {
      const isExistLocal = localStorage.getItem('diagram')
      const isExistRemote = query.get('diagram')

      if (isExistLocal) {
        handleLocal()
      }

      if (!isExistLocal && isExistRemote) {
        handleRemote()
      }

      if (isExistLocal && isExistRemote) {
        handleModal({
          submitBtn: <button>confirm</button>,
          handleSubmit: handleRemote,
          innerForm: (
            <>
              <span className={style.title}>WAIT!</span>
              <span className={style.sub}>
                Load a new diagram will
                <span
                  style={{ color: 'var(--root-color-4', fontWeight: '800' }}
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
      }
    } catch {
    } finally {
    }
  }, [])

  return {}
}
