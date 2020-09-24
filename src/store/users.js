import api from "../api"

export const USERS = {
  SET_PROFILE: "SET_PROFILE",
  GET_PROFILE: "GET_PROFILE",
  IS_CREATOR: "IS_CREATOR",
  IS_EDITOR: "IS_EDITOR",
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
      const response = await api.getMyProfile()
      if (!response.errors) {
        commit(USERS.SET_PROFILE, response)
        api.setAuthentication(true)
      }
    },
    [USERS.LOGOUT] ({ commit }) {
      api.setAuthentication(false)
      commit(USERS.SET_PROFILE, null)
    }
  },
  getters: {
    [USERS.IS_CREATOR] (state) {
      return state.profile ? state.profile.groups.includes("creators") : false
    },
    [USERS.IS_EDITOR] (state) {
      return state.profile ? state.profile.groups.includes("editors") : false
    }
  }
}
