const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.refreshToken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus
}
export default getters
