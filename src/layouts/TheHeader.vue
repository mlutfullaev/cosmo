<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import TheMenu from '@/layouts/TheMenu.vue'
import CountryAlert from '@/components/CountryAlert.vue'
import axios from 'axios'

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
  axios.get('https://api-www.beautyid.app/forms?order=ASC&page=1&take=8')
    .then(res => {
      productLibrary[0].items = res.data.data.map((category: { id: number, applicationName: string }) => ({ id: category.id, text: category.applicationName, param: category.applicationName }))
    })
  axios.get('https://api-www.beautyid.app/skintypes?order=ASC&page=1&take=8')
    .then(res => {
      productLibrary[1].items = res.data.data.map((skinType: { id: number, skinTypeName: string, skinTypeNameForSearch: string }) => ({ id: skinType.id, text: skinType.skinTypeName, param: skinType.skinTypeNameForSearch }))
      productLibrary[2].items = res.data.data.map((skinType: { id: number, skinTypeName: string, skinTypeNameForSearch: string }) => ({ id: skinType.id, text: skinType.skinTypeName, param: skinType.skinTypeNameForSearch }))
      routineLibrary[1].items = res.data.data.map((skinType: { id: number, skinTypeName: string, skinTypeNameForSearch: string }) => ({ id: skinType.id, text: skinType.skinTypeName, param: skinType.skinTypeNameForSearch }))
    })
  axios.get('https://api-www.beautyid.app/brands?order=ASC&page=1&take=8')
    .then(res => {
      productLibrary[3].items = res.data.data.map((category: { id: number, brandName: string }) => ({ id: category.id, text: category.brandName, param: category.brandName }))
    })

  axios.get('https://api-www.beautyid.app/routines/benefits?order=ASC&page=1&take=8')
    .then(res => {
      routineLibrary[0].items = res.data.data.map((category: { id: number, benefitRoutineName: string }) => ({ id: category.id, text: category.benefitRoutineName, param: category.benefitRoutineName }))
    })
  axios.get('https://api-www.beautyid.app/routines/authors?order=ASC&page=1&take=8')
    .then(res => {
      routineLibrary[3].items = res.data.data.map((category: { id: number, authorName: string }) => ({ id: category.id, text: category.authorName, param: category.authorName }))
    })
  axios.get('https://api-www.beautyid.app/brands/routinesbrands?order=ASC&page=1&take=8')
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
        <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.93333 19.5975C6.74963 19.5975 5.66667 19.4086 4.68444 19.0308C3.70222 18.6278 2.85852 18.036 2.15333 17.2552C1.47333 16.4745 0.944444 15.5049 0.566667 14.3464C0.188889 13.1878 0 11.853 0 10.3419V9.05746C0 7.64709 0.188889 6.40043 0.566667 5.31747C0.96963 4.20932 1.51111 3.27747 2.19111 2.52191C2.8963 1.76635 3.72741 1.1871 4.68444 0.784132C5.66667 0.381169 6.74963 0.179688 7.93333 0.179688C9.04148 0.179688 10.0363 0.330799 10.9178 0.633021C11.7993 0.910058 12.5548 1.31302 13.1844 1.84191C13.8141 2.34561 14.3178 2.93747 14.6956 3.61747C15.0733 4.27228 15.3378 4.97747 15.4889 5.73302H12.92C12.643 4.80117 12.1267 4.02043 11.3711 3.3908C10.6156 2.76117 9.53259 2.44635 8.12222 2.44635C6.51037 2.44635 5.17556 3.01302 4.11778 4.14635C3.08519 5.27969 2.56889 6.91672 2.56889 9.05746V10.3419C2.56889 12.6589 3.09778 14.4093 4.15556 15.593C5.21333 16.7515 6.53556 17.3308 8.12222 17.3308C9.53259 17.3308 10.6156 17.0034 11.3711 16.3486C12.1267 15.6938 12.643 14.7997 12.92 13.6664H15.4889C15.3378 14.5226 15.0733 15.316 14.6956 16.0464C14.3178 16.7515 13.8141 17.3686 13.1844 17.8975C12.5548 18.4264 11.7993 18.8419 10.9178 19.1441C10.0363 19.4464 9.04148 19.5975 7.93333 19.5975Z" fill="black"/>
          <path d="M24.3622 19.5975C21.8185 19.5975 19.7911 18.8167 18.28 17.2552C16.7941 15.6938 16.0511 13.4523 16.0511 10.5308V9.24635C16.0511 7.8108 16.24 6.52635 16.6178 5.39302C17.0208 4.25969 17.5874 3.31524 18.3178 2.55969C19.0482 1.77895 19.9171 1.1871 20.9245 0.784132C21.9571 0.381169 23.103 0.179688 24.3622 0.179688C26.9059 0.179688 28.9208 0.960428 30.4067 2.52191C31.9178 4.08339 32.6734 6.32487 32.6734 9.24635V10.5308C32.6734 11.9664 32.4719 13.2508 32.0689 14.3841C31.6911 15.5175 31.1371 16.4745 30.4067 17.2552C29.6763 18.0108 28.7948 18.5901 27.7622 18.993C26.7548 19.396 25.6215 19.5975 24.3622 19.5975ZM24.3622 17.3308C26.1 17.3308 27.4852 16.7641 28.5178 15.6308C29.5756 14.4975 30.1045 12.7975 30.1045 10.5308V9.24635C30.1045 7.00487 29.5756 5.31747 28.5178 4.18413C27.46 3.02561 26.0748 2.44635 24.3622 2.44635C22.6245 2.44635 21.2267 3.01302 20.1689 4.14635C19.1363 5.27969 18.62 6.97969 18.62 9.24635V10.5308C18.62 12.7723 19.1489 14.4723 20.2067 15.6308C21.2645 16.7641 22.6496 17.3308 24.3622 17.3308Z" fill="black"/>
          <path d="M41.166 19.5975C38.7734 19.5975 36.9978 19.0938 35.8393 18.0864C34.6808 17.0538 34.0008 15.7064 33.7993 14.0441H36.3682C36.5697 15.0767 37.023 15.8827 37.7282 16.4619C38.4334 17.0412 39.5793 17.3308 41.166 17.3308C42.7778 17.3308 43.9112 17.0538 44.566 16.4997C45.246 15.9456 45.586 15.2152 45.586 14.3086C45.586 13.5027 45.2963 12.873 44.7171 12.4197C44.163 11.9664 43.4578 11.6012 42.6015 11.3241C41.7704 11.0219 40.8638 10.7575 39.8815 10.5308C38.8993 10.2789 37.9801 9.95154 37.1238 9.54858C36.2926 9.14561 35.5875 8.61672 35.0082 7.96191C34.4541 7.30709 34.1771 6.41302 34.1771 5.27969C34.1771 3.84413 34.7312 2.63524 35.8393 1.65302C36.9475 0.670799 38.5971 0.179688 40.7882 0.179688C41.9467 0.179688 42.9541 0.318206 43.8104 0.595243C44.6667 0.847095 45.3845 1.19969 45.9638 1.65302C46.543 2.10635 46.9963 2.64784 47.3238 3.27747C47.6512 3.9071 47.8652 4.59969 47.966 5.35524H45.3971C45.1956 4.47376 44.7549 3.76858 44.0749 3.23969C43.3949 2.7108 42.2993 2.44635 40.7882 2.44635C39.3275 2.44635 38.2823 2.7108 37.6526 3.23969C37.0482 3.74339 36.746 4.42339 36.746 5.27969C36.746 6.03524 37.023 6.6271 37.5771 7.05524C38.1563 7.45821 38.8615 7.79821 39.6926 8.07524C40.5489 8.3271 41.4682 8.57895 42.4504 8.8308C43.4326 9.05746 44.3393 9.38487 45.1704 9.81302C46.0267 10.216 46.7319 10.7701 47.286 11.4752C47.8652 12.1552 48.1549 13.0997 48.1549 14.3086C48.1549 15.0641 48.0038 15.7693 47.7015 16.4241C47.4245 17.0538 46.9963 17.6078 46.4171 18.0864C45.8378 18.5397 45.1075 18.9049 44.226 19.1819C43.3445 19.4589 42.3245 19.5975 41.166 19.5975Z" fill="black"/>
          <path d="M50.4304 0.444133H52.3948L52.6971 3.27747H52.7726C53.503 2.27006 54.3467 1.50191 55.3037 0.973021C56.2859 0.444132 57.3563 0.179688 58.5148 0.179688C59.8748 0.179688 61.0585 0.494502 62.0659 1.12413C63.0734 1.75376 63.8415 2.69821 64.3704 3.95747C64.9496 2.74858 65.7808 1.81672 66.8637 1.16191C67.9719 0.507095 69.2437 0.179688 70.6793 0.179688C71.6615 0.179688 72.5556 0.343391 73.3615 0.670799C74.1674 0.998206 74.86 1.50191 75.4393 2.18191C76.0185 2.83672 76.4593 3.65524 76.7615 4.63747C77.0889 5.5945 77.2526 6.71524 77.2526 7.99969V19.333H74.7593V7.99969C74.7593 6.13598 74.3437 4.7508 73.5126 3.84413C72.6815 2.91228 71.5482 2.44635 70.1126 2.44635C69.4074 2.44635 68.7526 2.58487 68.1482 2.86191C67.5437 3.11376 67.0148 3.49154 66.5615 3.99524C66.1082 4.47376 65.743 5.05302 65.4659 5.73302C65.2141 6.41302 65.0882 7.16858 65.0882 7.99969V19.333H62.5948V7.99969C62.5948 6.13598 62.1793 4.7508 61.3482 3.84413C60.5171 2.91228 59.3837 2.44635 57.9482 2.44635C57.243 2.44635 56.5882 2.58487 55.9837 2.86191C55.3793 3.11376 54.8504 3.49154 54.3971 3.99524C53.9437 4.47376 53.5785 5.05302 53.3015 5.73302C53.0496 6.41302 52.9237 7.16858 52.9237 7.99969V19.333H50.4304V0.444133Z" fill="black"/>
          <path d="M99.0334 10C99.0334 15.5228 94.5563 20 89.0334 20C83.5106 20 79.0334 15.5228 79.0334 10C79.0334 4.47715 83.5106 0 89.0334 0C94.5563 0 99.0334 4.47715 99.0334 10Z" fill="#FF8A00"/>
          <path d="M81.6653 7.46667H82.5613L83.5426 11.4489H83.5568L84.4173 7.46667H85.5266L86.4866 11.4489H86.5008L87.4395 7.46667H88.2786L87.0555 12.4444H85.9461L84.979 8.46222H84.9648L84.0688 12.4444H82.9595L81.6653 7.46667Z" fill="black"/>
          <path d="M88.9522 7.46667H89.8055V12.4444H88.9522V7.46667Z" fill="black"/>
          <path d="M90.8333 7.46667H91.6866V9.86311L93.564 7.46667H94.6022L92.8671 9.67111L94.7444 12.4444H93.6778L92.2769 10.3182L91.6866 11.0507V12.4444H90.8333V7.46667Z" fill="black"/>
          <path d="M95.3828 7.46667H96.2361V12.4444H95.3828V7.46667Z" fill="black"/>
        </svg>
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
          @mouseleave="hover = 0">SKINcare products ↓ </router-link>
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
                class="note">view all →</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-item">
        <router-link
          to="/routine-intro"
          @mouseenter="hover = 1"
          @click="hover = 0"
          @mouseleave="hover = 0">SKINcare ROUTINEs ↓</router-link>
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
                class="note">view all →</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <router-link class="login" to="/registration">LOGIN</router-link>
    </nav>
    <CountryAlert
      :city="city"
      :alert-active="alertActive"
      @hideLocation="location = false"
      @alert="(value: boolean) => alertActive = value"
      @city="(value: string) => city = value"/>
  </header>
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

      @media (max-width: 769px) {
        display: none;
      }
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
      background-color: $orange;
      color: $black;
      transition: .3s;

      padding: 5px 12px;

      &:hover {
        color: $white;
      }
    }

    @media (max-width: 768px) {
      padding-right: 40px;
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
