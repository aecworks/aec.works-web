import api from "../api"

export const USERS = {
  SET_PROFILE: "SET_PROFILE",
  GET_PROFILE: "GET_PROFILE",
  LOGOUT: "LOGOUT",
}

export default {
  state: () => ({
    profile: null,
  }),
  mutations: {
    [USERS.SET_PROFILE] (state, profile) {
      state.profile = profile
    }
  },
  actions: {
    async [USERS.GET_PROFILE] ({ commit }) {
      const profile = await api.getMyProfile()
      commit(USERS.SET_PROFILE, profile)
    },
    [USERS.LOGOUT] ({ commit }) {
      api.clearToken()
      commit(USERS.SET_PROFILE, null)
    }
  },
  getters: {
  }
}
