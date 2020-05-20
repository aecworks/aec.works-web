class JWT {

  STORAGE_KEY = "token"

  clear () {
    return localStorage.removeItem(this.STORAGE_KEY)
  }

  get () {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY))
  }

  set (token) {
    if (!token) throw Error("cannot store empty token")
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(token))
  }

  isSet () {
    return localStorage.getItem(this.STORAGE_KEY) !== null
  }


}

export default new JWT()
