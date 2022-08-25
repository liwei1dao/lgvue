const getters = {
  appname: state => state.app.appname,
  currlanguage: state => state.app.currlanguage,
  routers: state => state.app.routers,
  user: state => state.user.user,
  token: state => state.user.token,
}
export default getters