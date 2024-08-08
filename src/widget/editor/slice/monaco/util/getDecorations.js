export const getDecorations = (result) => {
  const styles = {
    node: 'var(--root-color-1)',
    nodeBraces: 'var(--root-color-1)',
    keyword: 'var(--root-color-3)',
    keywordBraces: 'var(--root-color-3)',
    content: 'var(--root-white-1)',
    connection: 'var(--root-color-1)',
    connectionOption: 'var(--root-white-1)',
  }

  const createDecorations = (ranges, className) =>
    ranges
      .filter(Boolean)
      .map((range) => ({ range, options: { inlineClassName: className } }))

  // 노드 라벨 범위
  const nodeRanges = result.map((node) => node.wordRange)

  // 노드 중괄호 범위
  const nodeBraceRanges = result.flatMap((node) =>
    Object.values(node.braceRange)
  )

  // 키워드 범위
  const keywordRanges = result.flatMap((node) =>
    ['content', 'connection'].map((key) => node[key]?.wordRange).filter(Boolean)
  )

  // 키워드 중괄호 범위
  const keywordBraceRanges = result.flatMap((node) =>
    ['content', 'connection'].flatMap((key) => {
      const braceRange = node[key]?.braceRange
      return braceRange ? [braceRange.open, braceRange.close] : []
    })
  )

  // 콘텐츠 범위
  const contentRanges = result
    .map((node) => {
      if (node.content?.braceRange) {
        const { open, close } = node.content?.braceRange
        return { begin: open.end, end: close.begin }
      }
      return null
    })
    .filter(Boolean)

  // 연결 범위
  const connectionRanges = result.flatMap(
    (node) =>
      node.connection?.data.map((connection) => connection.wordRange) || []
  )

  // 연결 옵션 범위
  const connectionOptionRanges = result.flatMap(
    (node) =>
      node.connection?.data.flatMap((connection) =>
        ['arrow', 'style', 'color']
          .map((prop) => connection[prop]?.wordRange)
          .filter(Boolean)
      ) || []
  )

  const decorations = [
    ...createDecorations(nodeRanges, 'nodeDecoration'),
    ...createDecorations(nodeBraceRanges, 'nodeBracesDecoration'),
    ...createDecorations(keywordRanges, 'keywordDecoration'),
    ...createDecorations(keywordBraceRanges, 'keywordBracesDecoration'),
    ...createDecorations(contentRanges, 'contentDecoration'),
    ...createDecorations(connectionRanges, 'connectionDecoration'),
    ...createDecorations(connectionOptionRanges, 'connectionOptionDecoration'),
  ]

  // 스타일 요소 생성 및 추가
  const styleElement = document.createElement('style')
  styleElement.textContent = Object.entries(styles)
    .map(([key, value]) => `.${key}Decoration { color: ${value} !important; }`)
    .join('\n')
  document.head.appendChild(styleElement)

  return decorations
}
