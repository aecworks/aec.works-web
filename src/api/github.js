

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

export const linkedinAuthUrl = () => {
  const CLIENT_ID = "86y7rl9l2go7sl"
  const SCOPE = "r_emailaddress r_liteprofile"
  // const SCOPE = "r_basicprofile"

  const options = {
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: window.location.href,
  }

  const queryParams = new URLSearchParams(options).toString()
  return `https://www.linkedin.com/oauth/v2/authorization?${queryParams}`

}
