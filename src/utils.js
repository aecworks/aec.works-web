export const popQuery = (router, query, key) => {
  const queryCopy = Object.assign({}, query)
  delete queryCopy[key]
  router.replace({ query: queryCopy })
}

export const popQueries = (router, query, keys) => {
  const queryCopy = Object.assign({}, query)
  keys.forEach((key) => delete queryCopy[key])
  router.replace({ query: queryCopy })
}

export const debounce = (func, wait = 100) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const filePrompt = () => {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (e) => {
      const file = e.target.files[0]
      resolve(file)
    }
    input.click()
  })
}

export const subscribePaste = (callback) => {
  document.onpaste = function (event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items
    for (let index in items) {
      const item = items[index]
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (file.type === 'image/png' || file.type === 'image/jpge') {
          callback(file)
        }
      }
    }
  }
}

export const unsubscribePaste = () => {
  document.onpaste = null
}

export const toggleHashtag = (router, name) => {
  const queryParams = new URLSearchParams(window.location.search)
  const query = {}

  for (const [key, value] of queryParams) {
    query[key] = value
  }

  let hashtags = []

  if (!query.hashtags) {
    query.hashtags = name
    hashtags = [name]
  } else {
    hashtags = query.hashtags.split(',')

    if (hashtags.includes(name)) {
      hashtags = hashtags.filter((h) => h !== name)
    } else {
      hashtags.push(name)
    }

    if (hashtags && hashtags.length) {
      query.hashtags = hashtags.join(',')
    } else {
      delete query.hashtags
    }
  }

  router.replace({ query })

  return hashtags
}

export const filterNullKeys = (obj) => {
  return Object.entries(obj).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})
}

export const fileIsTooBig = (file) => {
  return file.size / (1024 * 1024) > 3
}
