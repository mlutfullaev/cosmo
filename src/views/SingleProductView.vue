<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Product, Review, Routine } from '@/interfaces'
import store from '@/store'
import axios from 'axios'
import ProductCard from '@/components/ProductCard.vue'
import AiAssistance from '@/components/AiAssistance.vue'
import RoutineGuide from '@/components/RoutineGuide.vue'
import RoutineCard from '@/components/RoutineCard.vue'
import TheFilter from '@/layouts/TheFilter.vue'
import ReligionDiets from '@/components/ReligionDiets.vue'
import BaseRate from '@/components/BaseRate.vue'
import BaseReviews from '@/components/BaseReviews.vue'
import SingleProductSlide from '@/components/SingleProductSlide.vue'
import ThePagination from '@/layouts/ThePagination.vue'
import { useHelpers } from '../useHelpers'
import BaseSubscripe from '@/components/BaseSubscripe.vue'
import ModalSubscribe from '@/components/ModalSubscribe.vue'
import BaseHint from '@/components/BaseHint.vue'

interface Prices {
  id: number,
  priceValue: number,
  priceShopName: string,
  priceGoodLink: string,
}

const route = useRoute()
const { updateMeta } = useHelpers()

const links = ref([
  {
    link: 'full-details',
    description: 'Details this product in table and full details from brand.',
    title: 'FULL PRODUCT DETAILS'
  },
  {
    link: 'services',
    description: 'SERVICES AND OFFERINGS FOR THIS PRODUCT',
    title: 'AVAILABLE SERVICES'
  },
  {
    link: 'reviews',
    description: 'REVIEWS and YOUR SKINTWINS EXPERIENCES WITH THIS PRODUCT',
    title: 'REVIEWS'
  },
  {
    link: 'alternatives',
    description: 'alternative products based on ingredients and targeted concerns.',
    title: 'ALTERNATIVES'
  },
  {
    link: 'routine',
    description: 'registered Beauty routines where this products is used.  ',
    title: 'ROUTINES WHERE USED'
  },
])
const beauty = store.state.beauty
const pricesMore = ref(false)
const routines = ref<{routine: Routine}[]>([])
const modalActive = ref(false)

const meta = ref({ page: 1, take: 11, itemCount: 0, pageCount: 0 })
const prices = ref<Prices[]>([])
const product = ref<null | Product>(null)
const alternatives = ref<Product[]>([])
const reviews = ref<Review[]>([])

onMounted(() => {
  axios.get(`https://api-www.beautyid.app/goods/byid/${route.params.id}`)
    .then(res => {
      product.value = res.data
      updateMeta({ title: res.data.SEOpageTitle, description: res.data.SEOpageDescription, keywords: res.data.SEOpageKeywords })
    })
  axios.get(`https://api-www.beautyid.app/goods/alternative/${route.params.id}?order=ASC&page=1&take=7`)
    .then(res => {
      alternatives.value = res.data.data
    })
  axios.get(`https://api-www.beautyid.app/reviews/?order=ASC&page=1&take=${beauty ? 10 : 2}`)
    .then(res => {
      reviews.value = res.data.data
    })
  axios.get(`https://api-www.beautyid.app/prices/filtered?idGood=${route.params.id}&lattitude=1&longitude=19&order=ASC&page=1&take=10`)
    .then(res => {
      prices.value = res.data.data
    })
  axios.get('https://api-www.beautyid.app/routines/randomnumber/7?order=ASC&page=1&take=7')
    .then(res => {
      meta.value = res.data.meta
      routines.value = res.data.data
    })
})

watch(route, () => {
  axios.get(`https://api-www.beautyid.app/goods/byid/${route.params.id}`)
    .then(res => {
      product.value = res.data
      updateMeta({ title: res.data.SEOpageTitle, description: res.data.SEOpageDescription, keywords: res.data.SEOpageKeywords })
    })
})

watch(meta.value, () => {
  console.log(meta.value)
})
const checkBeauty = () => {
  store.commit('checkBeauty')
}
</script>

<template>
  <TheHeader />

  <main v-if="product">
    <div class="main-inner d-center">
      <div>
        <p>{{ product.brand }}</p>
        <h4>{{ product.name }}</h4>
        <img :src="`https://api-www.beautyid.app/images/getimage/${product.mainPicture}`" :alt="product.SEOmainImageAlt">
      </div>
    </div>
    <div class="main-links">
      <div v-for="link in links" :key="link.link" class="main-links-item">
        <RouterLink :to="`#${link.link}`" class="link">{{ link.title }}</RouterLink>
        <p class="txt t-up">{{ link.description }}</p>
      </div>
    </div>
  </main>

  <religion-diets
    v-if="product"
    :brand-name="product.brand"
    :bg="beauty ? 'claims-bg-beauty.png' : 'claims-bg.jpg'" />
  <SingleProductSlide v-if="product" :product="product"/>

  <section id="reviews" class="reviews" v-if="!store.state.beauty">
    <div class="reviews__text">
      <div class="reviews__text__content">
        <div class="hint-content">
          <h2 class="section-title">Reviews </h2>
          <BaseHint hint="lalalalalalallalallalalalalalalalalal" />
        </div>
        <h2 class="section-title black">4.7/5</h2>
        <BaseRate :rates="4.5"/>
        <div class="section-subtitle">
          <h3>126</h3>
          <p>Beauties Reviewed leafs argan oil</p>
        </div>
      </div>
      <button @click="modalActive = true" class="link bg-orange">CHECK YOUR SKIN TYPE REVIEWS <span>→</span></button>
    </div>
    <div class="reviews__picture bg-img">
      <h3 class="title">Check your SkinTwins experiences with Argan Oil</h3>
    </div>
  </section>

<!--  <section id="reviews" class="reviews reviews&#45;&#45;beauty" v-else>-->
<!--    <div class="reviews&#45;&#45;beauty__left bg-img">-->
<!--      <h3 class="title">Reviews</h3>-->
<!--      <div class="rating">-->
<!--        <h5 class="title">4.7/5</h5>-->
<!--        <BaseRate :rates="4.5" :text="true"/>-->
<!--      </div>-->
<!--    </div>-->
<!--    <BaseReviews :reviews="reviews" :text="true" />-->
<!--    <router-link to="#" class="tablet link bold tablet-orange">discover more <span>→</span></router-link>-->
<!--  </section>-->

  <section id="prices" class="prices">
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
          <router-link class="link bold" :to="price.priceGoodLink">{{price.priceShopName}} <span>→</span></router-link>
          <p class="txt-highlight">{{price.priceValue}} euro</p>
        </div>
        <div class="prices__inner__content__item d-sb">
          <router-link class="link bold" to="#">lookfantastic <span>→</span></router-link>
          <p class="txt-highlight">32,00 euro</p>
        </div>
        <div class="prices__inner__content__item d-sb">
          <router-link class="link bold" to="#">lookfantastic <span>→</span></router-link>
          <p class="txt-highlight">32,00 euro</p>
        </div>
        <div class="prices__inner__content__item d-sb">
          <router-link class="link bold" to="#">lookfantastic <span>→</span></router-link>
          <p class="txt-highlight">32,00 euro</p>
        </div>
      </div>
      <button @click="modalActive = true" class="link bg-orange">CHECK YOUR SKIN TYPE REVIEWS <span>→</span></button>
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
      <button class="alert-close" @click="pricesMore = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z"
                stroke="black" stroke-linecap="round" stroke-linejoin="round" />
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
      <div class="services-card">
        <div class="bg-img" :style="{backgroundImage: `url('${require('@/assets/img/product/sample-banner-1.png')}')`}"></div>
        <div class="services-card__content">
          <h2 class="title-secondary bold">YOUR REVIEW MATTERS</h2>
          <p class="txt">Let Your SkinTwins know Your Experience with this product.</p>
        </div>
        <router-link to="#" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
      <div class="services-card">
        <div class="bg-img" :style="{backgroundImage: `url('${require('@/assets/img/product/sample-banner-3.png')}')`}"></div>
        <div class="services-card__content">
          <h2 class="title-secondary bold">SAMPLES FOR HONEST REVIEW</h2>
          <p class="txt">Get involved into New Product Review as qualified Tester</p>
        </div>
        <router-link to="#" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
      <div class="services-card">
        <div class="bg-img" :style="{backgroundImage: `url('${require('@/assets/img/product/sample-banner-5.png')}')`}"></div>
        <div class="services-card__content">
          <h2 class="title-secondary bold">SPEAK OUT DIRECTLY TO THE BRAND</h2>
          <p class="txt">Direct line to pass Your Suggestions about this product to Brand.  We connect you with benefits Brand is ready to give in exchange to valuable suggestions.</p>
        </div>
        <router-link to="#" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
      <div class="services-card">
        <div class="bg-img" :style="{backgroundImage: `url('${require('@/assets/img/product/sample-banner-7.png')}')`}"></div>
        <div class="services-card__content">
          <h2 class="title-secondary bold">BEAUTYMETER</h2>
          <p class="txt">Track Your Skin developments to evaluate efficiency of this product.</p>
        </div>
        <router-link to="#" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
      <div class="services-card">
        <div class="bg-img" :style="{backgroundImage: `url('${require('@/assets/img/product/sample-banner-2.png')}')`}"></div>
        <div class="services-card__content">
          <h2 class="title-secondary bold">QUICK TRY WITH TESTERS</h2>
          <p class="txt">Testing Samples for You are available in your area</p>
        </div>
        <router-link to="#" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
      <div class="services-card">
        <div class="bg-img" :style="{backgroundImage: `url('${require('@/assets/img/product/sample-banner-4.jpg')}')`}"></div>
        <div class="services-card__content">
          <h2 class="title-secondary bold">EXPIRY DATE CHECK</h2>
          <p class="txt">Scan Barcode and check expiry date</p>
          <img src="@/assets/img/global/qr.png" alt="qr-code">
        </div>
        <router-link to="#" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
      <div class="services-card">
        <div class="bg-img" :style="{backgroundImage: `url('${require('@/assets/img/product/sample-banner-6.png')}')`}"></div>
        <div class="services-card__content">
          <h2 class="title-secondary bold"> VIRTUAL DERMATOLOGIST SUPPORT</h2>
          <p class="txt">Video call support by DermoTeam is available related to this product.</p>
        </div>
        <router-link to="#" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
      <div class="services-card">
        <div class="bg-img" :style="{backgroundImage: `url('${require('@/assets/img/product/sample-banner-8.png')}')`}"></div>
        <div class="services-card__content">
          <h2 class="title-secondary bold">SAVE IT TO YOUR LIBRARY</h2>
          <p class="txt">Scan QR code and safe this product for future into Your Personal Library</p>
        </div>
        <router-link to="#" class="link">
          <span>
            <svg width="68" height="44" viewBox="0 0 68 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.224609 20.2436H60.3206L40.9286 0.851562H46.4966L68.0006 22.3556L46.4966 43.8596H40.9286L60.3206 24.4676H0.224609V20.2436Z" fill="black"/>
            </svg>
          </span>
        </router-link>
      </div>
    </div>
  </section>

  <section class="products" v-if="alternatives.length">
    <div class="products__top">
      <div>
        <h2 class="section-title">Alternatives</h2>
        <div class="section-subtitle">
          <h3>12</h3>
          <p>Alternative products are available for Argan Oil</p>
        </div>
      </div>
      <p class="txt">These Alternative Products for Natural Leafs Argan Oil are selected based on the generic skin type claims only without any filtration based on skin individual specifics. To see detailed alternative products based on ingredients used and personalised recommendation you should login.</p>
    </div>
    <div class="product-list">
      <ProductCard v-for="product in alternatives" :key="product.id" :product="product" />
      <div class="product-item bg-orange center">
        <router-link to="#" class="link bold bg-orange">SEE MORE ALTERNATIVE PRODUCTS <span>→</span></router-link>
      </div>
    </div>
  </section>

  <section id="routine" class="routines" v-if="routines.length">
    <div class="routines__top">
      <div>
        <h2 class="section-title">Routines</h2>
        <div class="section-subtitle">
          <h3>130</h3>
          <p>Beautyties are using this product in their registered routines</p>
        </div>
      </div>
      <p class="txt">Beauty Routines where Natural Leaf Argon Oil is used as part of the ritual. These Routines are selected based on the general use without any skin type or skin specifics filtration. To see personalised routines recommendation You should login.  </p>
    </div>
    <div class="routines__list">
      <RoutineCard v-for="routine in routines" :routine="routine.routine" :key="routine.routine.id" />
      <div class="routine-item center bg-orange">
        <router-link to="#" class="link bold bg-orange">SEE MORE ROUTINES <span>→</span></router-link>
      </div>
    </div>
  </section>

  <AiAssistance v-if="!store.state.beauty" />

  <BaseSubscripe />

  <div class="modal" :class="{active: modalActive}" @click="modalActive = false">
    <ModalSubscribe :active="modalActive" />
  </div>

  <div class="sidebar">
    <div class="sidebar-item">
      <a href="#full-details" class="txt-highlight">FULL DETAILS OF THIS PRODUCT</a>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>
          <path d="M15.8483 8.13159C15.4254 8.13159 15.0743 7.98415 14.7891 7.69121C14.5039 7.39827 14.3623 7.03356 14.3623 6.599C14.3623 6.16444 14.5039 5.79972 14.7891 5.50678C15.0743 5.21385 15.4274 5.06641 15.8483 5.06641C16.2693 5.06641 16.6224 5.21385 16.9076 5.50678C17.1927 5.79972 17.3344 6.16444 17.3344 6.599C17.3344 7.03356 17.1927 7.39827 16.9076 7.69121C16.6224 7.98415 16.2693 8.13159 15.8483 8.13159ZM14.8046 11.0028H16.8921V27.3123H14.8046V11.0008V11.0028Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <a href="#prices" class="txt-highlight">PRICES NEAR YOU</a>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="32" viewBox="0 0 29 32" fill="none">
          <path d="M17.6347 22.4179C23.273 22.4179 27.8437 17.8472 27.8437 12.209C27.8437 6.57071 23.273 2 17.6347 2C11.9965 2 7.42578 6.57071 7.42578 12.209C7.42578 17.8472 11.9965 22.4179 17.6347 22.4179Z" fill="#FF8A00" stroke="currentColor" stroke-width="2.07" stroke-miterlimit="10"/>
          <path d="M0.986943 29.4791L8.20915 21.3839C8.59277 20.9533 9.25823 20.9181 9.69666 21.3096L9.90021 21.4896C10.3386 21.8811 10.3778 22.5465 9.99416 22.9771L2.77194 31.0723C2.38833 31.5029 1.72286 31.5381 1.28444 31.1466L1.08089 30.9666C0.642469 30.5751 0.603324 29.9097 0.986943 29.4791Z" fill="currentColor"/>
          <path d="M1.40536 29.8946C3.69924 27.3267 5.98921 24.7548 8.2831 22.1869C8.3927 22.0656 8.49839 21.9286 8.61583 21.8151C8.95247 21.4941 9.50833 21.7055 9.64533 22.1439C9.78234 22.5823 9.12471 23.0677 8.88593 23.3417L4.66612 28.0704L2.70105 30.2743C2.58753 30.3995 2.48184 30.5404 2.36049 30.654C1.91033 31.0806 0.998252 30.4152 1.40536 29.8985C1.86727 29.3113 1.04131 28.4697 0.571574 29.0647C-0.023427 29.8202 0.0118033 30.7871 0.735982 31.4486C1.37013 32.024 2.24697 32.2276 2.97506 31.6756C3.43697 31.3233 3.80102 30.8027 4.18464 30.3721C5.81306 28.548 7.43757 26.7238 9.06599 24.8997C9.50441 24.4065 9.96241 23.9211 10.3891 23.4161C10.8549 22.8602 11.0076 22.093 10.6122 21.4471C10.2168 20.8012 9.37915 20.2963 8.59234 20.4998C7.91122 20.676 7.46497 21.3414 7.01872 21.8425L4.73266 24.4025C3.34694 25.9566 1.96121 27.5106 0.571574 29.0647C0.0705205 29.6284 0.896475 30.4622 1.40536 29.8985V29.8946Z" fill="currentColor"/>
          <path d="M16.9893 17.6931C15.9324 17.5991 15.1378 17.2625 14.6093 16.6753C14.0809 16.0881 13.7794 15.2426 13.709 14.1348H15.2513C15.3139 14.812 15.4783 15.3209 15.7523 15.6615C16.0224 16.002 16.4374 16.2095 16.9932 16.2917V12.6121C16.6018 12.5103 16.2221 12.3851 15.8463 12.2441C15.4705 12.0993 15.1378 11.9192 14.8442 11.6961C14.5506 11.4769 14.3157 11.199 14.1357 10.8662C13.9556 10.5335 13.8656 10.1186 13.8656 9.62534C13.8656 8.86594 14.1278 8.22005 14.6524 7.68376C15.1769 7.15139 15.9559 6.83041 16.9932 6.72863V5.28027H18.2889V6.72863C19.3145 6.82258 20.0739 7.14356 20.5671 7.69159C21.0604 8.23962 21.3422 9.00294 21.4127 9.97765H19.8704C19.7999 9.42179 19.6472 8.99903 19.4163 8.69761C19.1853 8.40011 18.8095 8.2083 18.285 8.1261V11.5004C18.6843 11.6139 19.0796 11.7392 19.4711 11.8762C19.8625 12.0132 20.2109 12.2011 20.528 12.4399C20.8412 12.6747 21.0917 12.9722 21.2835 13.3245C21.4714 13.6768 21.5693 14.1231 21.5693 14.6554C21.5693 15.4775 21.2992 16.1664 20.759 16.7184C20.2188 17.2742 19.3967 17.5952 18.285 17.6892V19.1375H16.9893V17.6892V17.6931ZM15.3726 9.62143C15.3726 10.0442 15.5253 10.3652 15.8345 10.5922C16.1438 10.8193 16.5274 11.0032 16.9893 11.1481V8.13001C16.4335 8.21222 16.0264 8.38837 15.7641 8.66238C15.5018 8.9364 15.3726 9.25347 15.3726 9.62534V9.62143ZM20.0544 14.6437C20.0544 14.4088 20.0074 14.2014 19.9173 14.0291C19.8234 13.853 19.6981 13.7042 19.5416 13.5751C19.3811 13.4459 19.1932 13.3324 18.9779 13.2345C18.7626 13.1366 18.5316 13.0466 18.285 12.9644V16.2917C18.8996 16.2095 19.3497 16.0138 19.6316 15.7045C19.9134 15.3953 20.0544 15.043 20.0544 14.6437Z" fill="white"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <RouterLink to="#reviews" class="txt-highlight">REVIEWS AND EXPERIENCES</RouterLink>
      <div class="sidebar-content d-center">
        <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.38042 8.87324H6.28183V30H1.38042V8.87324ZM3.83112 6.33803C2.92971 6.33803 2.16915 6.04225 1.54943 5.4507C0.957884 4.83099 0.662109 4.07042 0.662109 3.16901C0.662109 2.26761 0.957884 1.52113 1.54943 0.929578C2.16915 0.309859 2.92971 0 3.83112 0C4.73253 0 5.47901 0.309859 6.07056 0.929578C6.69028 1.52113 7.00014 2.26761 7.00014 3.16901C7.00014 4.07042 6.69028 4.83099 6.07056 5.4507C5.47901 6.04225 4.73253 6.33803 3.83112 6.33803Z" fill="currentColor"/>
          <path d="M11.7183 8.87324H16.6197V30H11.7183V8.87324ZM14.169 6.33803C13.2676 6.33803 12.507 6.04225 11.8873 5.4507C11.2958 4.83099 11 4.07042 11 3.16901C11 2.26761 11.2958 1.52113 11.8873 0.929578C12.507 0.309859 13.2676 0 14.169 0C15.0704 0 15.8169 0.309859 16.4085 0.929578C17.0282 1.52113 17.338 2.26761 17.338 3.16901C17.338 4.07042 17.0282 4.83099 16.4085 5.4507C15.8169 6.04225 15.0704 6.33803 14.169 6.33803Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <RouterLink to="#ai-assistance" class="txt-highlight">AI ASSISTANCE</RouterLink>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="14" stroke="currentColor" stroke-width="2"/>
          <path d="M19.4054 12.2H21.7254V22.2H19.4054V12.2ZM20.5654 11C20.1388 11 19.7788 10.86 19.4854 10.58C19.2054 10.2867 19.0654 9.92667 19.0654 9.5C19.0654 9.07333 19.2054 8.72 19.4854 8.44C19.7788 8.14667 20.1388 8 20.5654 8C20.9921 8 21.3454 8.14667 21.6254 8.44C21.9188 8.72 22.0654 9.07333 22.0654 9.5C22.0654 9.92667 21.9188 10.2867 21.6254 10.58C21.3454 10.86 20.9921 11 20.5654 11Z" fill="currentColor"/>
          <path d="M11.5 22.4C10.3133 22.4 9.43333 22.1333 8.86 21.6C8.28667 21.0667 8 20.3267 8 19.38C8 18.8867 8.08 18.44 8.24 18.04C8.4 17.64 8.66 17.3 9.02 17.02C9.38 16.74 9.84667 16.5267 10.42 16.38C10.9933 16.22 11.6867 16.14 12.5 16.14H14.48V15.6C14.48 15.08 14.3267 14.68 14.02 14.4C13.7133 14.1067 13.24 13.96 12.6 13.96C11.96 13.96 11.5 14.08 11.22 14.32C10.94 14.5467 10.7733 14.84 10.72 15.2H8.4C8.42667 14.7467 8.53333 14.3267 8.72 13.94C8.90667 13.54 9.17333 13.2 9.52 12.92C9.86667 12.6267 10.2933 12.4 10.8 12.24C11.32 12.08 11.92 12 12.6 12C14.0267 12 15.08 12.3267 15.76 12.98C16.4533 13.6333 16.8 14.5733 16.8 15.8V22.2H15L14.78 20.9H14.74C14.3533 21.38 13.88 21.7533 13.32 22.02C12.76 22.2733 12.1533 22.4 11.5 22.4ZM11.9 20.44C12.2733 20.44 12.6133 20.38 12.92 20.26C13.24 20.14 13.5133 19.98 13.74 19.78C13.9667 19.5667 14.1467 19.32 14.28 19.04C14.4133 18.7467 14.48 18.4333 14.48 18.1V17.86H12.6C11.8 17.86 11.24 17.9933 10.92 18.26C10.6 18.5133 10.44 18.86 10.44 19.3C10.44 19.6333 10.5533 19.9067 10.78 20.12C11.02 20.3333 11.3933 20.44 11.9 20.44Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <RouterLink to="#free-samples" class="txt-highlight">PROMO SAMPLES AVAILABLE</RouterLink>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
          <rect x="1.78613" y="7.50488" width="26.4276" height="22.4952" rx="4" stroke="currentColor" stroke-width="2"/>
          <path d="M14.581 7.13963C14.0554 5.18326 12.3384 1.21794 9.67533 1.0076C7.01221 0.797248 6.46323 5.00797 6.52164 7.13963" stroke="currentColor" stroke-width="2"/>
          <path d="M15.419 7.13963C15.9446 5.18326 17.6616 1.21794 20.3247 1.0076C22.9878 0.797248 23.5368 5.00797 23.4784 7.13963" stroke="currentColor" stroke-width="2"/>
          <rect x="13.9102" y="8.01562" width="2.17896" height="21.9933" fill="currentColor"/>
          <rect x="27.7021" y="17.6631" width="2.17896" height="25.4046" transform="rotate(90 27.7021 17.6631)" fill="currentColor"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <RouterLink to="#routine" class="txt-highlight">BEAUTY ROUTINES</RouterLink>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <g clip-path="url(#clip0_1160_8845)">
            <path d="M22.5472 25.6061C21.703 24.7601 21.703 23.3914 22.5472 22.5472C23.3914 21.703 24.7601 21.703 25.6043 22.5472C26.4503 23.3914 26.4485 24.7619 25.6043 25.6061C25.1822 26.0282 24.629 26.2402 24.0758 26.2402C23.5226 26.2402 22.9675 26.0282 22.5454 25.6061H22.5472Z" fill="currentColor"/>
            <path d="M22.5472 7.45282C21.703 6.6086 21.703 5.23811 22.5472 4.3939C23.3932 3.54969 24.7619 3.54969 25.6061 4.3939C26.4521 5.23811 26.4521 6.6086 25.6061 7.45282C25.184 7.87492 24.6308 8.08687 24.0776 8.08687C23.5243 8.08687 22.9711 7.87492 22.5472 7.45282Z" fill="currentColor"/>
            <path d="M4.3927 7.45282C3.54849 6.6086 3.54849 5.23811 4.3945 4.3939C5.23871 3.54969 6.6074 3.54969 7.45161 4.3939C8.29762 5.23991 8.29762 6.6086 7.45161 7.45282C7.02951 7.87492 6.47628 8.08687 5.92305 8.08687C5.36983 8.08687 4.8166 7.87492 4.3927 7.45282Z" fill="currentColor"/>
            <path d="M4.39427 25.6061C3.54826 24.7601 3.54826 23.3914 4.39427 22.5472C5.23848 21.703 6.60718 21.703 7.45139 22.5472C8.2956 23.3914 8.2956 24.7619 7.45139 25.6061C7.02928 26.0282 6.47606 26.2402 5.92283 26.2402C5.3696 26.2402 4.81638 26.0282 4.39427 25.6061Z" fill="currentColor"/>
            <path d="M15.0013 30.0005C14.4319 30.0005 13.8733 29.7688 13.471 29.3664C13.3722 29.2676 13.2806 29.1563 13.2015 29.0377C13.1243 28.921 13.0578 28.7952 13.004 28.6641C12.9501 28.533 12.907 28.3983 12.88 28.26C12.8513 28.1199 12.8369 27.978 12.8369 27.8379C12.8369 27.6978 12.8513 27.5541 12.88 27.414C12.907 27.2757 12.9501 27.1409 13.004 27.0098C13.0578 26.8787 13.1243 26.753 13.2015 26.6362C13.2806 26.5177 13.3722 26.4081 13.471 26.3075C13.5716 26.2087 13.6811 26.1171 13.7997 26.0381C13.9164 25.9608 14.0422 25.8944 14.1733 25.8405C14.3044 25.7866 14.4391 25.7453 14.5774 25.7166C14.8576 25.6609 15.145 25.6609 15.4234 25.7166C15.5617 25.7453 15.6965 25.7866 15.8276 25.8405C15.9587 25.8944 16.0844 25.9608 16.2012 26.0381C16.3197 26.1171 16.4293 26.2087 16.5299 26.3075C16.9322 26.7099 17.1639 27.2685 17.1639 27.8379C17.1639 28.4073 16.9322 28.9641 16.5299 29.3664C16.4293 29.4652 16.3197 29.5568 16.2012 29.6359C16.0844 29.7131 15.9587 29.7796 15.8276 29.8334C15.6965 29.8891 15.5617 29.9304 15.4234 29.9574C15.2833 29.9861 15.1414 30.0005 15.0013 30.0005Z" fill="currentColor"/>
            <path d="M2.16359 17.1621C2.02169 17.1621 1.87979 17.1478 1.74149 17.1208C1.60318 17.0921 1.46667 17.0508 1.33555 16.9969C1.20622 16.943 1.08049 16.8765 0.961939 16.7975C0.845187 16.7185 0.733823 16.6287 0.633236 16.5281C0.534446 16.4293 0.444636 16.3179 0.365604 16.1994C0.286571 16.0826 0.220112 15.9569 0.166226 15.8276C0.11234 15.6965 0.071028 15.5599 0.042289 15.4216C0.0153461 15.2833 0.000976562 15.1396 0.000976562 14.9995C0.000976562 14.8594 0.0153461 14.7157 0.042289 14.5774C0.071028 14.4391 0.11234 14.3026 0.166226 14.1715C0.220112 14.0422 0.286571 13.9164 0.365604 13.7997C0.444636 13.6811 0.534446 13.5698 0.633236 13.471C0.733823 13.3704 0.843391 13.2806 0.961939 13.2015C1.08049 13.1225 1.20622 13.056 1.33555 13.0022C1.46667 12.9483 1.60318 12.907 1.74149 12.88C2.0199 12.8225 2.30729 12.8225 2.5857 12.88C2.724 12.907 2.86051 12.9483 2.98984 13.0022C3.12096 13.056 3.2467 13.1225 3.36345 13.2015C3.482 13.2806 3.59336 13.3704 3.69215 13.471C3.79274 13.5698 3.88255 13.6811 3.96158 13.7997C4.03882 13.9164 4.10707 14.0422 4.16096 14.1715C4.21484 14.3026 4.25616 14.4391 4.2831 14.5774C4.31184 14.7157 4.32621 14.8576 4.32621 14.9995C4.32621 15.1414 4.31184 15.2833 4.2831 15.4216C4.25616 15.5599 4.21484 15.6965 4.16096 15.8276C4.10707 15.9569 4.03882 16.0826 3.96158 16.1994C3.88255 16.3179 3.79274 16.4293 3.69215 16.5281C3.59336 16.6287 3.482 16.7185 3.36345 16.7975C3.2467 16.8765 3.12096 16.943 2.98984 16.9969C2.86051 17.0508 2.724 17.0921 2.5857 17.1208C2.44559 17.1478 2.30369 17.1621 2.16359 17.1621Z" fill="currentColor"/>
            <path d="M14.9995 4.3272C14.8594 4.3272 14.7175 4.31283 14.5774 4.28409C14.4391 4.25535 14.3044 4.21404 14.1733 4.16015C14.0422 4.10627 13.9164 4.03981 13.7997 3.96257C13.6811 3.88354 13.5716 3.79194 13.471 3.69314C13.3722 3.59256 13.2806 3.48299 13.2015 3.36444C13.1243 3.24589 13.0578 3.12196 13.004 2.99083C12.9501 2.85971 12.907 2.7232 12.88 2.58669C12.8513 2.44659 12.8369 2.30469 12.8369 2.16279C12.8369 2.02089 12.8513 1.88079 12.88 1.74068C12.907 1.60238 12.9501 1.46766 13.004 1.33654C13.0578 1.20542 13.1243 1.07969 13.2015 0.962933C13.2806 0.844385 13.3722 0.734817 13.471 0.63423C13.5716 0.533644 13.6811 0.443834 13.7997 0.364801C13.9164 0.287565 14.0422 0.21931 14.1733 0.165424C14.3044 0.111538 14.4391 0.070226 14.5774 0.0432831C15.2797 -0.098616 16.0287 0.131297 16.5299 0.63423C16.6287 0.734817 16.7203 0.844385 16.7993 0.962933C16.8765 1.07969 16.943 1.20542 16.9969 1.33654C17.0508 1.46766 17.0939 1.60238 17.1208 1.74068C17.1496 1.88079 17.1639 2.02269 17.1639 2.16279C17.1639 2.30289 17.1496 2.44659 17.1208 2.58669C17.0939 2.7232 17.0508 2.85971 16.9969 2.99083C16.943 3.12196 16.8765 3.24589 16.7993 3.36444C16.7203 3.48299 16.6287 3.59256 16.5299 3.69314C16.4293 3.79194 16.3197 3.88354 16.2012 3.96257C16.0844 4.03981 15.9587 4.10627 15.8276 4.16015C15.6965 4.21404 15.5599 4.25535 15.4234 4.28409C15.2833 4.31283 15.1414 4.3272 14.9995 4.3272Z" fill="currentColor"/>
            <path d="M27.8364 17.1621C27.6963 17.1621 27.5526 17.1478 27.4143 17.1208C27.276 17.0921 27.1395 17.0508 27.0102 16.9969C26.8791 16.943 26.7533 16.8765 26.6366 16.7975C26.518 16.7185 26.4067 16.6287 26.3079 16.5281C26.2073 16.4293 26.1175 16.3179 26.0385 16.1994C25.9612 16.0826 25.893 15.9569 25.8391 15.8276C25.7852 15.6965 25.7439 15.5599 25.7169 15.4216C25.6882 15.2833 25.6738 15.1396 25.6738 14.9995C25.6738 14.8594 25.6882 14.7157 25.7169 14.5774C25.7439 14.4391 25.7852 14.3026 25.8391 14.1715C25.893 14.0422 25.9612 13.9164 26.0385 13.7997C26.1175 13.6811 26.2073 13.5698 26.3079 13.471C26.4067 13.3704 26.518 13.2806 26.6366 13.2015C26.7533 13.1225 26.8791 13.056 27.0102 13.0022C27.1395 12.9483 27.276 12.907 27.4143 12.88C27.6927 12.8225 27.9801 12.8225 28.2586 12.88C28.3969 12.907 28.5334 12.9483 28.6645 13.0022C28.7938 13.056 28.9195 13.1225 29.0381 13.2015C29.1549 13.2806 29.2662 13.3704 29.365 13.471C29.4656 13.5698 29.5554 13.6811 29.6344 13.7997C29.7135 13.9164 29.7799 14.0422 29.8338 14.1715C29.8877 14.3026 29.929 14.4391 29.9577 14.5774C29.9847 14.7157 29.9991 14.8576 29.9991 14.9995C29.9991 15.1414 29.9847 15.2833 29.9577 15.4216C29.929 15.5599 29.8877 15.6965 29.8338 15.8276C29.7799 15.9569 29.7135 16.0826 29.6344 16.1994C29.5554 16.3179 29.4656 16.4293 29.365 16.5281C29.2662 16.6287 29.1548 16.7185 29.0363 16.7975C28.9195 16.8765 28.7938 16.943 28.6645 16.9969C28.5334 17.0508 28.3969 17.0921 28.2586 17.1208C28.1202 17.1478 27.9783 17.1621 27.8364 17.1621Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0_1160_8845">
              <rect width="29.9982" height="30" fill="white" transform="translate(0.000976562)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  </div>

  <TheFooter />

</template>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr;

  .main-inner {
    background-color: $orange;
    text-align: center;
    padding: 60px;

    > div {
      display: grid;
      padding: 20px;
      grid-template-rows: repeat(3, auto);
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
      padding: 30px 50px;

      &:not(:last-child) {
        border-bottom: 1px solid $black;
      }

      a {
        text-transform: uppercase;
      }

      p {
        color: $black;
        padding-top: 20px;

        @media (max-width: 1000px) {
          padding-top: 10px;
        }
      }

      @media (max-width: 1340px) {
        padding: 20px 40px;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
  @media (max-width: 480px) {
    padding-top: 61px;
  }
}

.reviews {
  border-bottom: 1px solid $black;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 1000px;

  &__text {
    display: grid;
    grid-template-rows: 1fr auto;

    &__content {
      padding: 40px;
      display: grid;
      justify-items: left;
      align-content: start;

      h2 {
        display: flex;
        line-height: 120px;

        padding-bottom: 10px;
      }
    }
  }
  &__picture {
    @include pad();
    background-image: url("@/assets/img/product/reviews-img.png");
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: auto;
    height: auto;
    border: none;
  }
}
.reviews--beauty {
  height: auto;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr;

  &__left {
    @include pad();
    border-right: 1px solid $black;
    background: linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url('@/assets/img/global/girls-smiling.png');
    color: #fff;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 500px auto;
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

    @media (max-width: 768px) {
      padding: 20px;
    }
  }

  &__inner {
    display: grid;
    grid-template-rows: 1fr auto;

    &__content {
      padding: 100px 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      &__item {
        padding: 40px 10px;
        border-bottom: 1px solid $black;

        @media (max-width: 1000px) {
          padding: 20px 0;
        }
      }
    }

    @media (max-width: 768px) {
      padding: 0 20px;
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

  @media (max-width: 1300px) {
    padding: 80px 40px;
  }

  @media (max-width: 768px) {
    padding: 60px 0;
    grid-template-columns: 1fr;
    gap: 20px;
    grid-template-rows: auto auto;
  }
}

.services {
  padding-top: 200px;

  &__top {
    padding: 0 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
  &__inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    padding-top: 20px;
  }
}

.products {
  padding-top: 200px;

  &__top {
    padding: 0 20px 40px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
}

.routines {
  padding-top: 200px;

  &__top {
    padding: 0 20px 40px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
}

.sidebar {
  position: fixed;
  top: 50%;
  display: grid;
  transform: translateY(-50%);
  right: 0;

  &-item {
    display: grid;
    gap: 10px;
    align-items: center;
    justify-content: right;
    justify-self: right;
    grid-template-columns: auto auto;
    max-width: 60px;
    overflow: hidden;
    transition: .3s;
    background-color: #fff;

    a {
      padding-left: 15px;
      width: max-content;
      color: #fff;
    }
    .sidebar-content {
      width: 60px;
      height: 55px;
    }
    svg path, svg rect, svg circle {
      transition: .3s;
      color: $orange;
    }
    &:hover {
      background-color: $orange;
      max-width: 550px;

      svg path, svg rect, svg circle {
        color: $white;
      }
    }
  }

  @media (max-width: 480px) {
    display: none;
  }
}
</style>
