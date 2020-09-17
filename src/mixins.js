// TODO Move/Merge Utils

import api from "@/api"
import router from './router'

// TODO take argument for ?next= so we can recover after login
export const waitForLogin = () => {
  return new Promise((resolve) => {
    if (api.isAuthenticated()) {
      resolve()
    } else {
      router.replace({ query: { login: 1 } })
      const timer = setInterval(() => {
        if (api.isAuthenticated()) {
          return resolve()
        }
        if (!router.currentRoute.query.login) {
          clearInterval(timer)
        }
      }, 500)
    }

  })
}
