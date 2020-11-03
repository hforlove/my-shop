
export function setStorage (key, value) {
  localStorage.setItem(key, value)
}

export function getStorage (key, value) {
  return localStorage.getItem(key)
}
