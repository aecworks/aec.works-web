import { API_URL, GITHUB_CLIENT_ID, GITHUB_SCOPE } from "./config"

export const redirectToAuth = () => {
  window.history.pushState("", "", "?login=1");
  // location.reload()
}

export const hasToken = () => {
  return localStorage.getItem("token") !== null
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"))
}

const setToken = (token) => {
  if (!token) throw Error("cannot store empty token")
  localStorage.setItem("token", JSON.stringify(token))
}

export const clearToken = () => localStorage.removeItem("token")

const postRequest = async (url, bodyObj) => {
  const headers = new Headers({
    "Content-Type": "application/json"
  })
  const request = new Request(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  })
  return fetch(request)

}

const getJwtToken = async (email, password) => {
  const url = `${API_URL}/auth/jwt/create/`
  const bodyObj = { email, password }

  const response = await postRequest(url, bodyObj)
  const responseData = await response.json()

  switch (response.status) {
    case 200:
      return responseData
    case 401:
    case 403:
      clearToken()
  }
  return null
}

export const refreshJwtToken = async () => {
  const jwt = getToken()
  const url = `${API_URL}/auth/jwt/refresh/`
  const bodyObj = { refresh: jwt.refresh }

  const response = await postRequest(url, bodyObj)
  const responseData = await response.json()

  switch (response.status) {
    case 200:
      setToken({ jwt, ...responseData })
      return true
    case 401:
    case 403:
      clearToken()
      break
  }
  return false
}


export const githubAuthUrl = () => {
  const options = {
    scope: GITHUB_SCOPE,
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: window.location.href,
  }
  const queryParams = new URLSearchParams(options).toString()

  return `https://github.com/login/oauth/authorize?${queryParams}`
}

export const loginWithCredentials = async (email, password) => {
  const jwt = await getJwtToken(email, password)
  if (jwt) {
    setToken(jwt)
    return true
  }

}

export const loginWithGithubCallback = async (code) => {
  const url = `${API_URL}/users/github/login/?code=${code}`
  const request = new Request(url, {
    method: 'POST',
  })
  const response = await fetch(request)
  if (response.status !== 200) {
    throw Error(response.statusText)
  }
  const jwt = await response.json()
  setToken(jwt)
  return true
}
