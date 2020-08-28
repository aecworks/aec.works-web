export const githubAuthUrl = (state) => {
  const CLIENT_ID = process.env.VUE_APP_GITHUB_CLIENT_ID
  console.assert(CLIENT_ID, "github client id not configured")

  const SCOPE = "user:email"

  const options = {
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: 'http://localhost:8080/auth/github',
    state: state
  }

  const queryParams = new URLSearchParams(options).toString()
  return `https://github.com/login/oauth/authorize?${queryParams}`

}

export const linkedinAuthUrl = (state) => {
  const CLIENT_ID = process.env.VUE_APP_LINKEDIN_CLIENT_ID
  console.assert(CLIENT_ID, "github client id not configured")

  const SCOPE = "r_emailaddress r_liteprofile"

  const options = {
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: 'http://localhost:8080/auth/linkedin',
    state: state
  }

  const queryParams = new URLSearchParams(options).toString()
  return `https://www.linkedin.com/oauth/v2/authorization?${queryParams}`
}

