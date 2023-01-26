const assert = (condition: boolean, message: string) => {
  if (!condition) throw new Error(message)
}

export const validator = {
  required(value: string, name: string) {
    assert(!value, `${name} 반드시 입력해야 합니다.`)

    return true
  },
  minLength(value: string, minLength: number, name: string) {
    assert(value.length < minLength, `${name} 최소 네 글자 이상 입력하세요.`)

    return true
  },
  emailPattern(value: string, name: string) {
    assert(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value), `${name}은 이메일 형식에 맞게 입력하세요.`)

    return true
  },
  isEqual<T>(value: T, name: string) {
    return (otherValue: T, otherName: string) => {
      assert(value !== otherValue, `${name} ${otherName}과 동일해야 합니다.`)

      return true
    }
  },
}