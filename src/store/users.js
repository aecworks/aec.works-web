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
    async getMyProfile ({ commit }) {
      const profile = await api.getMyProfile()
      commit('setProfile', profile)
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.profile !== null
    }
  }
}
