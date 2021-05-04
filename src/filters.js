import Vue from 'vue'
import moment from 'moment'

Vue.filter('fromNow', (timestamp) => {
  return moment(timestamp).fromNow()
})

Vue.filter('calendar', (timestamp) => {
  return moment(timestamp).calendar()
})

Vue.filter('capitalize', (str) => {
  return str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase()
})
