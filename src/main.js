import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { USERS } from '@/store/users'
import api from './api'

import '@/filters'
import '@/sentry'
import '@/analytics'
import '@/quill'


import VueWaypoint from 'vue-waypoint'

Vue.use(VueWaypoint)
api.getMyProfile().then(resp => {
  if (!resp.errors) {
    api.setAuthentication(true)
    store.commit(USERS.SET_PROFILE, resp)
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

