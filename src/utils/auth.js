import Cookies from 'js-cookie'

/*
用户Token
*/
const TokenKey = 'Lego-Token'
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

/*
页面Languge
*/
const LangugeKey = 'Lego-Languge'
export function getLanguge () {
  return Cookies.get(LangugeKey)
}

export function setLanguge (lang) {
  return Cookies.set(LangugeKey, lang)
}

export function removeLanguge () {
  return Cookies.remove(LangugeKey)
}

/*
页面主题
*/
const ThemeKey = 'Lego-Theme'
export function getTheme () {
  return Cookies.get(ThemeKey)
}

export function setTheme (theme) {
  return Cookies.set(ThemeKey, theme)
}

export function removeTheme () {
  return Cookies.remove(ThemeKey)
}

