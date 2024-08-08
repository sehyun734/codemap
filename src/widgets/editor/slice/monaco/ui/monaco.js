'use client'

import React, { useEffect, useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import { monacoConfig } from '../config/monacoConfig'
import { useMonacoUpdate } from '../lib/useMonacoUpdate'
import { useMonacoInitialize } from '../lib/useMonacoInitialize'

export const Monaco = () => {
  const decorationsRef = useRef([])
  const suggestionsRef = useRef([])
  const updateTimeoutRef = useRef(null)

  const { handleUpdateMonaco } = useMonacoUpdate(
    decorationsRef,
    suggestionsRef,
    updateTimeoutRef
  )
  const { initializeMonaco } = useMonacoInitialize(
    handleUpdateMonaco,
    suggestionsRef
  )

  useEffect(() => {
    const curUpdateTimeoutRef = updateTimeoutRef.current

    return () => clearTimeout(curUpdateTimeoutRef)
  }, [updateTimeoutRef])

  return (
    <Editor
      defaultLanguage={monacoConfig.language}
      theme={monacoConfig.theme}
      onMount={initializeMonaco}
      options={monacoConfig.editorOptions}
    />
  )
}
