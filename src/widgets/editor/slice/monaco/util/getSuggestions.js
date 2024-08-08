import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export const getSuggestions = (result, cursor) => {
  const currentBlock = findCurrentBlock(result, cursor)
  const nodeLabels = result.map((node) => node.label)

  // 현재 블록의 깊이에 따라 다른 제안 생성
  if (currentBlock.depth === 1) {
    return getKeywordSuggestions(currentBlock)
  } else if (currentBlock.depth === 2) {
    if (currentBlock.type === 'connection') {
      return getConnectionSuggestions(currentBlock, nodeLabels)
    }
  }

  // 블록 외부이거나 처리할 수 없는 깊이인 경우 빈 배열 반환
  return []
}

// 키워드 제안 생성 함수
const getKeywordSuggestions = (currentBlock) => {
  const keywords = ['content', 'connection']
  const existingKeywords = new Set(currentBlock.keys)

  // 아직 사용되지 않은 키워드만 필터링하여 제안 생성
  return keywords
    .filter((keyword) => !existingKeywords.has(keyword))
    .map((keyword) => ({
      label: keyword,
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: `${keyword} {\n\t$0\n}`,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    }))
}

// 연결 제안 생성 함수
const getConnectionSuggestions = (currentBlock, labels) => {
  const writtenLabels = new Set(
    currentBlock.data.map((connection) => connection.target)
  )
  const connectionOptions = ['solid', 'dashed', 'arrow']
  const suggestions = []

  // 연결 옵션 제안
  for (const option of connectionOptions) {
    suggestions.push({
      label: option,
      kind: monaco.languages.CompletionItemKind.Color,
      insertText: option,
    })
  }

  // 아직 사용되지 않은 라벨 제안
  for (const label of labels) {
    if (!writtenLabels.has(label) && currentBlock.withIn !== label) {
      suggestions.push({
        label,
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: label,
      })
    }
  }

  return suggestions
}

// 현재 커서 위치의 블록을 찾는 함수
const findCurrentBlock = (result, cursor) => {
  for (const node of result) {
    if (isWithinRange(node.braceRange, cursor)) {
      const block = { depth: 1, withIn: node.label, keys: Object.keys(node) }

      // 중첩된 블록 확인
      for (const keyword of ['connection', 'content']) {
        if (node[keyword] && isWithinRange(node[keyword].braceRange, cursor)) {
          return {
            depth: 2,
            type: keyword,
            withIn: node.label,
            data: node[keyword].data,
          }
        }
      }

      return block
    }
  }

  // 블록 외부인 경우
  return { depth: 0 }
}

// 주어진 커서가 범위 내에 있는지 확인하는 함수
const isWithinRange = (braceRange, cursor) => {
  const { open, close } = braceRange

  if (
    cursor.lineNumber > open.end.y ||
    (cursor.lineNumber === open.end.y && cursor.column >= open.end.x)
  ) {
    if (
      cursor.lineNumber < close.begin.y ||
      (cursor.lineNumber === close.begin.y && cursor.column <= close.begin.x)
    ) {
      return true
    }
  }

  return false
}
