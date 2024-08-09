const createOrderedSet = (initialArr = []) => {
  const items = {}
  const order = []

  // 초기 아이템 추가
  initialArr.forEach((item) => {
    if (!(item in items)) {
      items[item] = order.length
      order.push(item)
    }
  })

  return {
    add(item) {
      if (item in items) {
        // 이미 존재하는 경우, 현재 위치에서 제거
        const index = items[item]
        order.splice(index, 1)
        // 순서 업데이트
        for (let i = index; i < order.length; i++) {
          items[order[i]] = i
        }
      }
      // 맨 뒤에 추가
      items[item] = order.length
      order.push(item)
    },

    delete(item) {
      if (item in items) {
        const index = items[item]
        delete items[item]
        order.splice(index, 1)
        // 순서 업데이트
        for (let i = index; i < order.length; i++) {
          items[order[i]] = i
        }
        return true
      }
      return false
    },

    has(item) {
      return item in items
    },

    clear() {
      Object.keys(items).forEach((key) => delete items[key])
      order.length = 0
    },

    size() {
      return order.length
    },

    values() {
      return [...order]
    },

    moveTo(fromIndex, toIndex) {
      if (
        fromIndex < 0 ||
        fromIndex >= order.length ||
        toIndex < 0 ||
        toIndex >= order.length ||
        fromIndex === toIndex
      ) {
        return false
      }

      // 두 항목 스왑
      const temp = order[fromIndex]
      order[fromIndex] = order[toIndex]
      order[toIndex] = temp

      // items 객체 업데이트
      items[order[fromIndex]] = fromIndex
      items[order[toIndex]] = toIndex

      return true
    },

    indexOf(item) {
      return items[item]
    },

    getAt(index) {
      return order[index]
    },
  }
}
