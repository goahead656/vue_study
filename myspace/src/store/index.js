import { createStore } from 'vuex'
import moduleUser from './user.js'

export default createStore({
  //state存储所有数据
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:moduleUser
  }
})
