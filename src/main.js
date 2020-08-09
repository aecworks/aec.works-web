import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueWaypoint from 'vue-waypoint'
import store from './store'

Vue.use(VueWaypoint)
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

if (localStorage.getItem("run")) {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

