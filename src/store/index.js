import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 定义数据
    loginResponse: window.localStorage.getItem('loginResponse') || null
  },
  getters: {
  },
  mutations: { // 修改数据
    changeLoginResponse (state, payload) {
      state.loginResponse = payload // store的存储仅在当前vue的单页面程序有效
      console.log(typeof payload)
      window.localStorage.setItem('loginResponse', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
