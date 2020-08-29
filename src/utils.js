export const popQuery = (router, query, key) => {
  const queryCopy = Object.assign({}, query)
  delete queryCopy[key]
  router.replace({ query: queryCopy })
}

export const popQueries = (router, query, keys) => {
  const queryCopy = Object.assign({}, query)
  keys.forEach(key => delete queryCopy[key])
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


export const filePrompt = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
      const file = e.target.files[0];
      resolve(file)
    }
    input.click();
  })
}



export const subscribePaste = (callback) => {
  document.onpaste = function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items
    for (let index in items) {
      var item = items[index]
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file.type === "image/png" || file.type === "image/jpge") {
          callback(file)
        }
      }
    }
  }
}

export const unsubscribePaste = () => {
  document.onpaste = null
}
