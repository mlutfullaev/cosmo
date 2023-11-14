import { createStore } from 'vuex'

export default createStore({
  state: {
    productSearch: '',
  },
  getters: {
  },
  mutations: {
    updatingProductSearch (state, value) {
      console.log(value)
      state.productSearch = value
    }
  },
  actions: {
  },
  modules: {
  }
})
