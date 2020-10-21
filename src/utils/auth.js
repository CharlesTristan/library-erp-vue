const TokenKey = 'authorization'
const RefreshTokenKey = 'refresh-token'
const menus = 'menus'
export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  window.localStorage.setItem(TokenKey, token)
}

export function getRfreshToken() {
  return window.localStorage.getItem(RefreshTokenKey)
}

export function setRfreshToken(token) {
  window.localStorage.setItem(RefreshTokenKey, token)
}

export function removeToken() {
  window.localStorage.removeItem(TokenKey)
}

export function removeRfreshToken() {
  window.localStorage.removeItem(RefreshTokenKey)
}

export function getMenus() {
  return window.localStorage.getItem(menus)
}

export function setMenus(menu) {
  window.localStorage.setItem(menus, menu)
}

export function removeMenus() {
  window.localStorage.removeItem(menus)
}
