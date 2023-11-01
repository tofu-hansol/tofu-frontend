import axios from 'axios'

export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  SET_CLUB_AUTH: 'SET_CLUB_AUTH',
  LOGOUT: 'LOGOUT',
}

export const state = () => ({
  accessToken: null, // JWT access token
  refreshToken: null, // JWT refresh token
  memberId: null, // user memberId
  clubAuth: null,  // club auth map
})

export const mutations = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER] (state, { memberId, clubAuth }) {
    state.memberId = memberId
    state.clubAuth = clubAuth
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD] (state, { accessToken, refreshToken = null }) {
    state.accessToken = accessToken

    // refresh token is optional, only set it if present
    if (refreshToken) {
      state.refreshToken = refreshToken
    }
  },

  // [AUTH_MUTATIONS.SET_NAV_AUTH] (state, { clubAuth }) {
  // },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT] (state) {
    state.memberId = null
    state.accessToken = null
    state.refreshToken = null
    sessionStorage.removeItem("login")
    this.$router.go(0)
  },

  saveStateToStorage(state) {
		sessionStorage.setItem("login", JSON.stringify(state));
	},

  readStateFromStorage(state) {
		if (sessionStorage.getItem("login") != null) {
			const storage = JSON.parse(sessionStorage.getItem("login"));
			if (storage.memberId != null) {
				state.memberId = storage.memberId;
			}
			if (storage.accessToken != null) {
				state.accessToken = storage.accessToken;
			}
			if (storage.memberId != null) {
				state.refreshToken = storage.refreshToken;
			}
      if (storage.clubAuth != null) {
				state.clubAuth = storage.clubAuth;
			}
		}
	}
}

export const actions = {
  async login ({ commit, dispatch }, submit) {
    let result = false;
	  let resultErr = null;
    try {
      const { data: { data } } = await this.$axios.post('/api/auth/login', submit)
    
      console.log('data -> ', data)
      // commit the user and tokens to the state
      commit(AUTH_MUTATIONS.SET_USER, { memberId: data.memberId, clubAuth: data.clubAuthorizationDTO })
      commit(AUTH_MUTATIONS.SET_PAYLOAD, { accessToken: data.accessToken, refreshToken: data.refreshToken })
      commit('saveStateToStorage');
      axios.defaults.headers.common['Access-Token'] = data.accessToken;
			result = true;
    } catch(err) {
      if (!err.response) {
        err.response = {data:{"success":false, "errormessage":err.message}};
      }
      resultErr = err;
      alert('존재하지 않은 회원이거나 비밀번호가 틀렸습니다.');
      this.$router.go(0)
    }

    return new Promise((resolve, reject) => {
      if (result) {
        resolve();
      } else {
        reject(resultErr);
      }
    });
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

  doReadStateFromStorage({commit}) {
    commit('readStateFromStorage');
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
  getClubAuth: (state) => state.clubAuth,
}