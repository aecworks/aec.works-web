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


// document.onpaste = function(event){
//   var items = (event.clipboardData || event.originalEvent.clipboardData).items;
//   console.log(JSON.stringify(items)); // will give you the mime types
//   for (index in items) {
//     var item = items[index];
//     if (item.kind === 'file') {
//       var blob = item.getAsFile();
//       var reader = new FileReader();
//       reader.onload = function(event){
//         console.log(event.target.result)}; // data url!
//       reader.readAsDataURL(blob);
//     }
//   }
// }
export const filePrompt = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
      const file = e.target.files[0];
      resolve(file)
      // var reader = new FileReader();
      // reader.readAsDataURL(file); // this is reading as data url
      // reader.onload = readerEvent => {
      //     var content = readerEvent.target.result; // this is the content!
      //     document.querySelector('#content').style.backgroundImage = 'url('+ content +')';
      // }
    }
    input.click();
  })
}

