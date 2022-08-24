import { getLanguge, setLanguge } from '@/utils/auth'

const state = {
  appname: "LGVUE",
  currlanguage: getLanguge() ? getLanguge() : 'zh',
}

const mutations = {
  setcurrlanguage: (state, lang) => {
    state.currlanguage = lang
    setLanguge(lang)
  },
}

const actions = {
  setcurrlanguage ({ commit }, lang) {
    commit('setcurrlanguage', lang)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}