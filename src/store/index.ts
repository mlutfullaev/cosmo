import { createStore } from 'vuex'

export default createStore({
  state: {
    productSearch: '',
    beauty: true,
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
