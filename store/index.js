import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  SET_NAV_AUTH: 'SET_NAV_AUTH',
  LOGOUT: 'LOGOUT',
}

export const state = {
  accessToken: null, // JWT access token
  refreshToken: null, // JWT refresh token
  memberId: null, // user memberId
  navAuth: null,  // club auth map
}

export const mutations = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER] (state, { memberId, navAuth }) {
    state.memberId = memberId
    state.navAuth = navAuth
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD] (state, { accessToken, refreshToken = null }) {
    state.accessToken = accessToken

    // refresh token is optional, only set it if present
    if (refreshToken) {
      state.refreshToken = refreshToken
    }
  },

  // [AUTH_MUTATIONS.SET_NAV_AUTH] (state, { navAuth }) {
  // },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT] (state) {
    state.membermemberId = null
    state.accessToken = null
    state.refreshToken = null
  },
}

export const actions = {
  async login ({ commit, dispatch }, submit) {
    // make an API call to login the user with an email address and password
    const { data: { data } } = await this.$axios.post('/api/auth/login', submit)
    
    console.log('data -> ', data)
    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, { memberId: data.memberId, navAuth: data.clubAuthorizationDTO })
    commit(AUTH_MUTATIONS.SET_PAYLOAD, { accessToken: data.accessToken, refreshToken: data.refreshToken })
  },

  // given the current refresh token, refresh the user's access token to prevent expiry
  async refresh ({ commit, state }) {
    const { refreshToken } = state

    // make an API call using the refresh token to generate a new access token
    const { data: { data } } = await this.$axios.post('/api/auth/refresh', { refreshToken })

    commit(AUTH_MUTATIONS.SET_PAYLOAD, { accessToken: data.accessToken, refreshToken: data.refreshToken })
  },

  // logout the user
  logout ({ commit, state }) {
    commit(AUTH_MUTATIONS.LOGOUT)
  },

  // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
  // automatically refresh the access token on the initial request to the server, if possible
  async nuxtServerInit ({ dispatch, commit, state }) {
    console.log('check nuxt server-init')
    const accessToken = state.accessToken
    const refreshToken = state.refreshToken

    if (accessToken && refreshToken) {
      try {
        // refresh the access token
        await dispatch('refresh')
      } catch (e) {
        // catch any errors and automatically logout the user
        await dispatch('logout')
      }
    }
  },
}

export const getters = {
  // determine if the user is authenticated based on the presence of the access token
  isAuthenticated: (state) => {
    return state.accessToken && state.accessToken !== ''
  },
  getNavAuth: (state) => state.navAuth,
}