import jwt from "./jwt"
import { buildUrl } from "./utils"

const API_URL = process.env.VUE_APP_API_URL
if (!API_URL) throw Error("VUE_API_URL not defined")

class Api {
  API_URL = API_URL
  DEFAULT_HEADERS = {
    "Content-Type": "application/json"
  }

  constructor() {
    this.jwt = jwt
  }

  _buildHeaders (headers = {}) {
    const mergedHeaders = {
      ...this.DEFAULT_HEADERS,
      ...headers,
    }
    if (this.jwt.isSet()) {
      mergedHeaders["Authorization"] = `JWT ${this.jwt.get().access}`
    }
    return mergedHeaders
  }

  _is_auth_failure (response) {
    return (response.status == 401 || response.status == 403)
  }

  async _fetch (method, urlPath, options = {}) {
    let { body, headers, query } = options
    const url = buildUrl(this.API_URL, urlPath, query)

    if (body && !body.arrayBuffer) {
      body = JSON.stringify(body)
    }
    const request = new Request(url, {
      method,
      headers: this._buildHeaders(headers),
      body: body
    })
    return fetch(request)
  }

  async _fetch_with_retry (method, urlPath, options) {
    const makeRequest = async () => {
      return await this._fetch(method, urlPath, options)
    }
    let response = await makeRequest()

    if (this._is_auth_failure(response) && this.jwt.isSet()) {
      await this._loginWithRefreshToken(this.jwt.get().refresh)
      response = await makeRequest()
      if (this._is_auth_failure(response)) {
        this.jwt.clear()
      }
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

  async _put (urlPath, options) {
    const response = await this._fetch_with_retry("PUT", urlPath, options)
    return response.json()
  }

  async _patch (urlPath, options) {
    const response = await this._fetch_with_retry("PATCH", urlPath, options)
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

  async _handleTokenResponse (response) {
    if (response.status == 200) {
      const token = await response.json()
      // Refresh only return access so merge
      this.jwt.set({ ...this.jwt.get(), ...token })
    } else {
      const errorReponse = await response.json()
      return errorReponse
    }
  }

  async _loginWithRefreshToken (refresh) {
    const response = await this._getRefreshJwt(refresh)
    return this._handleTokenResponse(response)
  }

  /**
   * @param  {String} email
   * @param  {String} password
   */
  async loginWithCredentials (email, password) {
    const response = await this._getJwt(email, password)
    return this._handleTokenResponse(response)
  }

  /**
   * @param  {String} code
   */
  async loginWithOauthCode (provider, code, redirectUri) {
    this.jwt.clear()
    const response = await this._fetch("POST", `users/login/${provider}/`, { query: { code, redirect_uri: redirectUri } })
    return this._handleTokenResponse(response)
  }

  clearToken () {
    this.jwt.clear()
  }

  isAuthenticated () {
    return this.jwt.isSet()
  }

  getCommentsByThreadId (threadId, query) {
    return this._get(`community/comments/`, { query: { ...query, "thread_id": threadId } })
  }

  getCommentsByParentId (commentId, query) {
    return this._get(`community/comments/`, { query: { ...query, "parent_id": commentId } })
  }

  postComment (text, threadId, parentId) {
    return this._post(`community/comments/`, { body: { text, threadId, parentId } })
  }

  getCompany (slug) {
    return this._get(`community/companies/${slug}/`)
  }

  getCompanies (query) {
    return this._get(`community/companies/`, { query })
  }

  getCompanyRevisions (slug) {
    return this._get(`community/companies/${slug}/revisions/`)
  }

  postCompanyRevision (slug, company) {
    return this._post(`community/companies/${slug}/revisions/`, { body: company })
  }

  postCompanyRevisionApprove (revisionId) {
    return this._post(`community/revisions/${revisionId}/approve`)
  }

  putImage (filename, image) {
    return this._put(`images/upload/${filename}`, { body: image })
  }

  getHashtags (query) {
    return this._get(`community/hashtags/`, { query })
  }

  getPost (slug) {
    return this._get(`community/posts/${slug}/`)
  }

  getPosts (query) {
    return this._get(`community/posts/`, { query })
  }

  postPost (title, body, hashtags) {
    return this._post(`community/posts/`, { body: { title, body, hashtags } })
  }

  patchPost (slug, title, body, hashtags) {
    return this._patch(`community/posts/${slug}/`, { body: { title, body, hashtags } })
  }

  getMyProfile () {
    return this._get(`users/profiles/me/`)
  }

  getProfile (slug) {
    return this._get(`users/profiles/${slug}/`)
  }

  getProfiles (query) {
    return this._get(`users/profiles/`, { query })
  }

  postPostClap (slug) {
    return this._post(`community/posts/${slug}/clap/`)
  }

  postCompanyClap (slug) {
    return this._post(`community/companies/${slug}/clap/`)
  }

}


export default new Api()
