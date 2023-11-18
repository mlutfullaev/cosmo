import { createStore } from 'vuex'

export default createStore({
  state: {
    productSearch: '',
  },
  getters: {
  },
  mutations: {
    updatingProductSearch (state, value) {
      state.productSearch = value
    },
  },
  actions: {
  },
  modules: {
  }
})
