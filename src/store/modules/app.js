import { getLanguge, setLanguge } from '@/utils/auth'
import { addRoutes } from '@/router'

const state = {
  appname: "LGVUE",
  currlanguage: getLanguge() ? getLanguge() : 'zh',
  routers: null,
}

const mutations = {
  setcurrlanguage: (state, lang) => {
    state.currlanguage = lang
    setLanguge(lang)
  },
  setrouters: (state, routers) => {
    state.routers = routers
  },
}

const actions = {
  setcurrlanguage ({ commit }, lang) {
    commit('setcurrlanguage', lang)
  },
  setrouters ({ commit }, rule) {
    const routers = addRoutes(rule)
    commit('setrouters', routers)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}