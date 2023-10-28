import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from '@/views/MainView.vue'
import Product from '@/views/Product/Product.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import RoutineView from '@/views/RoutineView.vue'
import SearchResultView from '@/views/SearchResultView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/single-product/:id',
    name: 'single-product',
    component: Product
  },
  {
    path: '/single-routine',
    name: 'singe-routine',
    component: RoutineView
  },
  {
    path: '/search-results',
    name: 'search-results',
    component: SearchResultView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
