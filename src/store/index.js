import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: '',
    nickName: ''
  },
  getters: {
  },
  mutations: {
    // 编码风格, mutations最好大写(区分)
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    },
    SET_NICKNAME (state, value) {
      state.nickName = value
    }
  },
  actions: {
  },
  modules: {
  }
})
