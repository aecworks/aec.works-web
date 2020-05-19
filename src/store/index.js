import Vue from 'vue'
import Vuex from 'vuex'

import users from "./users"
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users: users,
  }
})

export default store
