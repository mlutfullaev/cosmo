import { createStore } from 'vuex'
import auth from './auth'
import { useHelpers } from '@/useHelpers'
import { locales } from '@/assets/constants'

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
    lang: 'en',
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
    login (state, value) {
      state.beauty = true
      state.username = value
    },
    logout (state) {
      state.beauty = false
      state.username = ''
      setCookie('login', { username: '', accessToken: '', expiresIn: '1s' }, '1s')
    },
    switchLanguage (state, value) {
      state.lang = value
      localStorage.setItem('locale', value)
    }
  },
  actions: {
  },
  modules: {
    auth,
  }
})

export default store
