import { emaillogin, getinfo } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
const state = {
  user: null,
  token: getToken()
}

const mutations = {
  setinfo: (state, user) => {
    if (user != null) {
      state.user = user
      state.token = user.token
      setToken(user.token)
    } else {
      state.user = null
      state.token = null
      removeToken()
    }
  },
}

const actions = {
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('setinfo', null)
      resetRouter()
      resolve()
    })
  },
  getuserinfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getinfo().then(response => {
        const { data } = response
        commit("setinfo", data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  emaillogin ({ commit }, form) {
    return new Promise((resolve, reject) => {
      emaillogin(form).then(response => {
        const { data } = response
        console.log("vuex emaillogin ", data)
        commit("setinfo", data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}