
interface State {
  user: null | { name: string }
}

export default {
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {
    updateLogin (state: State, value: State) {
      state = value
    },
    // async login (state: State, value: { username: string, password: string }) {
    //   axios.post(`${process.env.VUE_APP_BASE_URL}/login`, value)
    //     .then(res => {})
    // },
  }
}
