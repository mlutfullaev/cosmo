import { createStore } from 'vuex'
import auth from './auth'
import { useHelpers } from '@/useHelpers'

const { setCookie } = useHelpers()

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
    beauty: false,
    username: '',
    showLater: false,
    modalSubscribe: false,
  },
  getters: {
  },
  mutations: {
    updatingProductSearch (state, value) {
      state.productSearch = value
    },
    updateShowLater (state, value: boolean) {
      state.showLater = value
    },
    updateModalSubscribe (state, value: boolean) {
      state.modalSubscribe = value
    },
    login (state, value: string) {
      state.beauty = true
      state.username = value
    },
    logout (state) {
      state.beauty = false
      state.username = ''
      setCookie('login', { username: '', accessToken: '', expiresIn: '1s' }, '1s')
    }
  },
  actions: {
  },
  modules: {
    auth,
  }
})

export default store
