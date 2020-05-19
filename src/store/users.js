import api from "@/api"

export default {
  state: () => ({
    profile: null,
  }),
  mutations: {
    setProfile (state, profile) {
      state.profile = profile
    }
  },
  actions: {
    async getProfile ({ commit }) {
      const profile = await api.getProfile()
      commit('setProfile', profile)
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.profile !== null
    }
  }
}
