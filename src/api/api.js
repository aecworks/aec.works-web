import jwt from "./jwt"

class Api {
  API_HOST = `127.0.0.1:8000`
  API_URL = `http://${this.API_HOST}`
  DEFAULT_HEADERS = {
    "Content-Type": "application/json"
  }

  constructor() {
    this.jwt = jwt
  }

  _buildHeaders (optionHeaders = {}) {
    const headers = {
      ...this.DEFAULT_HEADERS,
      ...optionHeaders,
    }
    if (this.jwt.isSet()) {
      headers["Authorization"] = `JWT ${this.jwt.get().access}`
    }
    return headers
  }

  _buildUrl (urlPath, query) {
    const url = `${this.API_URL}/${urlPath}`
    if (!query) return url

    const queryParams = new URLSearchParams(query || {}).toString()
    return `${url}?${queryParams}`
  }

  _is_auth_failure (response) {
    return (response.status == 401 || response.status == 403)
  }

  async _fetch (method, urlPath, options = {}) {
    const { body, headers, query } = options
    const url = this._buildUrl(urlPath, query)
    const request = new Request(url, {
      method,
      headers: this._buildHeaders(headers),
      body: JSON.stringify(body)
    })
    return fetch(request)
  }

  async _fetch_with_retry (method, urlPath, options) {
    const makeRequest = async () => {
      return await this._fetch(method, urlPath, options)
    }

    let response = await makeRequest()

    if (this._is_auth_failure(response) && this.jwt.isSet()) {
      this._getRefreshJwt(this.jwt.get().refresh)
      response = await makeRequest()
    }
    return response

  }

  async _get (urlPath, options) {
    const response = await this._fetch_with_retry("GET", urlPath, options)
    return response.json()
  }

  async _post (urlPath, options) {
    const response = await this._fetch_with_retry("POST", urlPath, options)
    return response.json()
  }

  async _getJwt (email, password) {
    this.jwt.clear()
    const response = await this._fetch("POST", "auth/jwt/create/", { body: { email, password } })
    return response
  }

  async _getRefreshJwt (refresh) {
    const response = await this._fetch("POST", "auth/jwt/refresh/", { body: { refresh } })
    return response
  }

  async _getJwtWithGithubCode (code) {
    this.jwt.clear()
    const response = await this._fetch("POST", "users/github/login/", { query: { code } })
    return response
  }

  async _handleTokenResponse (response) {
    if (response.status == 200) {
      const token = await response.json()
      this.jwt.set(token)
    } else {
      const errorReponse = await response.json()
      return errorReponse
    }
  }

  async login (email, password) {
    const response = await this._getJwt(email, password)
    return this._handleTokenResponse(response)
  }

  async githubLogin (code) {
    const response = await this._getJwtWithGithubCode(code)
    return this._handleTokenResponse(response)
  }

  logout () {
    this.jwt.clear()
  }


  getCommentsByThreadId (threadId, query) {
    return this.get(`community/comments/`, { query: { ...query, thread_id: threadId } })
  }

  getCommentsByParentId (commentId, query) {
    return this.get(`community/comments/`, { query: { ...query, parentId: commentId } })
  }

  getCompany (id) {
    return this._get(`community/companies/${id}/`)
  }

  getCompanies (query) {
    return this._get(`community/companies/`, { query })
  }

  getPost (id) {
    return this._get(`community/posts/${id}/`)
  }

  getPosts (query) {
    return this._get(`community/posts/`, { query })
  }

  getProfile () {
    return this._get(`users/profiles/me/`)
  }

  getProfiles (query) {
    return this._get(`users/profiles/`, { query })
  }

  postPostClap (id) {
    return this._post(`community/posts/${id}/clap/`)
  }

}


export default new Api()
