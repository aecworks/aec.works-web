import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueWaypoint from 'vue-waypoint'
import store from './store'

Vue.use(VueWaypoint)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
