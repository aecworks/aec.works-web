import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import router from '@/router'

// https://github.com/MatteoGabriele/vue-analytics
Vue.use(VueAnalytics, {
  id: 'UA-3836052-15',
  router,
  ignoreRoutes: [
  ],
  autoTracking: {
    pageviewOnLoad: true,
    screenview: false,
  },
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})
