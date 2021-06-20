// 이메일 유효성 검사
const validEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    return (true)
  }
  return (false)
}
// 압력값의 길이가 8 이상인지 확인하는 감수
const validLength = (value) => {
  if (value && value.length >= 8) {
    return true
  } else {
    return false
  }
}

export { validLength, validEmail }
