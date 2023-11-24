<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { Review, Routine } from '@/interfaces'
import AiAssistance from '@/components/AiAssistance.vue'
import BaseRate from '@/components/BaseRate.vue'
import BaseReviews from '@/components/BaseReviews.vue'
import BeforeAfter from '@/components/BeforeAfter.vue'
import 'swiper/css'
import { computed } from '@vue/reactivity'
import RoutineCard from '@/components/RoutineCard.vue'

interface Step {
  stepOrder: number,
  stepName: string,
  stepDescription: string,
  stepManual: string,
  id: number,
}

const beauty = ref(true)
const mainLabel = ref(false)
const route = useRoute()

const steps = ref<Step[]>([])
const routine = ref<Routine | null>(null)
const reviews = ref<Review[]>([])
const alternatives = ref<Routine[]>([])
onMounted(() => {
  axios.get(`https://api-www.beautyid.app/routines/byid/${route.params.id}`)
    .then(res => {
      routine.value = res.data.routine
      steps.value = res.data.steps
    })
  axios.get('https://api-www.beautyid.app/routines?order=ASC&page=1&take=11')
    .then(res => {
      alternatives.value = res.data.data
    })
  axios.get('https://api-www.beautyid.app/reviews/?order=ASC&page=1&take=10')
    .then(res => {
      reviews.value = res.data.data
    })
})

watch(route, () => {
  axios.get(`https://api-www.beautyid.app/routines/byid/${route.params.id}`)
    .then(res => {
      routine.value = res.data.routine
      steps.value = res.data.steps
    })
})

const stepSwiper = ref(0)
</script>

<template>
  <TheHeader/>

  <main v-if="routine" class="main">
    <div class="main__image bg-img"></div>
    <div class="main__inner">
      <div class="main__inner__content">
        <div class="d-center">
          <div class="item">
            <svg width="80" height="89" viewBox="0 0 80 89" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="49" r="39.5" stroke="black"/>
              <path d="M56.0078 68.3504C52.4745 68.3504 49.7078 67.3671 47.7078 65.4004C45.7411 63.4337 44.6745 60.7171 44.5078 57.2504H48.1078C48.2745 59.7504 49.0245 61.6837 50.3578 63.0504C51.6911 64.3837 53.5745 65.0504 56.0078 65.0504C58.6078 65.0504 60.5745 64.4337 61.9078 63.2004C63.2411 61.9337 63.9078 60.2837 63.9078 58.2504C63.9078 56.2837 63.2578 54.6837 61.9578 53.4504C60.6578 52.2171 58.8245 51.6004 56.4578 51.6004H51.7578V48.4004H56.4578C58.5578 48.4004 60.1911 47.8337 61.3578 46.7004C62.5578 45.5337 63.1578 44.0337 63.1578 42.2004C63.1578 40.3004 62.5411 38.7837 61.3078 37.6504C60.1078 36.5171 58.3411 35.9504 56.0078 35.9504C53.9078 35.9504 52.2411 36.5671 51.0078 37.8004C49.8078 39.0004 49.0911 40.6504 48.8578 42.7504H45.2578C45.3245 41.2171 45.6245 39.8337 46.1578 38.6004C46.6911 37.3671 47.4078 36.3171 48.3078 35.4504C49.2411 34.5504 50.3578 33.8671 51.6578 33.4004C52.9578 32.9004 54.4078 32.6504 56.0078 32.6504C57.7078 32.6504 59.2245 32.8837 60.5578 33.3504C61.8911 33.8171 63.0078 34.4671 63.9078 35.3004C64.8411 36.1337 65.5411 37.1504 66.0078 38.3504C66.5078 39.5171 66.7578 40.8004 66.7578 42.2004C66.7578 43.9004 66.3411 45.4337 65.5078 46.8004C64.7078 48.1337 63.5411 49.1837 62.0078 49.9504C63.8078 50.7171 65.1745 51.8171 66.1078 53.2504C67.0411 54.6837 67.5078 56.3504 67.5078 58.2504C67.5078 59.7504 67.2411 61.1171 66.7078 62.3504C66.2078 63.5837 65.4745 64.6504 64.5078 65.5504C63.5411 66.4171 62.3411 67.1004 60.9078 67.6004C59.4745 68.1004 57.8411 68.3504 56.0078 68.3504Z" fill="black"/>
              <path d="M26.4883 68.3504C24.7216 68.3504 23.1216 68.0671 21.6883 67.5004C20.2883 66.9004 19.0883 65.9504 18.0883 64.6504C17.0883 63.3504 16.3216 61.6837 15.7883 59.6504C15.2549 57.5837 14.9883 55.0671 14.9883 52.1004V48.9004C14.9883 45.9671 15.2549 43.4837 15.7883 41.4504C16.3549 39.3837 17.1383 37.7004 18.1383 36.4004C19.1383 35.1004 20.3383 34.1504 21.7383 33.5504C23.1716 32.9504 24.7549 32.6504 26.4883 32.6504C28.2216 32.6504 29.7883 32.9504 31.1883 33.5504C32.6216 34.1171 33.8383 35.0504 34.8383 36.3504C35.8383 37.6504 36.6049 39.3337 37.1383 41.4004C37.705 43.4671 37.9883 45.9671 37.9883 48.9004V52.1004C37.9883 55.0337 37.705 57.5337 37.1383 59.6004C36.6049 61.6337 35.8383 63.3004 34.8383 64.6004C33.8383 65.9004 32.6216 66.8504 31.1883 67.4504C29.7883 68.0504 28.2216 68.3504 26.4883 68.3504ZM26.4883 65.0504C27.6883 65.0504 28.7716 64.8504 29.7383 64.4504C30.7383 64.0171 31.5716 63.3004 32.2383 62.3004C32.9383 61.3004 33.4716 59.9671 33.8383 58.3004C34.2049 56.6337 34.3883 54.5671 34.3883 52.1004V48.9004C34.3883 46.4337 34.2049 44.3837 33.8383 42.7504C33.4716 41.0837 32.9383 39.7504 32.2383 38.7504C31.5383 37.7504 30.7049 37.0337 29.7383 36.6004C28.7716 36.1671 27.6883 35.9504 26.4883 35.9504C25.2883 35.9504 24.1883 36.1671 23.1883 36.6004C22.2216 37.0004 21.3883 37.7004 20.6883 38.7004C20.0216 39.7004 19.5049 41.0337 19.1383 42.7004C18.7716 44.3671 18.5883 46.4337 18.5883 48.9004V52.1004C18.5883 54.5671 18.7716 56.6337 19.1383 58.3004C19.5049 59.9337 20.0383 61.2504 20.7383 62.2504C21.4383 63.2504 22.2716 63.9671 23.2383 64.4004C24.2049 64.8337 25.2883 65.0504 26.4883 65.0504Z" fill="black"/>
            </svg>
            <p class="note t-up bold">STEP</p>
          </div>
          <div class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="82" height="91" viewBox="0 0 82 91" fill="none">
              <path d="M40.997 10C18.9057 10 1 27.9057 1 49.997C1 72.0883 18.9117 90 41.003 90C63.0944 90 81.0061 72.0883 81.0061 49.997C81.0061 44.7755 79.9945 39.7903 78.1712 35.2109" stroke="black" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M22.8918 14.1672C38.126 -9.54345 59.1214 6.00604 59.1214 6.00604M22.8867 14.0401C22.8867 14.0401 43.2058 29.4065 58.6078 5.045" stroke="black" stroke-miterlimit="10"/>
              <path d="M17.6416 43.9469L14.25 46.2554V44.491L17.6416 42.1621H19.223V57.9913H17.6416V43.952V43.9469Z" fill="black"/>
              <path d="M28.2018 58.1495C27.4035 58.1495 26.6814 58.0173 26.0407 57.7529C25.4001 57.4885 24.856 57.0613 24.4034 56.4766C23.9509 55.8867 23.6051 55.1291 23.361 54.2036C23.117 53.2782 23 52.1443 23 50.8019V49.3527C23 48.0256 23.122 46.8967 23.3712 45.9713C23.6204 45.0458 23.9712 44.2882 24.4238 43.6983C24.8763 43.1085 25.4204 42.6814 26.0611 42.4068C26.7018 42.1373 27.4137 42 28.1967 42C28.9798 42 29.6917 42.1322 30.3324 42.3966C30.9731 42.661 31.5171 43.0882 31.9697 43.6729C32.4222 44.2628 32.7731 45.0204 33.0222 45.956C33.2714 46.8916 33.3934 48.0205 33.3934 49.3476V50.7968C33.3934 52.1239 33.2714 53.2528 33.0222 54.1782C32.7731 55.1037 32.4222 55.8613 31.9697 56.4512C31.5171 57.041 30.9731 57.4681 30.3324 57.7427C29.6917 58.0122 28.9798 58.1495 28.1967 58.1495H28.2018ZM28.2018 56.6596C28.7459 56.6596 29.2391 56.5681 29.6815 56.3749C30.1239 56.1867 30.5052 55.8664 30.8103 55.4138C31.1205 54.9613 31.3544 54.3613 31.5222 53.6036C31.69 52.8511 31.7714 51.9155 31.7714 50.8019V49.3527C31.7714 48.2391 31.69 47.3086 31.5222 46.5611C31.3544 45.8136 31.1154 45.2136 30.8002 44.7662C30.4849 44.3187 30.1086 43.9882 29.6713 43.795C29.234 43.6017 28.7459 43.5 28.2018 43.5C27.6577 43.5 27.1645 43.5916 26.7221 43.7848C26.2797 43.978 25.8984 44.2933 25.5933 44.7458C25.2882 45.1984 25.0492 45.7984 24.8814 46.556C24.7136 47.3086 24.6322 48.2442 24.6322 49.3578V50.807C24.6322 51.9205 24.7136 52.8511 24.8814 53.5985C25.0492 54.346 25.2882 54.946 25.6034 55.3935C25.9187 55.841 26.295 56.1715 26.7323 56.3647C27.1696 56.563 27.6577 56.6596 28.2018 56.6596Z" fill="black"/>
              <path d="M41.8151 58.1495C41.0168 58.1495 40.2947 58.0173 39.654 57.7529C39.0133 57.4885 38.4693 57.0613 38.0167 56.4766C37.5641 55.8867 37.2184 55.1291 36.9743 54.2036C36.7353 53.2782 36.6133 52.1443 36.6133 50.8019V49.3527C36.6133 48.0256 36.7353 46.8967 36.9845 45.9713C37.2336 45.0458 37.5845 44.2882 38.037 43.6983C38.4896 43.1085 39.0337 42.6814 39.6744 42.4068C40.3151 42.1373 41.0269 42 41.81 42C42.5931 42 43.3049 42.1322 43.9456 42.3966C44.5863 42.661 45.1304 43.0882 45.583 43.6729C46.0355 44.2628 46.3864 45.0204 46.6355 45.956C46.8847 46.8916 47.0067 48.0205 47.0067 49.3476V50.7968C47.0067 52.1239 46.8847 53.2528 46.6355 54.1782C46.3864 55.1037 46.0355 55.8613 45.583 56.4512C45.1304 57.041 44.5863 57.4681 43.9456 57.7427C43.3049 58.0122 42.5931 58.1495 41.81 58.1495H41.8151ZM41.8151 56.6596C42.3592 56.6596 42.8524 56.5681 43.2948 56.3749C43.7372 56.1867 44.1185 55.8664 44.4236 55.4138C44.7338 54.9613 44.9677 54.3613 45.1355 53.6036C45.3033 52.8511 45.3847 51.9155 45.3847 50.8019V49.3527C45.3847 48.2391 45.3033 47.3086 45.1355 46.5611C44.9677 45.8136 44.7287 45.2136 44.4134 44.7662C44.0982 44.3187 43.7219 43.9882 43.2846 43.795C42.8473 43.6017 42.3592 43.5 41.8151 43.5C41.271 43.5 40.7778 43.5916 40.3354 43.7848C39.893 43.978 39.5116 44.2933 39.2066 44.7458C38.8964 45.1984 38.6625 45.7984 38.4947 46.556C38.3269 47.3086 38.2455 48.2442 38.2455 49.3578V50.807C38.2455 51.9205 38.3269 52.8511 38.4947 53.5985C38.6625 54.346 38.9015 54.946 39.2167 55.3935C39.532 55.841 39.9083 56.1715 40.3456 56.3647C40.7829 56.563 41.271 56.6596 41.8151 56.6596Z" fill="black"/>
              <path d="M53.2806 50.2332C52.7517 50.2332 52.2687 50.1416 51.8212 49.9637C51.3738 49.7806 50.9975 49.5314 50.6771 49.2162C50.3619 48.9009 50.1127 48.5145 49.9297 48.0619C49.7466 47.6094 49.6602 47.1111 49.6602 46.5721V45.667C49.6602 45.1229 49.7517 44.6246 49.9297 44.1771C50.1127 43.7245 50.3619 43.3381 50.6771 43.0228C50.9924 42.7076 51.3738 42.4584 51.8212 42.2754C52.2636 42.0923 52.7517 42.0059 53.2806 42.0059C53.8094 42.0059 54.2925 42.0974 54.7399 42.2754C55.1823 42.4584 55.5637 42.7076 55.884 43.0228C56.1993 43.3381 56.4484 43.7245 56.6315 44.1771C56.8145 44.6296 56.901 45.128 56.901 45.667V46.5721C56.901 47.1161 56.8095 47.6145 56.6315 48.0619C56.4484 48.5145 56.1993 48.9009 55.884 49.2162C55.5688 49.5314 55.1874 49.7806 54.7399 49.9637C54.2925 50.1467 53.8094 50.2332 53.2806 50.2332ZM53.2806 48.9213C53.9162 48.9213 54.4348 48.7077 54.8416 48.2857C55.2484 47.8636 55.4518 47.289 55.4518 46.567V45.6619C55.4518 44.9398 55.2484 44.3652 54.8416 43.9432C54.4348 43.5211 53.9162 43.3076 53.2806 43.3076C52.645 43.3076 52.1263 43.5211 51.7195 43.9432C51.3127 44.3652 51.1093 44.9398 51.1093 45.6619V46.567C51.1093 47.289 51.3127 47.8636 51.7195 48.2857C52.1263 48.7077 52.645 48.9213 53.2806 48.9213ZM62.4587 42.1584H64.1316L54.9535 57.9876H53.2806L62.4587 42.1584ZM64.1316 58.1452C63.6028 58.1452 63.1198 58.0537 62.6723 57.8757C62.2248 57.6926 61.8486 57.4435 61.5282 57.1282C61.2129 56.813 60.9638 56.4265 60.7807 55.974C60.5977 55.5214 60.5112 55.0231 60.5112 54.4841V53.579C60.5112 53.0349 60.6028 52.5366 60.7807 52.0891C60.9638 51.6366 61.2129 51.2501 61.5282 50.9349C61.8435 50.6196 62.2248 50.3704 62.6723 50.1874C63.1147 50.0043 63.6028 49.9179 64.1316 49.9179C64.6605 49.9179 65.1435 50.0094 65.591 50.1874C66.0385 50.3654 66.4147 50.6196 66.7351 50.9349C67.0504 51.2501 67.2995 51.6366 67.4826 52.0891C67.6656 52.5417 67.7521 53.04 67.7521 53.579V54.4841C67.7521 55.0282 67.6605 55.5265 67.4826 55.974C67.2995 56.4265 67.0504 56.813 66.7351 57.1282C66.4198 57.4435 66.0385 57.6926 65.591 57.8757C65.1435 58.0587 64.6605 58.1452 64.1316 58.1452ZM64.1316 56.8333C64.7673 56.8333 65.2859 56.6197 65.6927 56.1977C66.0995 55.7756 66.3029 55.2011 66.3029 54.479V53.5739C66.3029 52.8519 66.0995 52.2773 65.6927 51.8552C65.2859 51.4332 64.7673 51.2196 64.1316 51.2196C63.496 51.2196 62.9774 51.4332 62.5706 51.8552C62.1638 52.2773 61.9604 52.8519 61.9604 53.5739V54.479C61.9604 55.2011 62.1638 55.7756 62.5706 56.1977C62.9774 56.6197 63.496 56.8333 64.1316 56.8333Z" fill="black"/>
            </svg>
            <p class="note t-up bold">natural</p>
          </div>
        </div>
        <h2 class="title">Spring Revitalising Routine</h2>
        <p class="txt">Personalized Beauty Routine for Individuals for scandic people with oily problematic skin. Unlock the Secrets of Scandic Beauty: Embrace a Natural, Effortless, and Radiant Routine.</p>
        <h3 class="title-secondary">ROUTINE BUDGET: <span class="bold">130 euro</span></h3>
        <p class="txt grey">We estimate Budget of this Routine  based on average pricing i your area.</p>
      </div>
      <div class="main__inner__info">
        <div class="main__inner__info__left">
          <button @click="mainLabel = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <g clip-path="url(#clip0_891_62064)">
                <path d="M14.9983 29.44C22.9732 29.44 29.4381 22.9751 29.4381 15.0003C29.4381 7.02544 22.9732 0.560547 14.9983 0.560547C7.02349 0.560547 0.558594 7.02544 0.558594 15.0003C0.558594 22.9751 7.02349 29.44 14.9983 29.44Z" stroke="#FF8A00" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M14.8524 7.42531C14.4453 7.42531 14.1073 7.28337 13.8327 7.00138C13.5582 6.71938 13.4219 6.36828 13.4219 5.94996C13.4219 5.53163 13.5582 5.18054 13.8327 4.89854C14.1073 4.61654 14.4471 4.47461 14.8524 4.47461C15.2577 4.47461 15.5975 4.61654 15.8721 4.89854C16.1466 5.18054 16.2829 5.53163 16.2829 5.94996C16.2829 6.36828 16.1466 6.71938 15.8721 7.00138C15.5975 7.28337 15.2577 7.42531 14.8524 7.42531ZM13.8477 10.1893H15.8571V25.8896H13.8477V10.1874V10.1893Z" fill="#FF8A00"/>
              </g>
              <defs>
                <clipPath id="clip0_891_62064">
                  <rect width="30" height="30" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          <h2 class="orange"><span>beauty</span><br/>meter</h2>
          <p class="txt-highlight">VERIFIED RESULTS by 15 users</p>
        </div>
        <div class="main__inner__info__right">
          <div class="d-sb">
            <p class="txt-highlight">WRINCKLES <span>less</span></p>
            <h3 class="title-secondary">15%</h3>
          </div>
          <div class="d-sb">
            <p class="txt-highlight">PIGMENTATION <span>less</span></p>
            <h3 class="title-secondary">34%</h3>
          </div>
          <div class="d-sb">
            <p class="txt-highlight">ACNE <span>less</span></p>
            <h3 class="title-secondary">34%</h3>
          </div>
          <div class="d-sb">
            <p class="txt-highlight">ROSACEA <span>less</span></p>
            <h3 class="title-secondary">34%</h3>
          </div>
          <div class="d-sb">
            <p class="txt-highlight">PIGMENTATION  <span>less</span></p>
            <h3 class="title-secondary">34%</h3>
          </div>
        </div>
        <div class="main__inner__info__label" :class="{active: mainLabel}">
          <div class="main__inner__info__left">
            <h2 class="orange"><span>beauty</span><br/>meter</h2>
            <p class="txt-highlight">VERIFIED RESULTS by 15 users</p>
          </div>
          <div class="main__inner__info__right">
            <p class="txt">Personalized Beauty Routine for Individuals for scandic people with oily problematic skin. Unlock the Secrets of Scandic Beauty: Embrace a Natural, Effortless, and Radiant Routine.</p>
          </div>
          <button class="alert-close" @click="mainLabel = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="main__inner__bottom">
        <div class="main__inner__bottom__item">
          <!-- <img src="" alt="author-portrait"> -->
          <p class="txt-highlight">{{ routine.authorName }}</p>
        </div>
        <div class="main__inner__bottom__item">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 38 34" fill="none">
            <path d="M19.8989 31.8483C19.3258 32.0506 18.382 32.0506 17.809 31.8483C12.9213 30.1798 2 23.2191 2 11.4213C2 6.21348 6.19662 2 11.3708 2C14.4382 2 17.1517 3.48314 18.8539 5.77528C20.5562 3.48314 23.2865 2 26.337 2C31.5112 2 35.7078 6.21348 35.7078 11.4213C35.7078 23.2191 24.7865 30.1798 19.8989 31.8483Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="txt-highlight">623 beauties</p>
        </div>
        <div class="main__inner__bottom__item">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="34" viewBox="0 0 30 34" fill="none">
            <path d="M27.7612 7.78774V28.9289C27.7612 31.6274 25.8258 32.7626 23.4623 31.4599L16.1485 27.3843C15.3669 26.9563 14.1014 26.9563 13.3197 27.3843L6.00598 31.4599C3.64249 32.7626 1.70703 31.6274 1.70703 28.9289V7.78774C1.70703 4.6054 4.31243 2 7.49477 2H21.9735C25.1558 2 27.7612 4.6054 27.7612 7.78774Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="txt-highlight">143</p>
        </div>
        <div class="main__inner__bottom__item">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M8.99346 7.40876L23.3303 2.62982C29.7641 0.485205 33.2597 3.99764 31.132 10.4315L26.353 24.7683C23.1446 34.4106 17.8759 34.4106 14.6674 24.7683L13.2489 20.5128L8.99346 19.0943C-0.648861 15.8858 -0.648861 10.6341 8.99346 7.40876Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.5703 19.7869L19.6158 13.7246" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="txt-highlight">share</p>
        </div>
        <BaseRate :rates="3.5" :text="true"/>
      </div>
      <div class="main__inner__scan">
        <img src="@/assets/img/global/qr.png" alt="qr-code">
        <p class="note">scan qr code to get the full description of this routine</p>
      </div>
    </div>
  </main>

  <section class="steps">
    <h2 class="title">Routine's steps</h2>
    <h3 class="steps__title orange">{{ stepSwiper + 1 }} step/{{ steps.length }}</h3>
    <div class="steps__inner">
      <button class="steps__inner__prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="23" viewBox="0 0 102 23" fill="none">
          <path d="M0.939339 10.4393C0.353554 11.0251 0.353554 11.9749 0.939339 12.5607L10.4853 22.1066C11.0711 22.6924 12.0208 22.6924 12.6066 22.1066C13.1924 21.5208 13.1924 20.5711 12.6066 19.9853L4.12132 11.5L12.6066 3.01471C13.1924 2.42892 13.1924 1.47918 12.6066 0.89339C12.0208 0.307604 11.0711 0.307604 10.4853 0.89339L0.939339 10.4393ZM102 10L2 9.99999L2 13L102 13L102 10Z" fill="black"/>
        </svg>
      </button>
      <swiper
        @active-index-change="swiper => stepSwiper = swiper.activeIndex"
        :modules="[Pagination, Navigation]"
        ref="mySwiper"
        :navigation="{
          nextEl: '.steps__inner__next',
          prevEl: '.steps__inner__prev',
        }"
        :pagination="{
          el: '.steps__pagination',
          clickable: true,
          bulletActiveClass: 'bg-orange',
          renderBullet: (index, className) => `<button class='${className}'></button>`
        }"
        :slides-per-view="1">
        <swiper-slide
          v-for="step in steps"
          :key="step.id"
        >
          <div class="swiper__block">
            <div class="swiper__block__left">
              <img src="@/assets/img/product/product.png" alt="step-image">
              <p class="name">Natures Leaf</p>
              <h3 class="title-secondary">{{ step.stepName }}</h3>
            </div>
            <div class="swiper__block__right">
              <p class="txt-highlight">what does it do</p>
              <p class="txt">{{ step.stepDescription }}</p>
              <p class="txt-highlight">How to use</p>
              <p class="txt">{{ step.stepManual }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <button class="steps__inner__next">
        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="23" viewBox="0 0 102 23" fill="none">
          <path d="M101.061 12.5607C101.646 11.9749 101.646 11.0251 101.061 10.4393L91.5147 0.893398C90.9289 0.307611 89.9792 0.307611 89.3934 0.893398C88.8076 1.47919 88.8076 2.42893 89.3934 3.01472L97.8787 11.5L89.3934 19.9853C88.8076 20.5711 88.8076 21.5208 89.3934 22.1066C89.9792 22.6924 90.9289 22.6924 91.5147 22.1066L101.061 12.5607ZM0 13H100V10H0V13Z" fill="black"/>
        </svg>
      </button>
    </div>
    <div class="pagination steps__pagination"></div>
  </section>

  <div class="scan bg-orange">
    <h2 class="title-secondary">to check the match of this routine to your skin create profile</h2>
    <img src="@/assets/img/global/qr.png" alt="qr-code">
  </div>

  <section v-if="beauty" class="reviews">
    <div class="reviews__content bg-img">
      <div class="reviews__content__top">
        <h3 class="title">All Reviews about this Routine</h3>
        <div class="rating">
          <h5 class="title">4.7/5</h5>
          <BaseRate :rates="4.5" :text="true"/>
        </div>
      </div>
    </div>
    <BaseReviews :text="true" :reviews="reviews" />
  </section>
  <section v-else class="reviews">
    <div class="reviews__content">
      <div class="reviews__content__top">
        <h3 class="title">All Reviews about this Routine</h3>
        <div class="rating">
          <h5 class="title">4.7/5</h5>
          <BaseRate :rates="4.5" :text="true"/>
        </div>
      </div>
      <div class="reviews__content__bottom">
        <img src="@/assets/img/global/qr.png" alt="qr-code">
        <h3 class="title-secondary">SCAN QR CODE TO SEE YOUR SKINTWINS EXPERIENCES WITH THIS ROUTINE</h3>
        <p class="txt">SkinTwins are the People with the same Skin Type, Age Group, Ethnicity origin, concerns, Skin conditions and Allergies. In other words Your Skin Twins.</p>
      </div>
    </div>
    <BaseReviews :text="true" :reviews="reviews" />
  </section>

  <div v-if="beauty" class="progress">
    <BeforeAfter/>
    <div class="progress__text">
      <div class="progress__text__top">
        <h1 class="title">Check Your Progress</h1>
        <p class="txt">People with the same age group, ethnicity origin, skin conditions and concerns are your SkinTwins .
          Use their experiences to make smart beauty decisions.</p>
      </div>
      <RouterLink to="/registration" class="link bold">Start Your Beauty Discovery <span>→</span></RouterLink>
    </div>
  </div>

  <section class="routines">
    <h1 class="title">Alternative Routines based on targets and applications</h1>
    <div class="routines__list">
      <RoutineCard
        v-for="routine in alternatives"
        :routine="routine"
        :key="routine.id"
      />
      <div class="routine-item bg-orange d-center">
        <RouterLink to="/" class="link bold">See more Routines Designed for You <span>→</span></RouterLink>
      </div>
    </div>
  </section>
  
  <AiAssistance v-if="!beauty"/>
  
  <div class="sidebar">
    <div class="sidebar-item">
      <a href="#full-details" class="txt-highlight">like this routine</a>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 38 34" fill="none">
          <path d="M19.9 31.8483C19.3269 32.0506 18.3831 32.0506 17.81 31.8483C12.922 30.1798 2 23.2191 2 11.4213C2 6.21348 6.19689 2 11.3714 2C14.439 2 17.1526 3.48314 18.855 5.77528C20.5574 3.48314 23.2879 2 26.3386 2C31.5131 2 35.71 6.21348 35.71 11.4213C35.71 23.2191 24.788 30.1798 19.9 31.8483Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <a href="#full-details" class="txt-highlight">add to your library TO START USING  THIS ROUTINE</a>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path d="M26.8265 31.2436L18.06 24.288C16.8707 23.3446 15.1313 23.3922 14.0007 24.3997L7.01491 31.2518C5.05811 32.998 1.85547 31.4691 1.85547 28.9181V4.91711C1.85547 3.30753 3.22741 2 4.92113 2H28.7898C30.4814 2 31.8555 3.30546 31.8555 4.91711V29.003C31.8555 31.4753 28.8246 32.8262 26.8287 31.2436H26.8265Z" stroke="currentColor" stroke-width="3" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <a href="#full-details" class="txt-highlight">share this routine</a>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
          <path d="M20.8555 1H31.8555M31.8555 1V12M31.8555 1L15.8555 17" stroke="currentColor" stroke-width="2"/>
          <path d="M13.8555 5H3.85547C2.7509 5 1.85547 5.89543 1.85547 7V29C1.85547 30.1046 2.7509 31 3.85547 31H25.8555C26.96 31 27.8555 30.1046 27.8555 29V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  </div>

  <TheFooter/>
</template>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid $black;

  &__image {
    background-image: url("@/assets/img/routine/main-img.png");
  }

  &__inner {
    position: relative;

    &__content {
      padding: 60px 60px 120px;
      .d-center {
        justify-content: left;
        padding-bottom: 40px;
        text-align: center;
      }
      h3 {
        padding-top: 40px;
        @media (max-width: 1200px) {
          padding-top: 20px;
        }
      }
      p {
        padding-top: 10px;
        max-width: 600px;
      }
      @media (max-width: 1200px) {
        padding: 20px 20px 40px;
        
        .title {
          padding-right: 100px;
        }
      }
    }
    &__info {
      position: relative;
      padding: 20px 40px;
      border-top: 1px solid $black;
      border-bottom: 1px solid $black;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 10px;

      &__left {
        h2 {
          font-size: 77px;
          font-weight: 700;
          text-transform: uppercase;
          padding-bottom: 15px;

          span {
            font-size: 65px;
          }
          @media (max-width: 1000px) {
            font-size: 55px;
            line-height: 40px;

            span {
              font-size: 45px;
            }
          }
        }
      }
      &__right {
        display: grid;
        justify-items: center;
        gap: 5px;
      }
      &__label {
        position: absolute;
        padding: 20px 40px;
        border-top: 1px solid $black;
        border-bottom: 1px solid $black;
        background-color: $white;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 10px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateX(100%);
        transition: .3s;

        &.active {
          transform: translateX(0);
        }
      }
      @media (max-width: 1200px) {
        padding: 20px;
      }
    }
    &__bottom {
      padding: 20px 40px;
      display: grid;
      justify-content: left;
      align-content: center;
      grid-template-columns: auto auto auto auto 1fr;
      gap: 20px;

      &__item {
        display: flex;
        gap: 5px;
        align-items: center;
        
        @media (max-width: 1200px) {
          p:not(:first-child) {
            display: none;
          }
        }
      }
      @media (max-width: 1200px) {
        padding: 20px;
      }
    }
    &__scan {
      position: absolute;
      top: 20px;
      right: 20px;
      display: grid;
      justify-items: center;
      grid-gap: 10px;

      .note {
        max-width: 100px;
        text-align: center;
      }
    }
  }
}

.scan {
  justify-content: center;

  h2 {
    max-width: 500px;
  }
}

.steps {
  padding: 60px 0;
  text-align: center;

  &__title {
    font-size: 52px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 40px 0;
  }
  &__inner {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: auto 700px auto;
    gap: 20px;

    .swiper {
      width: 100%;

      &__block {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 1fr;
        border: 1px solid $black;

        &__left {
          padding: 20px;
          border-right: 1px solid $black;
          display: grid;
          align-content: center;

          img {
            max-width: 90%;
            max-height: 300px;
            margin: 0 auto;
          }
        }
        &__right {
          text-align: left;
          padding: 20px;

          .txt {
            padding-bottom: 20px;
          }
        }
      }
    }
    @media (max-width: 1200px) {
      grid-template-columns: auto 600px auto;
    }
    @media (max-width: 1000px) {
      grid-template-columns: auto 400px auto;
    }
  }
  .pagination {
    padding: 40px 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
}

.reviews {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid $black;

  &__content {
    @include pad();
    border-top: 1px solid $black;
    border-right: 1px solid $black;
    min-height: 700px;
    display: grid;
    align-content: space-between;

    &.bg-img {
      background: linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url('@/assets/img/global/girls-smiling.png');
      color: #fff;
    }
    .rating {
      display: flex;
      align-items: center;
      justify-content: left;
      gap: 20px;

      h5 {
        font-weight: 700;
      }

      .rates {
        grid-template-columns: auto auto;
      }
    }
  }
}

.progress {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__text {
    display: grid;
    align-content: space-between;

    h1 {
      padding-bottom: 20px;
    }
    &__top {
      padding: 30px;
    }
    .link {
      @include pad();
      border-top: 1px solid $black;
      border-bottom: 1px solid $black;
    }
  }
}

.routines {
  padding: 60px 0;
  .title {
    border-bottom: 1px solid $black;
    text-align: center;
    padding: 30px 0;
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

  @media (max-width: 480) {
    display: none;
  }
}
</style>
