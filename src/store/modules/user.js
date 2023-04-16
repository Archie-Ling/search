import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { phonenumber, password } = userInfo
    return new Promise((resolve, reject) => {

      commit('SET_TOKEN', 3)
      setToken(3)
      resolve()
      // console.log(phonenumber)
      // login({ phone: phonenumber.trim(), pwd: password })
      //   .then(response => {
      //     console.log(222)
      //     const data = response.data
      //     commit('SET_TOKEN', data.employeeId)
      //     setToken(data.employeeId)
      //     resolve()
      //   }).catch(error => {
      //     console.log(error)
      //     reject(error)
      //
      //   })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    console.log(commit)
    console.log(state)
    return new Promise((resolve, reject) => {
      commit('SET_NAME', state.token)
      commit('SET_AVATAR', 22)
      resolve()
      // getInfo(state.token)
      // .then(response =>
      //   {
      //   console.log(response)
      //   const { data } = response
      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }
      //
      //   const { name, avatar } = data
      //
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // })
      // .catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
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

