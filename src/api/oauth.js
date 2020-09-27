const GITHUB_CLIENT_ID = process.env.VUE_APP_GITHUB_CLIENT_ID
const LINKEDIN_CLIENT_ID = process.env.VUE_APP_LINKEDIN_CLIENT_ID

console.assert(LINKEDIN_CLIENT_ID, 'linkedin client id not configured')
console.assert(GITHUB_CLIENT_ID, 'github client id not configured')

export const callbackUrl = (provider) => {
  return `${window.location.origin}/auth/${provider}`
}

const providerOptions = {
  github: {
    url: 'https://github.com/login/oauth/authorize',
    authParams: {
      client_id: GITHUB_CLIENT_ID,
      scope: 'user:email',
    },
  },
  linkedin: {
    url: 'https://www.linkedin.com/oauth/v2/authorization',
    authParams: {
      client_id: LINKEDIN_CLIENT_ID,
      scope: 'r_emailaddress r_liteprofile',
      response_type: 'code',
    },
  },
}

export const oauthLoginUrl = (provider, state) => {
  const { url, authParams } = providerOptions[provider]
  const queryParams = new URLSearchParams({
    ...authParams,
    state,
    redirect_uri: callbackUrl(provider),
  }).toString()
  return `${url}?${queryParams}`
}
