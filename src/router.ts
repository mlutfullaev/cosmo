import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from '@/views/MainView.vue'
import Product from '@/views/SingleProduct/Product.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import ProductFilterView from '@/views/ProductFilterView.vue'
import RoutineFilterView from '@/views/RoutineFilterView.vue'
import SingleRoutineView from '@/views/SingleRoutineView.vue'
import RoutineResultView from '@/views/RoutineResultView.vue'
import ProductResultView from '@/views/ProductResultView.vue'
import RoutineIntroView from '@/views/RoutineIntroView.vue'

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
    path: '/single-routine/:id',
    name: 'singe-routine',
    component: SingleRoutineView
  },
  {
    path: '/search-results/:search',
    name: 'search-results',
    component: ProductResultView
  },
  {
    path: '/product-filter',
    name: 'product-filter',
    component: ProductFilterView
  },
  {
    path: '/routine-filter',
    name: 'routine-filter',
    component: RoutineFilterView
  },
  {
    path: '/routine-results',
    name: 'routine-results',
    component: RoutineResultView
  },
  {
    path: '/routine-intro',
    name: 'routine-intro',
    component: RoutineIntroView
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
