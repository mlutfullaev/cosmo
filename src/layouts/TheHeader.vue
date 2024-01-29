<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import TheMenu from '@/layouts/TheMenu.vue'
import CountryAlert from '@/components/CountryAlert.vue'
import axios from 'axios'
import { API_URL } from '@/assets/constants'
import BaseSidebar from '@/baseComponents/BaseSidebar.vue'
import TheAuth from '@/layouts/TheAuth.vue'
import store from '@/store'
import layoutsText from '@/assets/locales/layouts.json'

interface Library {
  title: string,
  viewAll?: string,
  items: {
    id: number,
    param: string,
    text: string
  }[]
}

const alertActive = ref(false)
const city = ref('city')
const location = ref(true)
const hover = ref(0)
const sidebarActive = ref(false)
const productLibrary = reactive<Library[]>([
  {
    title: 'Categories',
    items: []
  },
  {
    title: 'skin type',
    items: []
  },
  {
    title: 'Steps',
    items: []
  },
  {
    title: 'Brands',
    items: [],
    viewAll: '/'
  },
])
const routineLibrary = reactive<Library[]>([
  {
    title: 'Categories',
    items: []
  },
  {
    title: 'skin type',
    items: []
  },
  {
    title: 'Steps',
    viewAll: '/',
    items: [
      {
        id: 0,
        text: '3 steps',
        param: '3'
      },
      {
        id: 0,
        text: '5 steps',
        param: '5'
      },
      {
        id: 0,
        text: '7 steps',
        param: '7'
      },
      {
        id: 0,
        text: '9 steps',
        param: '9'
      },
      {
        id: 0,
        text: '12 steps',
        param: '12'
      }
    ]
  },
  {
    title: 'Authors',
    viewAll: '/',
    items: []
  },
  {
    title: 'Brands',
    viewAll: '/',
    items: []
  },
])

onMounted(() => {
  axios.get(`${API_URL}forms?order=ASC&page=1&take=8`)
    .then(res => {
      productLibrary[0].items = res.data.data.map((category: { id: number, applicationName: string }) => ({ id: category.id, text: category.applicationName, param: category.applicationName }))
    })
  axios.get(`${API_URL}skintypes?order=ASC&page=1&take=8`)
    .then(res => {
      productLibrary[1].items = res.data.data.map((skinType: { id: number, skinTypeName: string, skinTypeNameForSearch: string }) => ({ id: skinType.id, text: skinType.skinTypeName, param: skinType.skinTypeNameForSearch }))
      productLibrary[2].items = res.data.data.map((skinType: { id: number, skinTypeName: string, skinTypeNameForSearch: string }) => ({ id: skinType.id, text: skinType.skinTypeName, param: skinType.skinTypeNameForSearch }))
      routineLibrary[1].items = res.data.data.map((skinType: { id: number, skinTypeName: string, skinTypeNameForSearch: string }) => ({ id: skinType.id, text: skinType.skinTypeName, param: skinType.skinTypeNameForSearch }))
    })
  axios.get(`${API_URL}brands?order=ASC&page=1&take=8`)
    .then(res => {
      productLibrary[3].items = res.data.data.map((category: { id: number, brandName: string }) => ({ id: category.id, text: category.brandName, param: category.brandName }))
    })

  axios.get(`${API_URL}routines/benefits?order=ASC&page=1&take=8`)
    .then(res => {
      routineLibrary[0].items = res.data.data.map((category: { id: number, benefitRoutineName: string }) => ({ id: category.id, text: category.benefitRoutineName, param: category.benefitRoutineName }))
    })
  axios.get(`${API_URL}routines/authors?order=ASC&page=1&take=8`)
    .then(res => {
      routineLibrary[3].items = res.data.data.map((category: { id: number, authorName: string }) => ({ id: category.id, text: category.authorName, param: category.authorName }))
    })
  axios.get(`${API_URL}brands/routinesbrands?order=ASC&page=1&take=8`)
    .then(res => {
      routineLibrary[4].items = res.data.data.map((category: { id: number, brandName: string }) => ({ id: category.id, text: category.brandName, param: category.brandName }))
    })
})

watch(hover, () => {
  if (hover.value) {
    disableScroll()
  } else {
    enableScroll()
  }
})

watch(sidebarActive, () => {
  if (sidebarActive.value) {
    document.body.classList.add('menu-active')
  } else {
    document.body.classList.remove('menu-active')
  }
})

function disableScroll () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop)
  }
}

function enableScroll () {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.onscroll = function () {}
}
</script>

<template>
  <header class="d-sb">
    <div class="header-items d-sb">
      <router-link to="/" class="logo">
        <img src="@/assets/img/icons/logo.svg" alt="logo">
      </router-link>
      <button class="d-center" @click="alertActive = true" v-if="location">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="19" viewBox="0 0 13 19" fill="none">
          <path d="M6.31574 18.0585C5.32689 17.1153 4.42552 16.096 3.57358 15.0273C2.58093 13.7798 1.67956 12.4677 0.983557 11.0262C0.542377 10.1173 0.192476 9.17405 0.0593614 8.16618C-0.138409 6.6791 0.158247 5.29091 0.945525 4.02442C1.98382 2.35098 3.49372 1.34691 5.43338 1.02363C8.00059 0.597665 10.6325 1.85655 11.937 4.10809C12.9639 5.88041 13.0742 7.73641 12.4124 9.65706C11.918 11.0909 11.1649 12.384 10.3016 13.6201C9.22905 15.1604 8.012 16.5752 6.68086 17.8988C6.62761 17.952 6.57056 18.0052 6.51352 18.0547H6.31194L6.31574 18.0585ZM3.4747 7.37129C3.4747 8.98769 4.79824 10.3036 6.42984 10.3036C8.03102 10.3036 9.35456 8.98008 9.35836 7.3789C9.35836 5.75491 8.05004 4.42756 6.44506 4.42376C4.79444 4.41995 3.4785 5.72828 3.4747 7.37129Z" fill="black"/>
        </svg>
        <span class="min-phone">{{ city }}</span>
      </button>
    </div>

    <nav>
      <HeaderSearch />
      <div class="nav-item">
        <router-link
          to="/product-intro"
          @mouseenter="hover = 2"
          @click="hover = 0"
          @mouseleave="hover = 0">{{layoutsText.skincareProducts[store.state.lang]}} ↓ </router-link>
        <div class="sub-menu" :class="{active: hover === 2}">
          <div class="sub-menu-content" @mouseenter="hover = 2" @mouseleave="hover = 0">
            <div
              v-for="lib of productLibrary"
              :key="lib.title"
              class="sub-menu-item">
              <p class="txt-highlight">{{lib.title}}</p>
              <RouterLink
                class="note"
                v-for="item in lib.items"
                :to="`/product-results/menu/${item.param}`"
                :key="item.id"
                @click="hover = 0"
              >{{ item.text }}</RouterLink>
              <RouterLink
                v-if="lib.viewAll"
                :to="lib.viewAll"
                @click="hover = 0"
                class="note">{{layoutsText.viewAll[store.state.lang]}} →</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-item">
        <router-link
          to="/routine-intro"
          @mouseenter="hover = 1"
          @click="hover = 0"
          @mouseleave="hover = 0">{{layoutsText.skincareRoutines[store.state.lang]}} ↓</router-link>
        <div class="sub-menu" :class="{active: hover === 1}">
          <div class="sub-menu-content" @mouseenter.stop="hover = 1" @mouseleave="hover = 0">
            <div
              v-for="lib of routineLibrary"
              :key="lib.title"
              class="sub-menu-item">
              <p class="txt-highlight">{{lib.title}}</p>
              <RouterLink
                class="note"
                v-for="item in lib.items"
                :to="`/routine-results/menu/${item.param}`"
                :key="item.id"
                @click="hover = 0"
              >{{ item.text }}</RouterLink>
              <RouterLink
                v-if="lib.viewAll"
                :to="lib.viewAll"
                @click="hover = 0"
                class="note">{{layoutsText.viewAll[store.state.lang]}} →</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <button v-if="!store.state.beauty" @click="sidebarActive = true" class="login">{{layoutsText.login[store.state.lang]}}</button>
      <router-link to="/profile" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M20 10C20 4.49 15.51 0 10 0C4.49 0 0 4.49 0 10C0 12.9 1.25 15.51 3.23 17.34C3.23 17.35 3.23 17.35 3.22 17.36C3.32 17.46 3.44 17.54 3.54 17.63C3.6 17.68 3.65 17.73 3.71 17.77C3.89 17.92 4.09 18.06 4.28 18.2C4.35 18.25 4.41 18.29 4.48 18.34C4.67 18.47 4.87 18.59 5.08 18.7C5.15 18.74 5.23 18.79 5.3 18.83C5.5 18.94 5.71 19.04 5.93 19.13C6.01 19.17 6.09 19.21 6.17 19.24C6.39 19.33 6.61 19.41 6.83 19.48C6.91 19.51 6.99 19.54 7.07 19.56C7.31 19.63 7.55 19.69 7.79 19.75C7.86 19.77 7.93 19.79 8.01 19.8C8.29 19.86 8.57 19.9 8.86 19.93C8.9 19.93 8.94 19.94 8.98 19.95C9.32 19.98 9.66 20 10 20C10.34 20 10.68 19.98 11.01 19.95C11.05 19.95 11.09 19.94 11.13 19.93C11.42 19.9 11.7 19.86 11.98 19.8C12.05 19.79 12.12 19.76 12.2 19.75C12.44 19.69 12.69 19.64 12.92 19.56C13 19.53 13.08 19.5 13.16 19.48C13.38 19.4 13.61 19.33 13.82 19.24C13.9 19.21 13.98 19.17 14.06 19.13C14.27 19.04 14.48 18.94 14.69 18.83C14.77 18.79 14.84 18.74 14.91 18.7C15.11 18.58 15.31 18.47 15.51 18.34C15.58 18.3 15.64 18.25 15.71 18.2C15.91 18.06 16.1 17.92 16.28 17.77C16.34 17.72 16.39 17.67 16.45 17.63C16.56 17.54 16.67 17.45 16.77 17.36C16.77 17.35 16.77 17.35 16.76 17.34C18.75 15.51 20 12.9 20 10ZM14.94 14.97C12.23 13.15 7.79 13.15 5.06 14.97C4.62 15.26 4.26 15.6 3.96 15.97C2.44 14.43 1.5 12.32 1.5 10C1.5 5.31 5.31 1.5 10 1.5C14.69 1.5 18.5 5.31 18.5 10C18.5 12.32 17.56 14.43 16.04 15.97C15.75 15.6 15.38 15.26 14.94 14.97Z" fill="#FF8A00"/>
          <path d="M10 4.92969C7.93 4.92969 6.25 6.60969 6.25 8.6797C6.25 10.7097 7.84 12.3597 9.95 12.4197H10.04H10.11H10.13C12.15 12.3497 13.74 10.7097 13.75 8.6797C13.75 6.60969 12.07 4.92969 10 4.92969Z" fill="#FF8A00"/>
        </svg>
      </router-link>
    </nav>
    <CountryAlert
      :city="city"
      :alert-active="alertActive"
      @hideLocation="location = false"
      @alert="(value: boolean) => alertActive = value"
      @city="(value: string) => city = value"/>
  </header>
  <BaseSidebar
      @close="sidebarActive = false"
      :sidebar-active="sidebarActive"
  >
    <TheAuth @close="sidebarActive = false" />
  </BaseSidebar>
  <TheMenu :productLibrary="productLibrary"/>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 3;
  padding: 0 60px;
  border-bottom: 1px solid $black;

  .header-items {
    gap: 20px;

    button {
      font-size: 14px;
      gap: 5px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      text-transform: uppercase;
      transition: .3s;
    }
    .nav-item {

      > a {
        display: block;
        padding: 20px 0;

        &.router-link-active {
          color: $orange;
        }
        &:hover {
          color: $orange;
        }
      }
      .sub-menu {
        top: 58px;
        position: absolute;
        right: 0;
        background-color: rgba(0, 0, 0, 0.4);
        height: calc(100vh - 47px);
        overflow-y: auto;
        width: 100%;
        left: 0;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-10px);
        transition: .3s;

        &.active {
          visibility: visible;
          opacity: 1;
          z-index: 1;
          transform: translateY(0);
        }
        &-content {
          background: #fff;
          display: flex;
          padding-bottom: 10px;

          .sub-menu-item {
            border-top: 1px solid $black;
            flex: 1;
          }
          p {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid $black;
            margin-bottom: 10px;
          }
          a {
            display: block;
            color: $grey-dark;
            margin: 0 auto;
            width: max-content;
            text-align: center;
            padding: 10px 20px;
            transition: .3s;

            &:hover {
              color: $orange;
            }
          }
        }
      }
      @media (max-width: 768px) {
        display: none;
      }
    }
    .login {
      font-weight: 700;
      background-color: $orange;
      color: $black;
      transition: .3s;

      padding: 5px 12px;

      &:hover {
        color: $white;
      }
    }

    @media (max-width: 768px) {
      padding-right: 60px;
    }
    @media (max-width: 480px) {
      gap: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
}
</style>
