export const popQuery = (router, query, key) => {
  const queryCopy = Object.assign({}, query)
  delete queryCopy[key]
  router.replace({ query: queryCopy })
}
