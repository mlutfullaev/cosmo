import { createStore } from 'vuex'

export default createStore({
  state: {
    productSearch: '',
    filterQuery: {
      page: 1,
      take: 11,
    } as {[key: string]: string | number},
  },
  getters: {
  },
  mutations: {
    updatingProductSearch (state, value) {
      state.productSearch = value
    },
    updateFilterQuery (state, newItems: {[key: string]: string | number}) {
      console.log(true)
      state.filterQuery = { ...state.filterQuery, ...newItems }
    }
  },
  actions: {
  },
  modules: {
  }
})
