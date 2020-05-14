import { API_URL } from "./config"
import { getToken, clearToken } from "./auth"

const request = async (urlPath, options = {}) => {
  const query = options.queryParams || {}
  const queryParams = new URLSearchParams(query).toString()
  const url = API_URL + urlPath + (queryParams ? `?${queryParams}` : "")

  const defaultHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Token ${getToken()}`
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
  if (response.status == 401) {
    clearToken()
    throw Error("Invalid Token")
  }
  return await response.json()
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
}
