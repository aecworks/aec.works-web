import { buildUrl } from "./utils"
import Cookies from 'js-cookie'


const API_URL = "/api"

class Api {
  API_URL = API_URL
  DEFAULT_HEADERS = {
    "Content-Type": "application/json"
  }

  constructor() {
    this._isAuthenticated = false
  }

  setAuthentication (bool) {
    this._isAuthenticated = bool
  }

  isAuthenticated () {
    return this._isAuthenticated
  }

  _buildHeaders (headers = {}) {
    const csrftoken = Cookies.get('csrftoken');
    const mergedHeaders = {
      ...this.DEFAULT_HEADERS,
      ...headers,
      'X-CSRFToken': csrftoken
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
    const response = await fetch(request)
    if (this._is_auth_failure(response)) {
      //
    }
    return response
  }

  async _get (urlPath, options) {
    const response = await this._fetch("GET", urlPath, options)
    return response.json()
  }

  async _post (urlPath, options) {
    const response = await this._fetch("POST", urlPath, options)
    return response.json()
  }

  async _put (urlPath, options) {
    const response = await this._fetch("PUT", urlPath, options)
    return response.json()
  }

  async _patch (urlPath, options) {
    const response = await this._fetch("PATCH", urlPath, options)
    return response.json()
  }

  /**
   * @param  {String} email
   * @param  {String} password
   */
  async loginWithCredentials (email, password) {
    const response = await this._getJwt(email, password)
    if (response.status !== 200) {
      return await response.json()
    }
    // return this._handleTokenResponse(response)
  }

  /**
   * @param  {String} code
   */
  async loginWithOauthCode (provider, code, redirectUri) {
    const response = await this._fetch("POST", `users/login/${provider}/`, { query: { code, redirect_uri: redirectUri } })
    if (!response.status === 200) {
      return await response.json()
    }
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

  postCompany (company) {
    return this._post(`community/companies/`, { body: company })
  }

  postCompanyRevision (slug, company) {
    return this._post(`community/companies/${slug}/revisions/`, { body: company })
  }

  postCompanyRevisionApprove (revisionId) {
    return this._post(`community/revisions/${revisionId}/approve`)
  }

  putImage (file) {
    return this._put(`images/upload/${file.name}`, { body: file, headers: { 'Content-Type': file.type } })
  }

  getHashtags (query) {
    return this._get(`community/hashtags/`, { search: query || "" })
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
  commentClap (id) {
    return this._post(`community/comments/${id}/clap/`)
  }

}


export default new Api()
