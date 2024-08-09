import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { MSG } from 'shared/const/msg'
import { sanitizeConfig } from '../config/sanitizeConfig'

// 에디터 내용을 파싱하는 메인 함수
export const parseText = (text) => {
  const braces = []
  const errors = []
  const result = []

  let prev = undefined
  let cur = undefined
  let next = undefined

  let curNode = undefined // 현재 작업중인 node
  let curKeyword = undefined // 현재 작업중인 node의 keyword

  const lines = text.split('\n')

  const contentHandler = () => {
    const lineDiff = cur.wordRange.begin.y - prev.wordRange.begin.y

    // 초기 값일때,
    if (curNode['content'].data === '') {
      curNode['content'].data += cur.word
    }
    // 줄바꿈이 되었을때,
    else if (lineDiff > 0) {
      curNode['content'].data += '\n'.repeat(lineDiff) + cur.word
    } else {
      // 공백 여부
      const spaceDiff = cur.wordRange.begin.x - prev.wordRange.end.x
      curNode['content'].data += ' '.repeat(spaceDiff) + cur.word
    }
  }

  const connectionHandler = () => {
    const lastIndex = curNode['connection'].data.length - 1

    // 처음 ,가 나올때
    if (cur.word === ',' && (prev.word === '{' || prev.word === ',')) {
      errors.push({
        message: MSG.ALERT.COMMA_AFTER_LABEL,
        wordRange: cur.wordRange,
      })
      return
    }

    // 처음 나오는 노드 라벨일때,
    if (cur.word !== ',' && (prev.word === '{' || prev.word === ',')) {
      // 자기 자신 노드 참조하면 에러
      if (curNode.label === cur.word) {
        errors.push({
          message: MSG.ALERT.SELF_REFERENCE,
          wordRange: cur.wordRange,
        })
      }

      // 중복된 노드 라벨 참조하면 에러
      const duplication = curNode['connection'].data.find(
        (connection) => connection.target === cur.word
      )
      if (duplication) {
        errors.push(
          {
            message: MSG.ALERT.DUPLICATE_REFERENCE,
            wordRange: cur.wordRange,
          },
          {
            message: MSG.ALERT.DUPLICATE_REFERENCE,
            wordRange: duplication.wordRange,
          }
        )
      }

      curNode['connection'].data.push({
        target: cur.word,
        wordRange: cur.wordRange,
      })
    }
    // 노드 커넥션 라벨 선언 이후의 옵션들
    else if (cur.word !== ',') {
      const lastConnection = curNode['connection'].data[lastIndex]

      // 스타일 옵션
      if (cur.word === 'solid' || cur.word === 'dashed') {
        if (lastConnection.style) {
          // 중복된 옵션 추가시 에러
          errors.push(
            {
              message: MSG.ALERT.DUPLICATE_STYLE,
              wordRange: cur.wordRange,
            },
            {
              message: MSG.ALERT.DUPLICATE_STYLE,
              wordRange: lastConnection.style.wordRange,
            }
          )
          return
        }
        lastConnection.style = { data: cur.word, wordRange: cur.wordRange }
      }
      // 색상 옵션 처리
      else if (/^#([0-9A-F]{3}){1,2}$/i.test(cur.word)) {
        if (lastConnection.color) {
          errors.push(
            {
              message: MSG.ALERT.DUPLICATE_COLOR,
              wordRange: cur.wordRange,
            },
            {
              message: MSG.ALERT.DUPLICATE_COLOR,
              wordRange: lastConnection.color.wordRange,
            }
          )
          return
        }
        lastConnection.color = { data: cur.word, wordRange: cur.wordRange }
      }
      // 화살표 옵션
      else if (cur.word === 'arrow') {
        if (lastConnection.arrow) {
          errors.push(
            {
              message: MSG.ALERT.DUPLICATE_ARROW,
              wordRange: cur.wordRange,
            },
            {
              message: MSG.ALERT.DUPLICATE_ARROW,
              wordRange: lastConnection.arrow.wordRange,
            }
          )
          return
        }
        lastConnection.arrow = { data: true, wordRange: cur.wordRange }
      } else {
        // 해당되는 옵션이 아닐경우 에러
        errors.push({
          message: MSG.ALERT.INVALID_CONN_OPTION,
          wordRange: cur.wordRange,
        })
        return
      }
    }
  }

  const wordHandler = () => {
    const depth = braces.length

    // 다음 블록 명시하지 않으면 에러 (실제 keyword 및 label 유효성 검사는 openHandler에서 진행)
    if (depth < 2 && (!next || next.word !== '{')) {
      errors.push({
        message: MSG.ALERT.MISSING_OPEN_BRACE,
        wordRange: cur.wordRange,
      })
      return
    }

    // curNode가 선언되지 않았다면 (depth === 1의 과정을 지나지 않았다면), curKeyword가 선언되지 않았다면 (depth === 2의 과정을 정상적으로 지나지 않았다면) 종료
    if (!curNode || !curKeyword) {
      return
    }

    if (curKeyword === 'content') {
      contentHandler()
    } else if (curKeyword === 'connection') {
      connectionHandler()
    }
  }

  const openBraceHandler = () => {
    braces.push(cur)
    const depth = braces.length

    if (depth === 1) {
      // 노드 이름을 선언하지 않으면 에러
      if (prev === undefined || prev.word === '{' || prev.word === '}') {
        errors.push({
          message: MSG.ALERT.MISSING_NODE_NAME,
          wordRange: cur.wordRange,
        })
        return
      }

      // 중복된 노드 이름 있으면 에러
      const duplication = result.find((obj) => obj.label === prev.word)
      if (duplication) {
        errors.push(
          {
            message: MSG.ALERT.DUPLICATE_NODE_NAME,
            wordRange: prev.wordRange,
          },
          {
            message: MSG.ALERT.DUPLICATE_NODE_NAME,
            wordRange: duplication.wordRange,
          }
        )
        return
      }

      curNode = {
        label: prev.word,
        braceRange: { open: cur.wordRange, close: undefined },
        wordRange: prev.wordRange,
      }

      return
    } else if (depth === 2) {
      // curNode가 선언되지 않았다면 (depth === 1의 과정을 지나지 않았다면) 종료
      if (!curNode) {
        return
      }

      // 키워드 이름을 선언하지 않으면 에러
      if (prev === undefined || prev.word === '{' || prev.word === '}') {
        errors.push({
          message: MSG.ALERT.MISSING_KEYWORD,
          wordRange: cur.wordRange,
        })
        return
      }

      // 이미 선언한 키워드 다시 선언하면 에러
      const duplication = curNode[prev.word]
      if (duplication) {
        delete curNode[prev.word]
        errors.push(
          {
            message: MSG.ALERT.DUPLICATE_KEYWORD,
            wordRange: prev.wordRange,
          },
          {
            message: MSG.ALERT.DUPLICATE_KEYWORD,
            wordRange: duplication.wordRange,
          }
        )
        return
      }

      if (prev.word === 'content') {
        curKeyword = 'content'
        curNode['content'] = {
          data: '',
          braceRange: { open: cur.wordRange, close: undefined },
          wordRange: prev.wordRange,
        }
      } else if (prev.word === 'connection') {
        curKeyword = 'connection'
        curNode['connection'] = {
          data: [],
          braceRange: { open: cur.wordRange, close: undefined },
          wordRange: prev.wordRange,
        }
      }
      // 해당되는 keyword가 아니면 에러
      else {
        errors.push({
          message: MSG.ALERT.INVALID_KEYWORD,
          wordRange: prev.wordRange,
        })
        return
      }
    } else if (depth >= 3) {
      // curNode가 선언되지 않았다면 (depth === 1의 과정을 지나지 않았다면) 종료
      if (!curNode) {
        return
      }

      // content 키워드 외의 위치에서 사용되면 에러
      if (curKeyword !== 'content') {
        errors.push({
          message: MSG.ALERT.INVALID_BRACE_LOCATION,
          wordRange: prev.wordRange,
        })
        return
      }

      wordHandler()
    }
  }

  const closeBraceHandler = () => {
    // 여는 중괄호 없이 닫는 중괄호가 먼저 나왔다면 에러
    if (braces.length === 0) {
      errors.push({
        message: MSG.ALERT.UNMATCHED_CLOSE_BRACE,
        wordRange: cur.wordRange,
      })
      return
    }

    braces.pop()
    const depth = braces.length + 1 // 1을 더하는 이유는 openBraceHandler와 의미적으로 해석할때 수월하기 위함

    if (depth === 1) {
      // curNode가 선언되지 않았다면 (depth === 1의 과정을 지나지 않았다면) 종료
      if (!curNode) {
        return
      }

      curNode.braceRange.close = cur.wordRange

      if (curNode.content) {
        curNode.content.data = sanitizeHtml(
          marked.parse(curNode.content.data),
          sanitizeConfig
        )
      }

      result.push(curNode)
      curNode = undefined

      return
    } else if (depth === 2) {
      // curNode가 선언되지 않았다면 (depth === 1의 과정을 지나지 않았다면), curKeyword가 선언되지 않았다면 (depth === 2의 과정을 정상적으로 지나지 않았다면) 종료
      if (!curNode || !curKeyword) {
        return
      }

      curNode[curKeyword].braceRange.close = cur.wordRange
      curKeyword = undefined
    } else if (depth >= 3) {
      // curNode가 선언되지 않았다면 (depth === 1의 과정을 지나지 않았다면) 종료
      if (!curNode) {
        return
      }

      // content 키워드 외의 위치에서 사용되면 에러
      if (curKeyword !== 'content') {
        errors.push({
          message: MSG.ALERT.INVALID_BRACE_LOCATION,
          wordRange: prev.wordRange,
        })
        return
      }

      wordHandler()
    }
  }

  // 메인 파서 로직
  const main = () => {
    if (cur.word === '{') {
      openBraceHandler()
    } else if (cur.word === '}') {
      closeBraceHandler()
    } else {
      wordHandler()
    }
  }

  for (let y = 1; y <= lines.length; y++) {
    const line = lines[y - 1]
    const words = line.split(/([{}\s,])/).filter(Boolean)

    let x = 1

    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if (word === ' ') {
        x = x + word.length
        continue
      }
      const wordRange = { begin: { x, y }, end: { x: x + word.length, y } }

      cur = { word, wordRange }

      // next 단어 찾기
      let nextIndex = i + 1
      while (nextIndex < words.length && words[nextIndex] === ' ') {
        nextIndex++
      }
      next =
        nextIndex < words.length
          ? {
              word: words[nextIndex],
              wordRange: {
                begin: {
                  x:
                    x +
                    word.length +
                    words.slice(i + 1, nextIndex).join('').length,
                  y,
                },
                end: {
                  x:
                    x +
                    word.length +
                    words.slice(i + 1, nextIndex + 1).join('').length,
                  y,
                },
              },
            }
          : undefined

      main()

      prev = cur
      x = x + word.length
    }
  }

  // 유효한 참조들인 검사
  const validateReferences = () => {
    const labels = new Set(result.map((node) => node.label))

    result.forEach((node) => {
      if (node.connection) {
        node.connection.data = node.connection.data.filter((connection) => {
          if (!labels.has(connection.target)) {
            // 유효하지 않은 참조 발견 시 에러 추가
            errors.push({
              message: MSG.ALERT.INVALID_REFERENCE,
              wordRange: connection.wordRange,
            })
            return false
          }
          return true
        })
      }
    })
  }
  validateReferences()

  // 전역 store에 저장될 정보들을 따로 조작해서 반환
  const manipulate = () => {
    const nodes = {}
    const connections = {}

    result.forEach((node) => {
      nodes[node.label] = {
        label: node.label,
        content: node.content?.data,
      }

      node.connection?.data?.forEach((connection) => {
        connections[`${node.label}-${connection.target}`] = {
          target: connection.target,
          source: node.label,
          color: connection.color?.data,
          style: connection.style?.data,
          arrow: connection.arrow?.data,
        }
      })
    })

    return { nodes, connections }
  }

  const isSuccess = errors.length > 0 ? false : true
  const { nodes, connections } = isSuccess
    ? manipulate()
    : { nodes: undefined, connections: undefined }
  return { isSuccess, result, errors, nodes, connections }
}
