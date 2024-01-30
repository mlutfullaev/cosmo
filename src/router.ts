import { createRouter, createWebHistory, RouteRecordRaw, RouterView, useRoute } from 'vue-router'
import MainView from '@/views/MainView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import SingleRoutineView from '@/views/SingleRoutineView.vue'
import RoutineFilterView from '@/views/RoutineFilterView.vue'
import RoutineResultNotFound from '@/views/RoutineResults/RoutineResultNotFound.vue'
import RoutineResultFiltered from '@/views/RoutineResults/RoutineResultFiltered.vue'
import RoutineResultBrand from '@/views/RoutineResults/RoutineResultBrand.vue'
import RoutineResultMenu from '@/views/RoutineResults/RoutineResultMenu.vue'
import RoutineIntroView from '@/views/RoutineIntroView.vue'
import ProductResultSearch from '@/views/ProductResult/ProductResultSearch.vue'
import ProductResultFiltered from '@/views/ProductResult/ProductResultFiltered.vue'
import ProductResultBrand from '@/views/ProductResult/ProductResultBrand.vue'
import ProductResultMenu from '@/views/ProductResult/ProductResultMenu.vue'
import ProductResultNotFound from '@/views/ProductResult/ProductResultNotFound.vue'
import ProductIntroView from '@/views/ProductIntroView.vue'
import ProductFilterView from '@/views/ProductFilterView.vue'
import SingleProductView from '@/views/SingleProductView.vue'
import VueCookies from 'vue-cookies'
import store from '@/store'
import ProfileView from '@/views/Profile/ProfileView.vue'
import PasswordResetView from '@/views/PasswordResetView.vue'
import { locales } from '@/assets/constants'
import ProfileSkinView from '@/views/Profile/ProfileSkinView.vue'
import ProfileAccountView from '@/views/Profile/ProfileAccountView.vue'
import ProfileProductsView from '@/views/Profile/ProfileProductsView.vue'
import ProfileRoutinesView from '@/views/Profile/ProfileRoutinesView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'main',
    component: MainView
  },
  {
    path: 'single-product/:id',
    name: 'single-product',
    component: SingleProductView
  },
  {
    path: 'product-results/search/:param',
    name: 'product-results-search',
    component: ProductResultSearch
  },
  {
    path: 'product-results/brand/:param',
    name: 'product-results-brand',
    component: ProductResultBrand
  },
  {
    path: 'product-results/menu/:param',
    name: 'product-results-menu',
    component: ProductResultMenu
  },
  {
    path: 'product-results/filtered/',
    name: 'product-results-filtered',
    component: ProductResultFiltered
  },
  {
    path: 'product-results/not-found/:param?',
    name: 'product-results-not-found',
    component: ProductResultNotFound
  },
  {
    path: 'product-filter',
    name: 'product-filter',
    component: ProductFilterView
  },
  {
    path: 'product-intro',
    name: 'product-intro',
    component: ProductIntroView
  },
  {
    path: 'routine-filter',
    name: 'routine-filter',
    component: RoutineFilterView
  },
  {
    path: 'single-routine/:id',
    name: 'singe-routine',
    component: SingleRoutineView
  },
  {
    path: 'routine-results/filtered',
    name: 'routine-results-filtered',
    component: RoutineResultFiltered
  },
  {
    path: 'routine-results/menu/:param',
    name: 'routine-results-menu',
    component: RoutineResultMenu
  },
  {
    path: 'routine-results/brand/:param',
    name: 'routine-results-brand',
    component: RoutineResultBrand
  },
  {
    path: 'routine-results/not-found/:param?',
    name: 'routine-results-not-found',
    component: RoutineResultNotFound
  },
  {
    path: 'routine-intro',
    name: 'routine-intro',
    component: RoutineIntroView
  },
  {
    path: 'registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: 'profile',
    name: 'profile',
    component: ProfileView,
    children: [
      {
        path: '',
        name: '',
        component: ProfileSkinView
      },
      {
        path: 'account',
        name: 'account',
        component: ProfileAccountView
      },
      {
        path: 'products',
        name: 'products',
        component: ProfileProductsView
      },
      {
        path: 'routines',
        name: 'routines',
        component: ProfileRoutinesView
      },
    ]
  },
  {
    path: 'password-reset',
    name: 'password-reset',
    component: PasswordResetView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      component: RouterView,
      children: routes
    }
  ],
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

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const auth = VueCookies.get('auth')
  if (auth) {
    store.commit('updateLogin', { isLoggedIn: true, user: { name: auth.username } })
    next()
  } else {
    window.location.pathname = '/login/index.html'
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const login = VueCookies.get('login')
  if (login.accessToken) {
    store.commit('login', login.username)
  }

  const paramLocale = to.params.locale as string

  if (!paramLocale || !locales.includes(paramLocale)) {
    router.push({
      name: to.name as string,
      params: { ...to.params, locale: store.state.lang }
    })
  } else {
    store.commit('switchLanguage', paramLocale)
  }

  next()
})

export default router
