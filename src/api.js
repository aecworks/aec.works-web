export const API_HOST = `localhost:8000`
export const API_URL = `http://${API_HOST}/`


const request = async (urlPath, query, options) => {
  const queryParams = new URLSearchParams(query).toString()
  
  const url = API_URL + urlPath + (queryParams ? `?${queryParams}` : "")
  
  const request = new Request(url, {
    method: 'GET',
    ...options
    })
  
  const response = await fetch(request)
  return await response.json()
}

export default {
  postPostClap: async (id) => request(`community/posts/${id}/clap/`, null, { method: 'POST'}),
  getPosts: async (query = {}) => request(`community/posts/`, query),
  getPost: async (id) => request(`community/posts/${id}/`),
  getCompany: async (id) => request(`community/companies/${id}/`),
  getCompanies: async (query) => request(`community/companies/`, query),
  getProfiles: async (query) => request(`users/profiles/`, query),
  getProfile: async (id) => request(`users/profiles/${id}/`),
  getCommentsByThreadId: async (threadId, query) => {
    return request(`community/comments/`, { ...query, thread_id: threadId })
  },
  getCommentsByParentId: async (commentId, query) => {
    return request(`community/comments/`, { ...query, parent_id: commentId })
  },
}
