export const buildUrl = (origin, urlPath, query) => {
  const url = `${origin}/${urlPath}`
  if (!query) return url

  const queryParams = new URLSearchParams(query || {}).toString()
  return `${url}?${queryParams}`
}
