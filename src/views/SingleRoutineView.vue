<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { Product, Review, Routine } from '@/interfaces'
import AiAssistance from '@/components/AiAssistance.vue'
import BaseRate from '@/components/BaseRate.vue'
import BaseReviews from '@/components/BaseReviews.vue'
import BeforeAfter from '@/components/BeforeAfter.vue'
import RoutineCard from '@/components/RoutineCard.vue'
import 'swiper/css'
import store from '@/store'
import BaseSubscripe from '@/components/BaseSubscripe.vue'
import ModalSubscribe from '@/components/ModalSubscribe.vue'
import { useHelpers } from '@/useHelpers'
import BaseHint from '@/components/BaseHint.vue'

interface Step {
  stepOrder: number,
  stepName: string,
  stepDescription: string,
  stepManual: string,
  id: number,
  idStepGood: number,
}

const route = useRoute()
const { updateMeta } = useHelpers()

const steps = ref<Step[]>([])
const routine = ref<Routine | null>(null)
const reviews = ref<Review[]>([])
const alternatives = ref<{routine: Routine}[]>([])
onMounted(() => {
  axios.get(`https://api-www.beautyid.app/routines/byid/${route.params.id}`)
    .then(res => {
      routine.value = res.data.routine
      steps.value = res.data.steps
      updateMeta({ title: res.data.SEOpageTitle, description: res.data.SEOpageDescription, keywords: res.data.SEOpageKeywords })
    })
  axios.get(`https://api-www.beautyid.app/reviewsroutines/byroutineid/${route.params.id}?order=ASC&page=1&take=10`)
    .then(res => {
      reviews.value = res.data.data
    })
  axios.get('https://api-www.beautyid.app/routines/randomnumber/11?order=ASC&page=1&take=11')
    .then(res => {
      alternatives.value = res.data.data
    })
})

watch(route, () => {
  axios.get(`https://api-www.beautyid.app/routines/byid/${route.params.id}`)
    .then(res => {
      routine.value = res.data.routine
      steps.value = res.data.steps
    })
})

const modalActive = ref(false)

const checkBeauty = () => {
  store.commit('checkBeauty')
}
</script>

<template>
  <TheHeader/>

  <main v-if="routine" class="main">
    <div class="main__image bg-img"></div>
    <div class="main__inner">
      <div class="main__inner__top">
        <h2>Spring Revitalising Routine</h2>
        <p class="txt">Personalized Beauty Routine for Individuals for scandic people with oily problematic skin. Unlock the Secrets of Scandic Beauty: Embrace a Natural, Effortless, and Radiant Routine.</p>
        <div class="d-center">
          <router-link to="#">#dry skin</router-link>
          <router-link to="#">#5step</router-link>
          <router-link to="#">dry skin</router-link>
          <router-link to="#">natural</router-link>
        </div>
      </div>
      <div class="main__inner__bottom">
        <div class="d-sb">
          <p class="txt-highlight d-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
              <path d="M30 15.5C30 7.235 23.265 0.5 15 0.5C6.735 0.5 0 7.235 0 15.5C0 19.85 1.875 23.765 4.845 26.51C4.845 26.525 4.845 26.525 4.83 26.54C4.98 26.69 5.16 26.81 5.31 26.945C5.4 27.02 5.475 27.095 5.565 27.155C5.835 27.38 6.135 27.59 6.42 27.8C6.525 27.875 6.615 27.935 6.72 28.01C7.005 28.205 7.305 28.385 7.62 28.55C7.725 28.61 7.845 28.685 7.95 28.745C8.25 28.91 8.565 29.06 8.895 29.195C9.015 29.255 9.135 29.315 9.255 29.36C9.585 29.495 9.915 29.615 10.245 29.72C10.365 29.765 10.485 29.81 10.605 29.84C10.965 29.945 11.325 30.035 11.685 30.125C11.79 30.155 11.895 30.185 12.015 30.2C12.435 30.29 12.855 30.35 13.29 30.395C13.35 30.395 13.41 30.41 13.47 30.425C13.98 30.47 14.49 30.5 15 30.5C15.51 30.5 16.02 30.47 16.515 30.425C16.575 30.425 16.635 30.41 16.695 30.395C17.13 30.35 17.55 30.29 17.97 30.2C18.075 30.185 18.18 30.14 18.3 30.125C18.66 30.035 19.035 29.96 19.38 29.84C19.5 29.795 19.62 29.75 19.74 29.72C20.07 29.6 20.415 29.495 20.73 29.36C20.85 29.315 20.97 29.255 21.09 29.195C21.405 29.06 21.72 28.91 22.035 28.745C22.155 28.685 22.26 28.61 22.365 28.55C22.665 28.37 22.965 28.205 23.265 28.01C23.37 27.95 23.46 27.875 23.565 27.8C23.865 27.59 24.15 27.38 24.42 27.155C24.51 27.08 24.585 27.005 24.675 26.945C24.84 26.81 25.005 26.675 25.155 26.54C25.155 26.525 25.155 26.525 25.14 26.51C28.125 23.765 30 19.85 30 15.5ZM22.41 22.955C18.345 20.225 11.685 20.225 7.59 22.955C6.93 23.39 6.39 23.9 5.94 24.455C3.66 22.145 2.25 18.98 2.25 15.5C2.25 8.465 7.965 2.75 15 2.75C22.035 2.75 27.75 8.465 27.75 15.5C27.75 18.98 26.34 22.145 24.06 24.455C23.625 23.9 23.07 23.39 22.41 22.955Z" fill="black"/>
              <path d="M15 7.89453C11.895 7.89453 9.375 10.4145 9.375 13.5195C9.375 16.5645 11.76 19.0395 14.925 19.1295H15.06H15.165H15.195C18.225 19.0245 20.61 16.5645 20.625 13.5195C20.625 10.4145 18.105 7.89453 15 7.89453Z" fill="black"/>
            </svg>
            {{ routine.authorName }}
            <span class="your-skin" v-if="true">Your skintwin</span>
          </p>
          <BaseRate rates="4.5" :text="true" />
        </div>
        <div class="d-sb">
          <div>
            <h3>ROUTINE BUDGET: </h3>
            <div class="txt grey">We estimate Budget of this Routine  based on average pricing in your area.</div>
          </div>
          <h3 class="bold">130 EURO</h3>
        </div>
      </div>
    </div>
    <div class="main__hint">
      <button class="txt-highlight">GUIDE ME</button>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.03283 1C1.43866 1 1 1.45279 1 1.95856V13.9591C1 14.8181 2.09567 15.3217 2.73888 14.7599L6.23104 11.3345L6.23996 11.3266C6.9875 10.6604 8.12872 10.6302 8.91299 11.2523L13.1598 14.6218H13.1608L13.2973 14.73C14.0048 15.2911 15 14.7724 15 14.0015V1.95856C15 1.45221 14.5607 1 13.9672 1H2.03283ZM0 1.95856C0 0.854735 0.933283 0 2.03283 0H13.9672C15.0652 0 16 0.853251 16 1.95856V14.0015C16 15.6384 14.1157 16.4708 12.8255 15.6218H12.8112L8.29153 12.0357C7.88934 11.7167 7.29671 11.7315 6.91336 12.066L3.42142 15.4911L3.41262 15.499C2.0979 16.6722 0 15.6474 0 13.9591V1.95856Z" fill="white"/>
        </svg>
      </button>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.399 1.43749H9.3744V0.5H14.9994V6.12496H14.0619V2.1004L7.36213 8.80014L6.69922 8.13724L13.399 1.43749Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.34373 3.31249C1.56709 3.31249 0.937493 3.94209 0.937493 4.71873V13.1562C0.937493 13.9328 1.56709 14.5624 2.34373 14.5624H10.7812C11.5578 14.5624 12.1874 13.9328 12.1874 13.1562V9.4062C12.1874 9.14731 12.3973 8.93745 12.6562 8.93745C12.915 8.93745 13.1249 9.14731 13.1249 9.4062V13.1562C13.1249 14.4506 12.0756 15.4999 10.7812 15.4999H2.34373C1.04932 15.4999 0 14.4506 0 13.1562V4.71873C0 3.42432 1.04932 2.375 2.34373 2.375H6.0937C6.35259 2.375 6.56245 2.58486 6.56245 2.84375C6.56245 3.10263 6.35259 3.31249 6.0937 3.31249H2.34373Z" fill="white"/>
        </svg>
      </button>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33167 0.5C11.1172 0.512682 14.1739 3.04315 14.8668 6.62848C15.6384 10.6267 12.9478 14.6001 8.95385 15.3581C7.24201 15.6835 5.60854 15.4477 4.05589 14.6674C4.0553 14.6672 4.05451 14.667 4.05351 14.6667C4.0483 14.6653 4.04027 14.6637 4.03014 14.6627C4.02006 14.6618 4.01023 14.6616 4.00171 14.6621C3.99758 14.6623 3.99424 14.6627 3.99179 14.663C3.99053 14.6632 3.98962 14.6634 3.98904 14.6635C3.58189 14.7656 3.18586 14.8723 2.78535 14.9802C2.49321 15.0589 2.19868 15.1382 1.89571 15.2169C1.89561 15.2169 1.89582 15.2169 1.89571 15.2169C1.20306 15.3971 0.484521 15.0457 0.287926 14.3214L0.287449 14.3196C0.225967 14.0895 0.226525 13.8294 0.284226 13.6019C0.28411 13.6023 0.283995 13.6028 0.28388 13.6032L0.738817 13.7162L0.28458 13.6005C0.284462 13.6009 0.284343 13.6014 0.284226 13.6019C0.458888 12.8985 0.649792 12.1993 0.84074 11.5054L0.840967 11.5045C0.848236 11.4783 0.847035 11.4687 0.846882 11.4675C0.846691 11.4657 0.845283 11.4527 0.829803 11.422C0.829906 11.4222 0.830009 11.4224 0.830112 11.4226L1.24791 11.21L0.829492 11.4213C0.829596 11.4216 0.8297 11.4218 0.829803 11.422C-1.34349 7.14906 0.921176 2.02308 5.54148 0.755665C6.17567 0.582342 6.82623 0.501632 7.32858 0.5L7.33167 0.5ZM7.3301 1.4375C6.91301 1.43902 6.34573 1.50778 5.78934 1.65981C1.74201 2.77014 -0.239146 7.25317 1.6657 10.9975L1.66632 10.9987C1.78741 11.2385 1.81913 11.485 1.74452 11.7545C1.55345 12.4489 1.36532 13.1382 1.19375 13.8292L1.19305 13.8319C1.17355 13.9085 1.17415 14.0057 1.19294 14.0767C1.24149 14.2539 1.41239 14.374 1.65976 14.3096C1.94281 14.2361 2.23282 14.158 2.52486 14.0794C2.93791 13.9682 3.35566 13.8557 3.76598 13.7529L3.77157 13.7515C3.98592 13.7006 4.25531 13.7189 4.47183 13.8272L4.47286 13.8277C5.84501 14.5183 7.27054 14.7238 8.7788 14.4371C12.2613 13.7762 14.6199 10.2967 13.9464 6.80637C13.3405 3.67121 10.677 1.4494 7.3301 1.4375Z" fill="white"/>
          <path d="M10.7892 8.79804C10.5653 8.79804 10.3787 8.72336 10.2279 8.57102C10.0771 8.42017 10.001 8.23348 10.001 8.00945C10.001 7.78541 10.0756 7.59872 10.2279 7.44787C10.3787 7.29702 10.5653 7.22085 10.7892 7.22085C11.0132 7.22085 11.1998 7.29553 11.3506 7.44787C11.5014 7.59872 11.5775 7.78541 11.5775 8.00945C11.5775 8.23348 11.5029 8.42017 11.3506 8.57102C11.1998 8.72187 11.0132 8.79804 10.7892 8.79804Z" fill="white"/>
          <path d="M4.20843 8.75169C3.98449 8.75169 3.79788 8.67701 3.64709 8.52467C3.4963 8.37382 3.42017 8.18713 3.42017 7.9631C3.42017 7.73907 3.49481 7.55237 3.64709 7.40152C3.79788 7.25067 3.98449 7.1745 4.20843 7.1745C4.43237 7.1745 4.61899 7.24918 4.76977 7.40152C4.92056 7.55237 4.9967 7.73907 4.9967 7.9631C4.9967 8.18713 4.92205 8.37382 4.76977 8.52467C4.61899 8.67552 4.43237 8.75169 4.20843 8.75169Z" fill="white"/>
          <path d="M7.42376 8.82482C7.19983 8.82482 7.01321 8.75014 6.86242 8.5978C6.71164 8.44695 6.6355 8.26026 6.6355 8.03622C6.6355 7.81219 6.71014 7.6255 6.86242 7.47465C7.01321 7.3238 7.19983 7.24763 7.42376 7.24763C7.6477 7.24763 7.83432 7.32231 7.98511 7.47465C8.13589 7.6255 8.21203 7.81219 8.21203 8.03622C8.21203 8.26026 8.13739 8.44695 7.98511 8.5978C7.83432 8.74865 7.6477 8.82482 7.42376 8.82482Z" fill="white"/>
        </svg>
      </button>
    </div>
  </main>

  <section class="info bg-img">
    <div class="hint-content">
      <h2>beauty <br /> <span>meter</span></h2>
      <BaseHint hint="bla bla bla bla" />
    </div>
    <div class="d-center">
      <h2 class="orange">130</h2>
      <h3>Beauties tried this routine and evaluated their results </h3>
    </div>
    <div class="info__inner">
      <h3>VERIFIED RESULTS in 8 weeks</h3>
      <div class="info__inner__item">
        <p class="txt-highlight">WRINCKLES</p>
        <p class="name">improvement by average</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">WRINCKLES</p>
        <p class="name">improvement by average</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">WRINCKLES</p>
        <p class="name">improvement by average</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">WRINCKLES</p>
        <p class="name">improvement by average</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">WRINCKLES</p>
        <p class="name">improvement by average</p>
        <h3>15%</h3>
      </div>
    </div>
  </section>

  <section class="steps" v-if="steps.length">
    <div class="steps__text">
      <div class="steps__text__content">
        <h2 class="section-title">5 Step Beauty Ritual</h2>
        <p class="txt">This routine is intended for use during Spring and Early Summer to keep Dry skin hydrated and prepared for comming Summer direct sun exposure.  Noisturing skin done on multiple steps and provided universal get-prepared foundation for next step in Your Beauty Journey.</p>
      </div>
      <button @click="modalActive = true"  class="link bg-orange">SEE PRODUCTS USED IN THIS ROUTINE <span>→</span></button>
    </div>
    <div class="steps__inner bg-img">
      <div class="steps__inner__content">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="steps__item">
          <div class="steps__item__text">
            <h3>{{step.stepName}}</h3>
            <p class="txt">{{step.stepDescription}}</p>
          </div>
          <h3 class="steps__item__step">{{index + 1}}.</h3>
        </div>
      </div>
    </div>
  </section>

  <section id="reviews" class="reviews">
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

  <div class="progress">
    <div class="progress__text">
      <div class="progress__text__top">
        <h2 class="section-title">Check Your Progress</h2>
        <p class="txt">People with the same age group, ethnicity origin, skin conditions and concerns are your SkinTwins .
          Use their experiences to make smart beauty decisions.</p>
      </div>
      <button @click="modalActive = true" class="link bg-orange">Start Your Beauty Discovery <span>→</span></button>
    </div>
    <BeforeAfter/>
  </div>

  <section id="routine" class="routines" v-if="alternatives.length">
    <div class="routines__top">
      <div>
        <h2 class="section-title">Alternative Routines</h2>
        <div class="section-subtitle">
          <h3>130</h3>
          <p>Beautyties are using this product in their registered routines</p>
        </div>
      </div>
      <p class="txt">Beauty Routines where Natural Leaf Argon Oil is used as part of the ritual. These Routines are selected based on the general use without any skin type or skin specifics filtration. To see personalised routines recommendation You should login.  </p>
    </div>
    <div class="routines__list">
      <RoutineCard v-for="routine in alternatives" :routine="routine.routine" :key="routine.routine.id" />
      <div class="routine-item center bg-orange">
        <router-link to="#" class="link bold bg-orange">SEE MORE ROUTINES <span>→</span></router-link>
      </div>
    </div>
  </section>

  <AiAssistance v-if="!store.state.beauty"/>

  <BaseSubscripe />

  <div class="modal" :class="{active: modalActive}" @click="modalActive = false">
    <ModalSubscribe :active="modalActive" />
  </div>

  <div class="sidebar">
    <div class="sidebar-item">
      <a href="#" class="txt-highlight">like this routine</a>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 38 34" fill="none">
          <path d="M19.9 31.8483C19.3269 32.0506 18.3831 32.0506 17.81 31.8483C12.922 30.1798 2 23.2191 2 11.4213C2 6.21348 6.19689 2 11.3714 2C14.439 2 17.1526 3.48314 18.855 5.77528C20.5574 3.48314 23.2879 2 26.3386 2C31.5131 2 35.71 6.21348 35.71 11.4213C35.71 23.2191 24.788 30.1798 19.9 31.8483Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <a href="#" class="txt-highlight">add to your library TO START USING  THIS ROUTINE</a>
      <div class="sidebar-content d-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path d="M26.8265 31.2436L18.06 24.288C16.8707 23.3446 15.1313 23.3922 14.0007 24.3997L7.01491 31.2518C5.05811 32.998 1.85547 31.4691 1.85547 28.9181V4.91711C1.85547 3.30753 3.22741 2 4.92113 2H28.7898C30.4814 2 31.8555 3.30546 31.8555 4.91711V29.003C31.8555 31.4753 28.8246 32.8262 26.8287 31.2436H26.8265Z" stroke="currentColor" stroke-width="3" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
    <div class="sidebar-item">
      <a href="#" class="txt-highlight">share this routine</a>
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
  min-height: 632px;
  position: relative;
  border-bottom: 1px solid $black;

  &__image {
    background-image: url("@/assets/img/routine/main-img.png");
  }
  &__inner {
    display: grid;
    align-content: space-between;

    padding: 60px;

    &__top {
      h2 {
        font-size: 36px;
      }
      p {
        padding: 10px 0;
      }
      .d-center {
        width: max-content;

        a {
          color: $grey-dark;
        }
      }
    }
    &__bottom {
      display: grid;
      grid-gap: 40px;

      h3 {
        font-size: 32px;
        text-transform: uppercase;
        font-weight: 500;

        &.bold {
          font-weight: 700;
        }
      }
    }
  }
  &__hint {
    display: flex;
    position: absolute;
    top: 0;
    right: 20px;

    button {
      background: #000;
      color: #fff;
      padding: 12px;
      transition: .3s;
      margin-left: 1px;
      border: none;

      &:hover {
        background: $orange;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 500px auto;
  }
}

.info {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: auto auto auto;
  align-items: center;
  padding: 60px;
  background-image: url("@/assets/img/product/claims-bg.jpg");

  .hint-content {
    h2 {
      font-size: 65px;
      font-weight: 700;
      line-height: 60px;
      color: $orange;
      text-transform: uppercase;

      span {
        font-size: 77px;
      }
    }
  }
  .d-center {
    h2 {
      font-weight: 400;
      font-size: 96px;
    }
    h3 {
      font-size: 36px;
      font-weight: 700;
    }
  }
  &__inner {
    h3 {
      font-size: 32px;
      font-weight: 400;
      text-transform: uppercase;
      padding-bottom: 5px;
    }
    &__item {
      display: grid;
      grid-template-columns: 1fr auto auto;
      grid-gap: 20px;
      border-bottom: 1px solid $black;
      align-items: center;

      &:last-child {
        border-bottom: none;
      }
    }
  }
;
}

.steps {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__text {
    display: grid;
    grid-template-rows: 1fr auto;
    padding-top: 100px;

    &__content {
      padding: 0 20px;
    }
    h2 {
      padding-bottom: 30px;
    }
  }
  &__inner {
    border-left: 1px solid $black;
    background-image: url("@/assets/img/routine/steps-bg.png");

    padding: 100px 20px;

    &__content {
      max-height: 700px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 7px;
      }
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      &::-webkit-scrollbar-thumb {
        background: #888;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      .steps__item {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 5px;

        &__text {
          h3 {
            font-size: 36px;
            font-weight: bold;
            border-bottom: 1px solid $orange;

            padding-bottom: 10px;
            margin-bottom: 5px;
          }
        }
        &__step {
          font-size: 96px;
          color: $orange;
          font-weight: 400;
          position: relative;
          top: -10px;
        }
        &:nth-child(even) {
          .steps__item__step {
            grid-column: 2;
            grid-row: 1
          }
          .steps__item__text {
            grid-column: 3;
          }
        }
      }
    }
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
        padding: 10px 0;
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

.progress {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__text {
    display: grid;
    align-content: space-between;

    &__top {
      padding: 30px;

      h2 {
        padding-bottom: 40px;
      }
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
