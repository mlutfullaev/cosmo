import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.scss'
import UI from './ui'
import TheHeader from '@/layouts/TheHeader.vue'

const app = createApp(App)
app.use(store)
app.use(router)

UI.forEach(el => {
  app.component(el.name, el)
})
app.component('TheHeader', TheHeader)

app.mount('#app')
