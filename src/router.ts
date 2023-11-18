import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from '@/views/MainView.vue'
import Product from '@/views/SingleProduct/Product.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import ProductFilterView from '@/views/ProductFilterView.vue'
import RoutineFilterView from '@/views/RoutineFilterView.vue'
import SingleRoutineView from '@/views/SingleRoutineView.vue'
import RoutineResultView from '@/views/RoutineResultView.vue'
import ProductResultSearch from '@/views/ProductResult/ProductResultSearch.vue'
import ProductResultFiltered from '@/views/ProductResult/ProductResultFiltered.vue'
import ProductResultBrand from '@/views/ProductResult/ProductResultBrand.vue'
import ProductResultMenu from '@/views/ProductResult/ProductResultMenu.vue'
import ProductResultNotFound from '@/views/ProductResult/ProductResultNotFound.vue'
import RoutineIntroView from '@/views/RoutineIntroView.vue'
import ProductIntroView from '@/views/ProductIntroView.vue'

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
    path: '/product-results/search/:param',
    name: 'product-results-search',
    component: ProductResultSearch
  },
  {
    path: '/product-results/brand/:param',
    name: 'product-results-brand',
    component: ProductResultBrand
  },
  {
    path: '/product-results/menu/:param',
    name: 'product-results-menu',
    component: ProductResultMenu
  },
  {
    path: '/product-results/filtered/',
    name: 'product-results-filtered',
    component: ProductResultFiltered
  },
  {
    path: '/product-results/not-found/:param?',
    name: 'product-results-not-found',
    component: ProductResultNotFound
  },
  {
    path: '/product-filter',
    name: 'product-filter',
    component: ProductFilterView
  },
  {
    path: '/product-intro',
    name: 'product-intro',
    component: ProductIntroView
  },
  {
    path: '/routine-filter',
    name: 'routine-filter',
    component: RoutineFilterView
  },
  {
    path: '/single-routine/:id',
    name: 'singe-routine',
    component: SingleRoutineView
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
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
