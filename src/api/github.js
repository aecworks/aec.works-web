

export const githubAuthUrl = () => {
  const CLIENT_ID = "6d6767eb4dcc89d70f99"
  const SCOPE = "user:email"

  const options = {
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: window.location.href,
  }

  const queryParams = new URLSearchParams(options).toString()
  return `https://github.com/login/oauth/authorize?${queryParams}`

}
