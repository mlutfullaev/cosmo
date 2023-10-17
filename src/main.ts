import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.scss'
import UI from './ui'
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'

const app = createApp(App)
app.use(store)
app.use(router)

UI.forEach(el => {
  app.component(el.name, el)
})
app.component('TheHeader', TheHeader)
app.component('TheFooter', TheFooter)

app.mount('#app')
