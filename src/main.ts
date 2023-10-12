import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.scss'
import LinkUI from '@/ui/LinkUI.vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.component('LinkUI', LinkUI)

app.mount('#app')
