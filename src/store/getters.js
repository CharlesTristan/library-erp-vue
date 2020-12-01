const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  refreshToken: state => state.user.refreshToken,
  authorization: state => state.user.authorization,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus
}
export default getters
