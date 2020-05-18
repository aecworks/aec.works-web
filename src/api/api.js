import { API_URL } from "./config"
import { getToken, refreshJwtToken, clearToken, redirectToAuth, hasToken } from "./auth"


const request = async (urlPath, options = {}) => {
  const query = options.queryParams || {}
  const queryParams = new URLSearchParams(query).toString()
  const queryValue = queryParams ? `?${queryParams}` : ""
  const url = `${API_URL}/${urlPath}` + queryValue

  const jwt = getToken()
  if (!jwt) return redirectToAuth()

  // Headers
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Authorization": `JWT ${jwt.access}`
  }

  const optionHeaders = options.headers || {}
  const headers = new Headers({
    ...defaultHeaders,
    ...optionHeaders
  })
  const request = new Request(url, {
    method: 'GET',
    headers,
    ...options
  })


  const response = await fetch(request)
  if (response.status == 401 || response.status == 403) {
    const didRefresh = await refreshJwtToken()
    if (didRefresh) {
      return request(urlPath, options)
    } else {
      clearToken()
      redirectToAuth()
    }
  }
  return response.json()
}

export default {
  getPosts: async (queryParams) => request(`community/posts/`, { queryParams }),
  getPost: async (id) => request(`community/posts/${id}/`),
  getCompany: async (id) => request(`community/companies/${id}/`),
  getCompanies: async (queryParams) => request(`community/companies/`, { queryParams }),
  getProfiles: async (queryParams) => request(`users/profiles/`, { queryParams }),
  getProfile: async (id) => request(`users/profiles/${id}/`),
  getCommentsByThreadId: async (threadId, queryParams) => {
    return request(`community/comments/`, { queryParams: { ...queryParams, thread_id: threadId } })
  },
  getCommentsByParentId: async (commentId, queryParams) => {
    return request(`community/comments/`, { queryParams: { ...queryParams, parent_id: commentId } })
  },
  postPostClap: async (id) => request(`community/posts/${id}/clap/`, { method: 'POST' }),
  isLoggedIn: () => hasToken
}
