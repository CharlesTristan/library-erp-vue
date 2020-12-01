import { login, getInfo, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken, getRfreshToken, setRfreshToken, removeRfreshToken, setMenus } from '@/utils/auth'

const getDefaultState = () => {
  return {
    authorization: getToken(),
    refreshToken: getRfreshToken(),
    name: '',
    avatar: '',
    menus: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.authorization = token
  },
  SET_REFRESH_TOKEN: (state, token) => {
    state.refreshToken = token
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, type: 1 }).then(response => {
        const { data } = response
        // eslint-disable-next-line eqeqeq
        if (response.code == 0) {
          commit('SET_TOKEN', data.accessToken)
          setToken(data.accessToken)
          commit('SET_REFRESH_TOKEN', data.refreshToken)
          setRfreshToken(data.refreshToken)
          resolve()
        } else {
          reject(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { userInfoVO, menus } = data
        // 如果没取到username的话，就会无限循环getInfo
        const username = userInfoVO.username

        // 如果需要404 页面，请在此处添加
        menus.push({
          path: '/404',
          component: '404',
          hidden: true
        }, {
          path: '*',
          redirect: '/404',
          hidden: true
        })
        commit('SET_NAME', username)
        // commit('SET_AVATAR', avatar)
        commit('SET_MENUS', menus)
        setMenus(menus)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  refreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshToken().then((response) => {
        // eslint-disable-next-line eqeqeq
        if (response.code == 0) {
          const { data } = response
          commit('SET_TOKEN', data.accessToken)
          setToken(data.accessToken)
          commit('SET_REFRESH_TOKEN', data.refreshToken)
          setRfreshToken(data.refreshToken)
          resolve()
        } else {
          reject()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    // const that = this
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeRfreshToken()
      // 跳转到首页
      location.href = '/index'
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

