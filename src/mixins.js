import api from "@/api"
import router from './router'

export const waitForLogin = () => {
  return new Promise((resolve, reject) => {
    if (api.isAuthenticated()) {
      resolve()
    } else {
      router.push({ query: { login: 1 } })
      const timer = setInterval(() => {
        if (api.isAuthenticated()) {
          return resolve()
        }
        if (!router.currentRoute.query.login) {
          clearInterval(timer)
          reject()
        }
      }, 500)
    }

  })
}
