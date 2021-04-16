import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import { USERS } from '@/store/users'
import '@/filters'
import '@/libs/sentry'
import '@/libs/analytics'
import '@/libs/quill'

import VueWaypoint from 'vue-waypoint'
import VueMeta from 'vue-meta'

Vue.use(VueWaypoint)
Vue.use(VueMeta)
new Vue({
  router,
  store,
  created() {
    this.$store.dispatch(USERS.GET_PROFILE)
  },
  render: (h) => h(App),
}).$mount('#app')
