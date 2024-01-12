<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useHelpers } from '@/useHelpers'
import { BasicResponse, Product, Routine } from '@/assets/interfaces'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

import ProductCard from '@/components/ProductCard.vue'
import AiAssistance from '@/components/AiAssistance.vue'
import RoutineCard from '@/components/RoutineCard.vue'
import SingleProductSlide from '@/components/SingleProductSlide.vue'
import BaseSubscripe from '@/baseComponents/BaseSubscripe.vue'
import TheReviews from '@/components/TheReviews.vue'
import { API_URL, emptyRes, samples, services } from '@/assets/constants'
import ThePagination from '@/layouts/ThePagination.vue'

interface Prices {
  id: number,
  priceValue: number,
  priceShopName: string,
  priceGoodLink: string,
}
interface Brand {
  id: number,
  brandName: string,
  brandDescription: string,
  brandLogo: string,
  SEOlogoAlt: string,
}

const route = useRoute()
const { updateMeta } = useHelpers()
const beauty = store.state.beauty

const links = ref([
  {
    link: 'about',
    description: 'Details this product in table and full details from brand.',
    title: 'FULL PRODUCT DETAILS'
  },
  {
    link: 'services',
    description: 'Services and offerings for this product',
    title: 'AVAILABLE SERVICES'
  },
  {
    link: 'reviews',
    description: 'REVIEWS and YOUR SKINTWINS EXPERIENCES WITH THIS PRODUCT',
    title: 'REVIEWS'
  },
  {
    link: 'prices',
    description: 'Pricing comparison from the shops in your area',
    title: 'Prices near You'
  },
  {
    link: 'alternatives',
    description: 'Alternative products based on ingredients and targeted concerns.',
    title: 'ALTERNATIVES'
  },
  {
    link: 'routines',
    description: 'Registered Beauty routines where this products is used.  ',
    title: 'ROUTINES WHERE USED'
  },
])
const pricesMore = ref(false)
const menuActive = ref(false)
const menuNav = ref()
const componentKey = ref(0)
const activeSample = ref('LOOKFANTASTIC')

const meta = ref({ page: 1, take: 11, itemCount: 0, pageCount: 0 })
const product = reactive({} as Product)
const brand = ref<Brand | null>(null)
const prices = ref<Prices[]>([])
const routines = ref<BasicResponse<{routine: Routine}>>(emptyRes)
const alternatives = ref<BasicResponse<Product>>(emptyRes)

onMounted(() => {
  axios.get(`${API_URL}goods/byid/${route.params.id}`)
    .then(res => {
      Object.assign(product, res.data)
      componentKey.value++
      updateMeta({ title: res.data.SEOpageTitle, description: res.data.SEOpageDescription, keywords: res.data.SEOpageKeywords })

      axios.get(`${API_URL}brands/byname/${res.data.brand}?order=ASC&page=1&take=10`)
        .then(res => {
          brand.value = res.data.data[0]
        })
    })
  axios.get(`${API_URL}goods/alternative/${route.params.id}?order=ASC&page=1&take=${beauty ? 12 : 7}`)
    .then(res => {
      alternatives.value = res.data
    })
  axios.get(`${API_URL}prices/filtered?idGood=${route.params.id}&lattitude=1&longitude=19&order=ASC&page=1&take=10`)
    .then(res => {
      console.log(res.data.data)
      prices.value = res.data.data
    })
  axios.get(`${API_URL}routines/randomnumber/7?order=ASC&page=1&take=7`)
    .then(res => {
      meta.value = res.data.meta
      routines.value = res.data
      console.log(res.data)
    })
})

watch(route, () => {
  axios.get(`${API_URL}goods/byid/${route.params.id}`)
    .then(res => {
      Object.assign(product, res.data)
      componentKey.value++
      updateMeta({ title: res.data.SEOpageTitle, description: res.data.SEOpageDescription, keywords: res.data.SEOpageKeywords })

      axios.get(`${API_URL}brands/byname/${res.data.brandName}?order=ASC&page=1&take=10`)
        .then(res => {
          brand.value = res.data.data[0]
        })
    })
})
watch(menuActive, () => {
  window.addEventListener('click', shareClick)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', shareClick)
})

function shareClick (e: MouseEvent) {
  if (menuNav.value && !menuNav.value.parentElement.contains(e.target as Node)) {
    menuActive.value = false
  }
}

</script>

<template>
  <TheHeader />

  <div class="header__hint" :class="{active: store.state.showLater}">
    <button class="btn-black txt-highlight">GUIDE ME</button>
    <router-link
      v-for="link in links"
      :key="link.link"
      :to="`#${link.link}`"
      class="btn-black txt-highlight">{{link.link}}</router-link>
    <button @click="menuActive = !menuActive" class="btn-black btn-burger" :class="{active: menuActive}">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none">
        <symbol id="line" viewBox="0 0 150 1">
          <line y1="0.5" x2="150" y2="0.5"/>
        </symbol>
        <symbol id="circle" viewBox="0 0 182 182">
          <circle cx="91" cy="91" r="87.5"/>
        </symbol>
      </svg>
      <span></span>
      <svg class="circle">
        <use xlink:href="#circle"/>
      </svg>
    </button>
    <button class="btn-black">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.03283 1C1.43866 1 1 1.45279 1 1.95856V13.9591C1 14.8181 2.09567 15.3217 2.73888 14.7599L6.23104 11.3345L6.23996 11.3266C6.9875 10.6604 8.12872 10.6302 8.91299 11.2523L13.1598 14.6218H13.1608L13.2973 14.73C14.0048 15.2911 15 14.7724 15 14.0015V1.95856C15 1.45221 14.5607 1 13.9672 1H2.03283ZM0 1.95856C0 0.854735 0.933283 0 2.03283 0H13.9672C15.0652 0 16 0.853251 16 1.95856V14.0015C16 15.6384 14.1157 16.4708 12.8255 15.6218H12.8112L8.29153 12.0357C7.88934 11.7167 7.29671 11.7315 6.91336 12.066L3.42142 15.4911L3.41262 15.499C2.0979 16.6722 0 15.6474 0 13.9591V1.95856Z" fill="white"/>
      </svg>
    </button>
    <button class="btn-black">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8523 11.0225C16.0416 11.2005 16.0508 11.4983 15.8727 11.6877L11.4348 16.4065C11.2567 16.5958 10.9589 16.605 10.7696 16.4269C10.5802 16.2488 10.5711 15.951 10.7491 15.7617L15.1871 11.0429C15.3651 10.8536 15.663 10.8444 15.8523 11.0225Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.3653C0 11.1054 0.21069 10.8947 0.47059 10.8947H15.5295C15.7894 10.8947 16.0001 11.1054 16.0001 11.3653C16.0001 11.6252 15.7894 11.8359 15.5295 11.8359H0.47059C0.21069 11.8359 0 11.6252 0 11.3653Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23093 0.682475C5.42025 0.860531 5.42939 1.15835 5.25133 1.34768L0.813395 6.0665C0.635339 6.25582 0.337518 6.26496 0.148193 6.0869C-0.0411322 5.90885 -0.0502678 5.61103 0.127788 5.4217L4.56573 0.70288C4.74378 0.513555 5.0416 0.50442 5.23093 0.682475Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.74416C0 5.48426 0.21069 5.27357 0.47059 5.27357H15.5295C15.7894 5.27357 16.0001 5.48426 16.0001 5.74416C16.0001 6.00406 15.7894 6.21475 15.5295 6.21475H0.47059C0.21069 6.21475 0 6.00406 0 5.74416Z" fill="white"/>
      </svg>
    </button>
    <button class="btn-black">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.399 1.43749H9.3744V0.5H14.9994V6.12496H14.0619V2.1004L7.36213 8.80014L6.69922 8.13724L13.399 1.43749Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.34373 3.31249C1.56709 3.31249 0.937493 3.94209 0.937493 4.71873V13.1562C0.937493 13.9328 1.56709 14.5624 2.34373 14.5624H10.7812C11.5578 14.5624 12.1874 13.9328 12.1874 13.1562V9.4062C12.1874 9.14731 12.3973 8.93745 12.6562 8.93745C12.915 8.93745 13.1249 9.14731 13.1249 9.4062V13.1562C13.1249 14.4506 12.0756 15.4999 10.7812 15.4999H2.34373C1.04932 15.4999 0 14.4506 0 13.1562V4.71873C0 3.42432 1.04932 2.375 2.34373 2.375H6.0937C6.35259 2.375 6.56245 2.58486 6.56245 2.84375C6.56245 3.10263 6.35259 3.31249 6.0937 3.31249H2.34373Z" fill="white"/>
      </svg>
    </button>
    <button class="btn-black">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33167 0.5C11.1172 0.512682 14.1739 3.04315 14.8668 6.62848C15.6384 10.6267 12.9478 14.6001 8.95385 15.3581C7.24201 15.6835 5.60854 15.4477 4.05589 14.6674C4.0553 14.6672 4.05451 14.667 4.05351 14.6667C4.0483 14.6653 4.04027 14.6637 4.03014 14.6627C4.02006 14.6618 4.01023 14.6616 4.00171 14.6621C3.99758 14.6623 3.99424 14.6627 3.99179 14.663C3.99053 14.6632 3.98962 14.6634 3.98904 14.6635C3.58189 14.7656 3.18586 14.8723 2.78535 14.9802C2.49321 15.0589 2.19868 15.1382 1.89571 15.2169C1.89561 15.2169 1.89582 15.2169 1.89571 15.2169C1.20306 15.3971 0.484521 15.0457 0.287926 14.3214L0.287449 14.3196C0.225967 14.0895 0.226525 13.8294 0.284226 13.6019C0.28411 13.6023 0.283995 13.6028 0.28388 13.6032L0.738817 13.7162L0.28458 13.6005C0.284462 13.6009 0.284343 13.6014 0.284226 13.6019C0.458888 12.8985 0.649792 12.1993 0.84074 11.5054L0.840967 11.5045C0.848236 11.4783 0.847035 11.4687 0.846882 11.4675C0.846691 11.4657 0.845283 11.4527 0.829803 11.422C0.829906 11.4222 0.830009 11.4224 0.830112 11.4226L1.24791 11.21L0.829492 11.4213C0.829596 11.4216 0.8297 11.4218 0.829803 11.422C-1.34349 7.14906 0.921176 2.02308 5.54148 0.755665C6.17567 0.582342 6.82623 0.501632 7.32858 0.5L7.33167 0.5ZM7.3301 1.4375C6.91301 1.43902 6.34573 1.50778 5.78934 1.65981C1.74201 2.77014 -0.239146 7.25317 1.6657 10.9975L1.66632 10.9987C1.78741 11.2385 1.81913 11.485 1.74452 11.7545C1.55345 12.4489 1.36532 13.1382 1.19375 13.8292L1.19305 13.8319C1.17355 13.9085 1.17415 14.0057 1.19294 14.0767C1.24149 14.2539 1.41239 14.374 1.65976 14.3096C1.94281 14.2361 2.23282 14.158 2.52486 14.0794C2.93791 13.9682 3.35566 13.8557 3.76598 13.7529L3.77157 13.7515C3.98592 13.7006 4.25531 13.7189 4.47183 13.8272L4.47286 13.8277C5.84501 14.5183 7.27054 14.7238 8.7788 14.4371C12.2613 13.7762 14.6199 10.2967 13.9464 6.80637C13.3405 3.67121 10.677 1.4494 7.3301 1.4375Z" fill="white"/>
        <path d="M10.7892 8.79804C10.5653 8.79804 10.3787 8.72336 10.2279 8.57102C10.0771 8.42017 10.001 8.23348 10.001 8.00945C10.001 7.78541 10.0756 7.59872 10.2279 7.44787C10.3787 7.29702 10.5653 7.22085 10.7892 7.22085C11.0132 7.22085 11.1998 7.29553 11.3506 7.44787C11.5014 7.59872 11.5775 7.78541 11.5775 8.00945C11.5775 8.23348 11.5029 8.42017 11.3506 8.57102C11.1998 8.72187 11.0132 8.79804 10.7892 8.79804Z" fill="white"/>
        <path d="M4.20843 8.75169C3.98449 8.75169 3.79788 8.67701 3.64709 8.52467C3.4963 8.37382 3.42017 8.18713 3.42017 7.9631C3.42017 7.73907 3.49481 7.55237 3.64709 7.40152C3.79788 7.25067 3.98449 7.1745 4.20843 7.1745C4.43237 7.1745 4.61899 7.24918 4.76977 7.40152C4.92056 7.55237 4.9967 7.73907 4.9967 7.9631C4.9967 8.18713 4.92205 8.37382 4.76977 8.52467C4.61899 8.67552 4.43237 8.75169 4.20843 8.75169Z" fill="white"/>
        <path d="M7.42376 8.82482C7.19983 8.82482 7.01321 8.75014 6.86242 8.5978C6.71164 8.44695 6.6355 8.26026 6.6355 8.03622C6.6355 7.81219 6.71014 7.6255 6.86242 7.47465C7.01321 7.3238 7.19983 7.24763 7.42376 7.24763C7.6477 7.24763 7.83432 7.32231 7.98511 7.47465C8.13589 7.6255 8.21203 7.81219 8.21203 8.03622C8.21203 8.26026 8.13739 8.44695 7.98511 8.5978C7.83432 8.74865 7.6477 8.82482 7.42376 8.82482Z" fill="white"/>
      </svg>
    </button>
    <div class="header__hint__menu" ref="menuNav" :class="{active: menuActive}">
      <button class="btn-black txt-highlight" @click="menuActive = false">GUIDE ME</button>
      <router-link
        v-for="link in links"
        :key="link.link"
        :to="`#${link.link}`"
        @click="menuActive = false"
        class="btn-black txt-highlight"
      >
        {{link.link}}
      </router-link>
    </div>
  </div>

  <main v-if="Object.keys(product).length">
    <div class="main-inner d-center">
      <div>
        <p>{{ product.brand }}</p>
        <h4>{{ product.name }}</h4>
        <img :src="`${API_URL}images/getimage/${product.mainPicture}`" :alt="product.SEOmainImageAlt">
        <div class="buttons" v-if="beauty">
          <button class="btn-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.03283 1C1.43866 1 1 1.45279 1 1.95856V13.9591C1 14.8181 2.09567 15.3217 2.73888 14.7599L6.23104 11.3345L6.23996 11.3266C6.9875 10.6604 8.12872 10.6302 8.91299 11.2523L13.1598 14.6218H13.1608L13.2973 14.73C14.0048 15.2911 15 14.7724 15 14.0015V1.95856C15 1.45221 14.5607 1 13.9672 1H2.03283ZM0 1.95856C0 0.854735 0.933283 0 2.03283 0H13.9672C15.0652 0 16 0.853251 16 1.95856V14.0015C16 15.6384 14.1157 16.4708 12.8255 15.6218H12.8112L8.29153 12.0357C7.88934 11.7167 7.29671 11.7315 6.91336 12.066L3.42142 15.4911L3.41262 15.499C2.0979 16.6722 0 15.6474 0 13.9591V1.95856Z" fill="white"/>
            </svg>
          </button>
          <button class="btn-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8523 10.4678C16.0416 10.6458 16.0508 10.9437 15.8727 11.133L11.4348 15.8518C11.2567 16.0411 10.9589 16.0503 10.7696 15.8722C10.5802 15.6942 10.5711 15.3963 10.7491 15.207L15.1871 10.4882C15.3651 10.2989 15.663 10.2897 15.8523 10.4678Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.8106C0 10.5507 0.21069 10.34 0.47059 10.34H15.5295C15.7894 10.34 16.0001 10.5507 16.0001 10.8106C16.0001 11.0705 15.7894 11.2812 15.5295 11.2812H0.47059C0.21069 11.2812 0 11.0705 0 10.8106Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23093 0.127788C5.42025 0.305844 5.42939 0.603665 5.25133 0.79299L0.813395 5.51181C0.635339 5.70114 0.337518 5.71027 0.148193 5.53222C-0.0411322 5.35416 -0.0502678 5.05634 0.127788 4.86701L4.56573 0.148193C4.74378 -0.0411322 5.0416 -0.0502677 5.23093 0.127788Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.18947C0 4.92957 0.21069 4.71888 0.47059 4.71888H15.5295C15.7894 4.71888 16.0001 4.92957 16.0001 5.18947C16.0001 5.44937 15.7894 5.66006 15.5295 5.66006H0.47059C0.21069 5.66006 0 5.44937 0 5.18947Z" fill="white"/>
            </svg>
          </button>
          <button class="btn-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.399 1.43749H9.3744V0.5H14.9994V6.12496H14.0619V2.1004L7.36213 8.80014L6.69922 8.13724L13.399 1.43749Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.34373 3.31249C1.56709 3.31249 0.937493 3.94209 0.937493 4.71873V13.1562C0.937493 13.9328 1.56709 14.5624 2.34373 14.5624H10.7812C11.5578 14.5624 12.1874 13.9328 12.1874 13.1562V9.4062C12.1874 9.14731 12.3973 8.93745 12.6562 8.93745C12.915 8.93745 13.1249 9.14731 13.1249 9.4062V13.1562C13.1249 14.4506 12.0756 15.4999 10.7812 15.4999H2.34373C1.04932 15.4999 0 14.4506 0 13.1562V4.71873C0 3.42432 1.04932 2.375 2.34373 2.375H6.0937C6.35259 2.375 6.56245 2.58486 6.56245 2.84375C6.56245 3.10263 6.35259 3.31249 6.0937 3.31249H2.34373Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="main-links">
      <div
        v-for="link in links"
        :key="link.link"
        class="main-links-item"
        @click="router.push(`#${link.link}`)">
        <h3>{{ link.title }}</h3>
        <p class="txt">{{ link.description }}</p>
      </div>
    </div>
  </main>

  <section class="brand bg-img" v-if="brand">
    <img v-if="brand.brandLogo" :src="`${API_URL}images/getimage/${brand.brandLogo}`" :alt="brand.SEOlogoAlt">
    <h2 class="title-secondary bold">{{brand.brandName}}</h2>
    <p class="txt" v-if="brand.brandDescription">
      {{ brand.brandDescription }}
    </p>
    <router-link :to="`/product-results/brand/${brand.brandName}`" class="link bold">MORE ABOUT BRAND <span>→</span></router-link>
  </section>

  <SingleProductSlide
    v-if="Object.keys(product).length"
    @modal-active="store.commit('updateModalSubscribe', true)"
    :component-key="componentKey"
    :product="product"/>

  <TheReviews />

  <section id="prices" class="prices" v-if="prices.length">
    <div class="prices__text">
      <h2 class="section-title">Prices</h2>
      <div class="section-subtitle">
        <h3>46</h3>
        <p>
          For Natures Leafs Argan Oil
          in Moscow, Russian Federation
        </p>
      </div>
    </div>
    <div class="prices__inner">
      <div class="prices__inner__content">
        <div
          v-for="price in prices.slice(0, 3)"
          :key="price.id"
          class="prices__inner__content__item d-sb">
          <a class="link bold" target="_blank" :href="price.priceGoodLink">{{price.priceShopName}} <span>→</span></a>
          <p class="txt-highlight">{{price.priceValue}} euro</p>
        </div>
      </div>
      <button @click="store.commit('updateModalSubscribe', true)" class="link bg-orange">CHECK YOUR SKIN TYPE REVIEWS <span>→</span></button>
    </div>
    <div v-if="store.state.beauty" class="prices-more" :class="{ active: pricesMore }">
      <div class="prices__inner">
        <div
          v-for="price in prices"
          :key="price.id"
          class="prices__inner-item d-sb">
          <router-link class="link bold" :to="price.priceGoodLink">{{price.priceShopName}} <span>→</span></router-link>
          <p class="txt-highlight">{{price.priceValue}} euro</p>
        </div>
        <div class="prices__inner-item d-sb">
          <router-link class="link bold" to="#">lookfantastic <span>→</span></router-link>
          <p class="txt-highlight">32,00 euro</p>
        </div>
        <div class="prices__inner-item d-sb">
          <router-link class="link bold" to="#">lookfantastic <span>→</span></router-link>
          <p class="txt-highlight">32,00 euro</p>
        </div>
        <div class="prices__inner-item d-sb">
          <router-link class="link bold" to="#">lookfantastic <span>→</span></router-link>
          <p class="txt-highlight">32,00 euro</p>
        </div>
      </div>
      <button class="btn-close" @click="pricesMore = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </section>

  <section id="services" class="services">
    <div class="services__top">
      <h2 class="section-title">Available services</h2>
      <p class="txt">These services are available  for Natural Leaf Argan Oil for all skin profiles directly from Brand or connected Retailers in the area around you.  Services available for Your skin profile can be seen only after login.</p>
    </div>
    <div class="services__inner">
      <div
        class="services-card"
        v-for="service in services"
        :key="service.title">
        <div class="bg-img" :style="{backgroundImage: `url('${require(`@/assets/img/${service.backgroundUrl}`)}')`}"></div>
        <div class="services-card__content">
          <h2>{{service.title}}</h2>
          <p class="txt">{{service.text}}</p>
          <img v-if="service.qrCode" src="@/assets/img/global/qr.png" alt="qr-code">
        </div>
        <router-link :to="service.link" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
    </div>
  </section>

  <section id="alternatives" class="products" v-if="alternatives.data.length">
    <div class="products__top">
      <h2 class="section-title">Alternatives</h2>
      <div class="section-subtitle">
        <h3>12</h3>
        <p>Alternative products are available for Argan Oil</p>
      </div>
      <p class="txt">These Alternative Products for Natural Leafs Argan Oil are selected based on the generic skin type claims only without any filtration based on skin individual specifics. To see detailed alternative products based on ingredients used and personalised recommendation you should login.</p>
    </div>
    <div class="product-list">
      <ProductCard v-for="product in alternatives.data" :key="product.id" :product="product" />
      <div v-if="!beauty" class="product-item bg-orange center">
        <router-link to="#" class="link bold bg-orange">SEE MORE ALTERNATIVE PRODUCTS <span>→</span></router-link>
      </div>
    </div>
    <ThePagination v-if="alternatives.meta.pageCount > 1" :meta="alternatives.meta" />
  </section>

  <section v-if="beauty" id="free-samples" class="samples">
    <h3 class="section-title">Free samples</h3>
    <div class="samples__buttons">
      <a
        v-for="sample in samples"
        :key="sample.title"
        @mouseenter="activeSample = sample.title"
        class="link"
        :class="{ active: activeSample === sample.title }"
      >
        {{ sample.title }}
        <span>→</span>
      </a>
    </div>
    <div>
      <div class="samples__text" v-for="sample in samples" :key="sample.title">
        <Transition name="tab">
          <div v-if="activeSample === sample.title">
            <p class="text bold">{{ sample.title }}</p>
            <p class="text">{{ sample.text }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </section>

  <section id="routines" class="routines" v-if="routines.data.length">
    <div class="routines__top">
      <h2 class="section-title">Routines</h2>
      <div class="section-subtitle">
        <h3>130</h3>
        <p>Beautyties are using this product in their registered routines</p>
      </div>
      <p class="txt">Beauty Routines where Natural Leaf Argon Oil is used as part of the ritual. These Routines are selected based on the general use without any skin type or skin specifics filtration. To see personalised routines recommendation You should login.  </p>
    </div>
    <div class="routines__list">
      <RoutineCard v-for="routine in routines.data" :routine="routine.routine" :key="routine.routine.id" />
      <div v-if="!beauty" class="routine-item center bg-orange min-tablet">
        <router-link to="#" class="link bold">SEE MORE ROUTINES <span>→</span></router-link>
      </div>
    </div>
    <ThePagination v-if="routines.meta.pageCount > 1" :meta="routines.meta" />
    <router-link v-if="!beauty" to="#" class="link bold tablet bg-orange">SEE MORE ROUTINES <span>→</span></router-link>
  </section>

  <AiAssistance v-if="!store.state.beauty" />

  <BaseSubscripe />

  <TheFooter />

</template>

<style lang="scss" scoped>
.header__hint {

  &__menu {
    top: calc(100% + 1px);
    position: absolute;
    left: 0;
    padding: 0 20px;
    right: 0;
    display: grid;
    max-height: 0;
    overflow: hidden;
    transition: .3s;

    &.active {
      max-height: 1000px;
    }
    .txt-highlight {
      text-align: left;
    }

    @media (min-width: 769px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    right: 0;
    left: 0;
    width: 100%;
    padding: 0 20px;

    > .txt-highlight {
      display: none;
    }
  }
}

main {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr;

  .main-inner {
    background-color: $orange;
    text-align: center;
    padding: 60px;

    > div {
      position: relative;
      padding: 20px;
      justify-content: center;
      background-color: $white;
      width: 100%;
      height: 100%;

      img {
        align-self: center;
        justify-self: center;
        max-width: 80%;
        max-height: 686px;

        @media (max-width: 1440px) {
          max-height: 400px;
        }
        @media (max-width: 480px) {
          max-height: 300px;
        }
      }

      p {
        font-family: 'PT Root UI', serif;
        text-transform: uppercase;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        padding-bottom: 10px;
      }

      h4 {
        font-family: 'PT Root UI', serif;
        font-size: 46px;
        font-weight: 700;
        padding-bottom: 20px;

        @media (max-width: 1200px) {
          font-size: 36px;
        }
        @media (max-width: 1000px) {
          font-size: 36px;
        }
        @media (max-width: 480px) {
          font-size: 24px;
        }
      }
      .buttons {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        gap: 2px;
      }
    }

    @media (max-width: 1200px) {
      padding: 40px;
    }
    @media (max-width: 768px) {
      padding: 40px;
    }
    @media (max-width: 480px) {
      padding: 20px;
    }
  }

  .main-links {
    height: 100%;
    display: grid;

    &-item {
      cursor: pointer;
      padding: 30px 50px;

      &:not(:last-child) {
        border-bottom: 1px solid $black;
      }
      h3 {
        font-weight: 500;
        font-size: 32px;
        text-transform: uppercase;

        @media (max-width: 1200px) {
          font-weight: 700;
        }
        @media (max-width: 1000px) {
          font-size: 24px;
        }
      }
      p {
        color: $black;
        padding-top: 20px;

        @media (max-width: 1200px) {
          padding-top: 10px;
        }
        @media (max-width: 480px) {
          display: none;
        }
      }

      @media (max-width: 1340px) {
        padding: 20px 40px;
      }
      @media (max-width: 1200px) {
        padding: 20px;
      }
      @media (max-width: 480px) {
        padding: 16px 20px;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}

.brand {
  background-image: url("@/assets/img/global/bg.jpg");
  padding: 60px;
  text-align: center;

  p {
    padding: 60px 0;

    @media (max-width: 768px) {
      padding: 40px 0;
    }
    @media (max-width: 480px) {
      padding: 16px 0;
    }
  }

  img {
    max-width: 200px;
    max-height: 150px;
    @media (max-width: 768px) {
      max-width: 180px;
    }
    @media (max-width: 480px) {
      max-width: 120px;
    }
  }
}

.prices {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border-bottom: 1px solid $black;

  &__text {
    padding: 100px 60px;
    border-right: 1px solid $black;

    @media (max-width: 1200px) {
      padding: 60px 20px;
    }
    @media (max-width: 768px) {
      padding: 20px;
    }
  }

  &__inner {
    display: grid;
    grid-template-rows: 1fr auto;

    &__content {
      padding: 60px;
      display: grid;
      justify-content: center;
      align-items: center;

      &__item {
        border-bottom: 1px solid $black;
        gap: 40px;

        padding: 40px 10px;

        @media (max-width: 1000px) {
          padding: 20px 0;
        }
        @media (max-width: 768px) {
          .txt-highlight {
            font-weight: 400;
          }
        }
      }
      @media (max-width: 1200px) {
        padding: 60px 20px;
      }
      @media (max-width: 1000px) {
        justify-content: stretch;
      }
      @media (max-width: 768px) {
        padding: 0 20px 60px;
      }
    }
  }

  &-more {
    padding: 60px;
    grid-column: 1 / 3;
    display: flex;
    justify-content: space-between;
    top: 0;
    bottom: 0;
    position: absolute;
    transition: .3s;
    background: $white;
    left: 100%;
    width: 100%;

    &.active {
      left: 0;
    }

    .prices__inner {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: space-between;
      width: 100%;
      gap: 30px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      grid-column: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 30px 0 0;
    grid-template-columns: 1fr;
    gap: 20px;
    grid-template-rows: auto auto;
    border-bottom: none;
  }
}

.services {
  padding-top: 200px;

  &__top {
    padding: 0 20px 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
  }
  &__inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    padding-top: 20px;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 768px) {
    padding-top: 60px;
  }
}

.products {
  padding-top: 200px;

  &__top {
    padding: 0 40px 40px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;

    .section-title {
      @media (max-width: 1200px) {
        grid-column: 1 / 3;
      }
    }
    .section-subtitle {
      grid-column: 1;
      grid-row: 2;

      @media (max-width: 768px) {
        grid-column: 1 / 3;
      }
    }
    .txt {
      grid-column: 2;
      grid-row: 1 / 3;

      @media (max-width: 1200px) {
        grid-row: 2;
        grid-column: 2;
      }
      @media (max-width: 768px) {
        grid-row: 3;
        grid-column: 1 / 3;
      }
    }
    @media (max-width: 1200px) {
      padding: 0 20px 40px;
    }
  }
  @media (max-width: 1200px) {
    padding-top: 50px;
  }
}

.samples {
  padding: 150px 60px;
  border-bottom: 1px solid $black;

  &__buttons {
    display: grid;
    grid-template-columns: 1fr;
    border-bottom: 1px solid $black;
    justify-items: right;
    margin: 0 50px;

    a {
      min-width: 500px;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 32px;
      padding: 20px 0;
      text-align: left;
      transition: .3s;

      &.active {
        color: $orange;
      }

      &:not(:last-child) {
        border-bottom: 1px solid $black;
      }
    }
    @media (max-width: 768px) {
      margin: 0;
    }
  }

  &__text {
    margin: 0 50px;
    p {
      padding: 20px 0 0;
    }

    @media (max-width: 768px) {
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
}

.routines {
  padding-top: 200px;

  &__top {
    padding: 0 40px 40px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;

    .section-title {
      @media (max-width: 1200px) {
        grid-column: 1 / 3;
      }
    }
    .section-subtitle {
      grid-column: 1;
      grid-row: 2;

      @media (max-width: 768px) {
        grid-column: 1 / 3;
      }
    }
    .txt {
      grid-column: 2;
      grid-row: 1 / 3;

      @media (max-width: 1200px) {
        grid-row: 2;
        grid-column: 2;
      }
      @media (max-width: 768px) {
        grid-row: 3;
        grid-column: 1 / 3;
      }
    }
    @media (max-width: 1200px) {
      grid-row-gap: 0;
      padding: 0 20px 40px;
    }
  }
  .link.tablet {
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }
  @media (max-width: 1000px) {
    padding-top: 60px;
  }
}
</style>
