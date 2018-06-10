import Rcookie from 'react-cookies'

export const setCookie = (value, key) => {
  const { domain } = process.env
  const expires = new Date()
  expires.setDate(new Date().getDate() + 14)
  document.cookie = `${process.env.app}_${key}_${process.env.type}=${value};, path=/, expires=${expires}, secure=${true}; domain=${domain}`
}

export const removeCookies = () => {
  const cookies = document.cookie.split(';')
  const { domain } = process.env
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    const path = ['/', process.env.mainRoute]
    path.forEach((element) => {
      document.cookie = `${name} =;expires=Thu, 01 Jan 1970 00:00:00 GMT ; domain=${domain}; path=${element}`
    })
  }
}

export const getCookie = key => Rcookie.load(`${process.env.app}_${key}_${process.env.type}`)

export function apiCall (url, method, authReq = true, body = {}) {
  let obj = {}
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    obj = {
      method,
      url,
      body
    }
  } else {
    obj = {
      method,
      url
    }
  }
  if (authReq) {
    return ({
      ...obj,
      headers: {
        Authorization: Rcookie.load(`${process.env.app}_accessToken_${process.env.type}`) ? Rcookie.load(`${process.env.app}_accessToken_${process.env.type}`) : '',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
  return ({
    ...obj,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
