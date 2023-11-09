import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.scss'
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import scrollToTop from '@/directives/scrollToTop'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(MotionPlugin)
app.component('TheHeader', TheHeader)
app.component('TheFooter', TheFooter)
app.directive('scrollToTop', scrollToTop)

app.mount('#app')
