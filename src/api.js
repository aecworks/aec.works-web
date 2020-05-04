export const API_HOST = `localhost:8000`
export const API_URL = `http://${API_HOST}/`


const request = async (path, params, options) => {
  const searchParams = new URLSearchParams(params).toString()
  const url = API_URL + path + (searchParams ? `?${searchParams}` : "")
  const request = new Request(url, {
    method: 'GET',
    ...options
    })
  const response = await fetch(request)
  return await response.json()
}

export default {
  postPostClap: async (id) => request(`community/posts/${id}/clap/`, null, { method: 'POST'}),
  getPosts: async (params = {}) => request(`community/posts/`, params),
  getPost: async (id) => request(`community/posts/${id}/`),
  getCompany: async (id) => request(`community/companies/${id}/`),
  getCompanies: async (params) => request(`community/companies/`, params),
  getProfiles: async (params) => request(`users/profiles/`, params),
  getProfile: async (id) => request(`users/profiles/${id}/`),
  getCommentsByThreadId: async (threadId, params) => {
    return request(`community/comments/`, { ...params, thread_id: threadId })
  },
  getCommentsByParentId: async (commentId, params) => {
    return request(`community/comments/`, { ...params, parent_id: commentId })
  },
}
