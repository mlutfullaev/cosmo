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
import router from '@/router'

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

const links = ref([
  {
    link: 'full-details',
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
    link: 'routine',
    description: 'Registered Beauty routines where this products is used.  ',
    title: 'ROUTINES WHERE USED'
  },
])
const beauty = store.state.beauty
const pricesMore = ref(false)
const routines = ref<{routine: Routine}[]>([])
const modalActive = ref(false)

const meta = ref({ page: 1, take: 11, itemCount: 0, pageCount: 0 })
const brand = ref<Brand | null>(null)
const prices = ref<Prices[]>([])
const product = ref<null | Product>(null)
const alternatives = ref<Product[]>([])
const reviews = ref<Review[]>([])

onMounted(() => {
  axios.get(`https://api-www.beautyid.app/goods/byid/${route.params.id}`)
    .then(res => {
      product.value = res.data
      updateMeta({ title: res.data.SEOpageTitle, description: res.data.SEOpageDescription, keywords: res.data.SEOpageKeywords })

      axios.get(`https://api-www.beautyid.app/brands/byname/${res.data.brand}?order=ASC&page=1&take=10`)
        .then(res => {
          brand.value = res.data.data[0]
        })
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
      console.log(res.data.data)
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

      axios.get(`https://api-www.beautyid.app/brands/byname/${res.data.brandName}?order=ASC&page=1&take=10`)
        .then(res => {
          brand.value = res.data.data[0]
        })
    })
})
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
    <img v-if="brand.brandLogo" :src="`https://api-www.beautyid.app/images/getimage/${brand.brandLogo}`" :alt="brand.SEOlogoAlt">
    <h2 class="title-secondary bold">{{brand.brandName}}</h2>
    <p class="txt" v-if="brand.brandDescription">
      {{ brand.brandDescription }}
    </p>
    <router-link to="/" class="link bold">MORE ABOUT BRAND <span>→</span></router-link>
  </section>

  <SingleProductSlide v-if="product" :product="product"/>

  <section id="reviews" class="reviews" v-if="!store.state.beauty">
    <div class="reviews__text">
      <div class="reviews__text__content">
        <h2 class="section-title">Reviews</h2>
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
          <router-link class="link bold" :to="price.priceGoodLink">{{price.priceShopName}} <span>→</span></router-link>
          <p class="txt-highlight">{{price.priceValue}} euro</p>
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
          <h2>YOUR REVIEW MATTERS</h2>
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
          <h2>SAMPLES FOR HONEST REVIEW</h2>
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
          <h2>SPEAK OUT DIRECTLY TO THE BRAND</h2>
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
          <h2>BEAUTYMETER</h2>
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
          <h2>QUICK TRY WITH TESTERS</h2>
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
          <h2>EXPIRY DATE CHECK</h2>
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
          <h2 class="title-secondary bold white"> VIRTUAL DERMATOLOGIST SUPPORT</h2>
          <p class="txt white">Video call support by DermoTeam is available related to this product.</p>
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
          <h2>SAVE IT TO YOUR LIBRARY</h2>
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
      <h2 class="section-title">Alternatives</h2>
      <div class="section-subtitle">
        <h3>12</h3>
        <p>Alternative products are available for Argan Oil</p>
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
      <h2 class="section-title">Routines</h2>
      <div class="section-subtitle">
        <h3>130</h3>
        <p>Beautyties are using this product in their registered routines</p>
      </div>
      <p class="txt">Beauty Routines where Natural Leaf Argon Oil is used as part of the ritual. These Routines are selected based on the general use without any skin type or skin specifics filtration. To see personalised routines recommendation You should login.  </p>
    </div>
    <div class="routines__list">
      <RoutineCard v-for="routine in routines" :routine="routine.routine" :key="routine.routine.id" />
      <div class="routine-item center bg-orange min-tablet">
        <router-link to="#" class="link bold">SEE MORE ROUTINES <span>→</span></router-link>
      </div>
    </div>
    <router-link to="#" class="link bold tablet bg-orange">SEE MORE ROUTINES <span>→</span></router-link>
  </section>

  <AiAssistance v-if="!store.state.beauty" />

  <BaseSubscripe />

  <div class="modal" :class="{active: modalActive}" @click="modalActive = false">
    <ModalSubscribe :active="modalActive" />
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

.reviews {
  border-bottom: 1px solid $black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 1000px;

  &__text {
    display: grid;
    grid-template-rows: 1fr auto;

    &__content {
      padding: 60px;
      display: grid;
      justify-items: left;
      align-content: start;

      h2 {
        display: flex;
        line-height: 120px;

        padding-bottom: 10px;
      }
      @media (max-width: 1200px) {
        padding: 60px 20px;
      }
      @media (max-width: 1000px) {
        padding: 40px 20px;
      }
    }
  }
  &__picture {
    padding: 60px;
    background-image: url("@/assets/img/product/reviews-img.png");
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 480px;

    @media (max-width: 768px) {
      grid-row: 1;
    }
  }

  @media (max-width: 1200px) {
    height: auto;
  }
  @media (max-width: 768px) {
    grid-template-columns: auto;
    border: none;
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
    padding: 60px 0 0;
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
  @media (max-width: 1000px) {
    padding-top: 60px;
  }
}
</style>
