import { API_URL } from "./config"

const getToken = () => localStorage.getItem("token")
const setToken = (token) => localStorage.setItem("token", token)
const clearToken = () => localStorage.removeItem("token")

const login = async (username, password) => {
  const url = API_URL + 'auth/token/login/'
  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  })
  const request = new Request(url, {
    method: 'POST',
    headers,
    body: `username=${username}&password=${password}`
  })

  const response = await fetch(request)

  switch (response.status) {
    case 200:
      break
    case 400:
      clearToken()
      return "Invalid Credentials"
    default:
      clearToken()
      return "Unknown Error"
  }
  const responseData = await response.json()
  setToken(responseData.authToken)

}

export { login, getToken, clearToken }
