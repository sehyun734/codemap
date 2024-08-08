export const CONST = {
  MIN_EDITOR_WIDTH: 200,
  get MAX_EDITOR_WIDTH() {
    return window.innerWidth / 2
  },
  ALLOWD_FILE_TYPE: { "image/*": [".jpg", ".png", ".jpeg"] },
  ERROR_MSG: {
    COMMA_AFTER_LABEL: "쉼표 다음에 노드 라벨이 와야 합니다.",
    SELF_REFERENCE: "노드는 자기 자신을 참조할 수 없습니다.",
    DUPLICATE_REFERENCE: "중복된 노드 라벨 참조입니다.",
    DUPLICATE_STYLE: "중복된 스타일 옵션입니다.",
    DUPLICATE_COLOR: "중복된 색상 옵션입니다.",
    DUPLICATE_ARROW: "중복된 화살표 옵션입니다.",
    INVALID_CONN_OPTION: "유효하지 않은 연결 옵션입니다.",
    MISSING_OPEN_BRACE: "블록을 여는 중괄호가 필요합니다.",
    MISSING_NODE_NAME: "노드 이름이 필요합니다.",
    DUPLICATE_NODE_NAME: "중복된 노드 이름입니다.",
    MISSING_KEYWORD: "키워드가 필요합니다.",
    DUPLICATE_KEYWORD: "이미 선언된 키워드입니다.",
    INVALID_KEYWORD: "유효하지 않은 키워드입니다.",
    INVALID_BRACE_LOCATION: "content 키워드 외의 위치에서 중괄호를 사용할 수 없습니다.",
    UNMATCHED_CLOSE_BRACE: "여는 중괄호 없이 닫는 중괄호가 사용되었습니다.",
    INVALID_REFERENCE: "존재하지 않는 노드를 참조하고 있습니다.",
  },
}
