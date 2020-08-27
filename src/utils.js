export const popQuery = (router, query, key) => {
  const queryCopy = Object.assign({}, query)
  delete queryCopy[key]
  router.replace({ query: queryCopy })
}


export const debounce = (func, wait = 100) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait)
  }
}

export const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

