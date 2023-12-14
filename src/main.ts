import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import VueAwesomePaginate from 'vue-awesome-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import '@/assets/scss/global.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(MotionPlugin)
app.use(VueAwesomePaginate)
app.component('TheHeader', TheHeader)
app.component('TheFooter', TheFooter)

app.mount('#app')
