import { createStore } from 'vuex'
import auth from './auth'

window.onscroll = () => {
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    store.commit('updateShowLater', true)
  } else {
    store.commit('updateShowLater', false)
  }
}

const store = createStore({
  state: {
    productSearch: '',
    beauty: true,
    showLater: false,
    modalSubscribe: false,
  },
  getters: {
  },
  mutations: {
    updatingProductSearch (state, value) {
      state.productSearch = value
    },
    checkBeauty (state) {
      state.beauty = true
    },
    updateShowLater (state, value) {
      state.showLater = value
    },
    updateModalSubscribe (state, value) {
      state.modalSubscribe = value
    }
  },
  actions: {
  },
  modules: {
    auth,
  }
})

export default store
