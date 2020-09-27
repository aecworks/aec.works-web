const API_KEY = 'AIzaSyAw213MYRQBGAJTqCeyxKf_oxWPuSLx3Wo'
const CALLBACK_NAME = 'gmapsCallback'
const LIBRARIES = 'places'

let initialized = !!window.google
let resolveInitPromise, rejectInitPromise

// This promise handles the initialization status of the Google Maps script
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve
  rejectInitPromise = reject
})

export function gmapsInit() {
  // if Google Maps is already initialized.
  // the initPromise should get resolved, eventually
  if (initialized) return initPromise

  initialized = true
  // the callback function is called by the Google Maps script
  // if it is successfully loaded
  window[CALLBACK_NAME] = () => resolveInitPromise(window.google)

  // we inject a new script tag into the <head> of our HTML
  // to load the Google Maps script
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=${LIBRARIES}&callback=${CALLBACK_NAME}`
  script.onerror = rejectInitPromise
  document.querySelector('head').appendChild(script)

  return initPromise
}

export function getCountryComponent(addressComponents) {
  if (!addressComponents || addressComponents.length === 0)
    throw new Error('No address components provided!')
  const countryComponent = addressComponents.find((component) =>
    component.types.includes('country'),
  )
  return countryComponent
}
