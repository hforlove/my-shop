
export function setStorage (key, value) {
  localStorage.setItem(key, value)
}

export function getStorage (key, value) {
  return localStorage.getItem(key)
}

export function getToken () {
  return getStorage('token')
}
