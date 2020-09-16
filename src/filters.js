import Vue from 'vue'
import moment from 'moment'

Vue.filter('fromNow', (timestamp) => {
  return moment(timestamp).fromNow()
})

Vue.filter('calendar', (timestamp) => {
  return moment(timestamp).calendar()
})

Vue.filter('simpledate', (timestamp) => {
  return moment(timestamp).format('lll')
})
