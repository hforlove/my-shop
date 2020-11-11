
export function setStorage (key, value) {
  localStorage.setItem(key, value)
}

export function getStorage (key, value) {
  return localStorage.getItem(key)
}

export function removeStorage (key) {
  localStorage.removeItem(key)
}

export function getToken () {
  return getStorage('token')
}
export function setToken (token) {
  setStorage('token', token)
}
export function removeToken () {
  removeStorage('token')
}

export function getImg (src) {
  if (!src) return
  if (src.indexOf('localhost') >= 0) {
    return src.replace('http://localhost:28089', process.env.VUE_APP_API)
  }
  return src.indexOf('http') >= 0 ? src : process.env.VUE_APP_API + src
}
