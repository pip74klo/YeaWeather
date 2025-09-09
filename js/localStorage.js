export function setLocalStorage(value) {
  localStorage.setItem('history', JSON.stringify(value))
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem('history')) || []
}

export function setLocalStorageTheme(value) {
  localStorage.setItem('theme', value)
}

export function getLocalStorageTheme() {
  return localStorage.getItem('theme') || 'light'
}

