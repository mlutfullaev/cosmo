<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import store from '@/store'
import { useHelpers } from '@/useHelpers'
import { useRoute } from 'vue-router'
import { BasicResponse, Review, Routine } from '@/assets/interfaces'
import AiAssistance from '@/components/AiAssistance.vue'
import BaseRate from '@/baseComponents/BaseRate.vue'
import BeforeAfter from '@/components/BeforeAfter.vue'
import RoutineCard from '@/components/RoutineCard.vue'
import BaseSubscripe from '@/baseComponents/BaseSubscripe.vue'
import BaseHint from '@/baseComponents/BaseHint.vue'
import 'swiper/css'
import { API_URL, emptyRes } from '@/assets/constants'
import TheReviews from '@/components/TheReviews.vue'
import ThePagination from '@/layouts/ThePagination.vue'
import text from '@/assets/locales/singleRoutine.json'

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
const { beauty } = store.state

const steps = ref<Step[]>([])
const routine = ref<Routine | null>(null)
const reviews = ref<Review[]>([])
const alternatives = ref<BasicResponse<{routine: Routine}>>(emptyRes)
onMounted(() => {
  axios.get(`${API_URL}routines/byid/${route.params.id}`)
    .then(res => {
      routine.value = res.data.routine
      steps.value = res.data.steps
      updateMeta({ title: res.data.SEOpageTitle, description: res.data.SEOpageDescription, keywords: res.data.SEOpageKeywords })
    })
  axios.get(`${API_URL}reviewsroutines/byroutineid/${route.params.id}?order=ASC&page=1&take=10`)
    .then(res => {
      reviews.value = res.data.data
    })
  axios.get(`${API_URL}routines/randomnumber/11?order=ASC&page=1&take=11`)
    .then(res => {
      alternatives.value = res.data
    })
})

watch(route, () => {
  axios.get(`${API_URL}routines/byid/${route.params.id}`)
    .then(res => {
      routine.value = res.data.routine
      steps.value = res.data.steps
    })
})
</script>

<template>
  <TheHeader/>

  <div class="header__hint" :class="{active: store.state.showLater}">
    <button class="btn-black txt-highlight">{{text.guideMe[store.state.lang]}}</button>
    <button class="btn-black">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.03283 1C1.43866 1 1 1.45279 1 1.95856V13.9591C1 14.8181 2.09567 15.3217 2.73888 14.7599L6.23104 11.3345L6.23996 11.3266C6.9875 10.6604 8.12872 10.6302 8.91299 11.2523L13.1598 14.6218H13.1608L13.2973 14.73C14.0048 15.2911 15 14.7724 15 14.0015V1.95856C15 1.45221 14.5607 1 13.9672 1H2.03283ZM0 1.95856C0 0.854735 0.933283 0 2.03283 0H13.9672C15.0652 0 16 0.853251 16 1.95856V14.0015C16 15.6384 14.1157 16.4708 12.8255 15.6218H12.8112L8.29153 12.0357C7.88934 11.7167 7.29671 11.7315 6.91336 12.066L3.42142 15.4911L3.41262 15.499C2.0979 16.6722 0 15.6474 0 13.9591V1.95856Z" fill="white"/>
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
  </div>

  <main v-if="routine" class="main">
    <div class="main__image bg-img"></div>
    <div class="main__inner">
      <div class="main__inner__top">
        <h2 class="section-text">{{text.mainTitle[store.state.lang]}}</h2>
        <p class="txt">{{text.mainSubtitle[store.state.lang]}}</p>
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
            <span class="your-skin" v-if="true">{{text.yourSkin[store.state.lang]}}</span>
          </p>
          <BaseRate rates="4.5" :text="true" />
        </div>
        <div>
          <div class="d-sb">
            <h3>{{text.routineBudget[store.state.lang]}}: </h3>
            <h3 class="bold t-up">130 {{text.euro[store.state.lang]}}</h3>
          </div>
          <div class="txt grey">{{text.weEstimateBudget[store.state.lang]}}</div>
        </div>
      </div>
    </div>
  </main>

  <section v-show="false" class="info bg-img">
    <div class="hint-content">
      <h2>{{text.beauty[store.state.lang]}} <span>{{text.meter[store.state.lang]}}</span></h2>
      <BaseHint hint="bla bla bla bla" />
    </div>
    <div class="section-subtitle">
      <h3>130</h3>
      <p>{{text.beautiesTried[store.state.lang]}} </p>
    </div>
    <div class="info__inner">
      <h3>{{text.verifiedResults[store.state.lang]}}</h3>
      <div class="info__inner__item">
        <p class="txt-highlight">{{text.wrinckles[store.state.lang]}}</p>
        <p class="name">{{text.wrincklesText[store.state.lang]}}</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">{{text.wrinckles[store.state.lang]}}</p>
        <p class="name">{{text.wrincklesText[store.state.lang]}}</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">{{text.wrinckles[store.state.lang]}}</p>
        <p class="name">{{text.wrincklesText[store.state.lang]}}</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">{{text.wrinckles[store.state.lang]}}</p>
        <p class="name">{{text.wrincklesText[store.state.lang]}}</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">{{text.wrinckles[store.state.lang]}}</p>
        <p class="name">{{text.wrincklesText[store.state.lang]}}</p>
        <h3>15%</h3>
      </div>
      <div class="info__inner__item">
        <p class="txt-highlight">{{text.wrinckles[store.state.lang]}}</p>
        <p class="name">{{text.wrincklesText[store.state.lang]}}</p>
        <h3>15%</h3>
      </div>
    </div>
  </section>

  <section class="steps" v-if="steps.length">
    <div class="steps__text">
      <h2 class="section-title">5 {{text.stepBeautyRitual[store.state.lang]}}</h2>
      <p class="txt">{{text.stepTxt[store.state.lang]}}</p>
    </div>
    <div class="steps__inner bg-img">
      <div class="steps__inner__content block-scroll">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="steps__item">
          <div class="steps__item__text">
            <h3 class="section-text">{{step.stepName}}</h3>
            <p class="txt">{{step.stepDescription}}</p>
          </div>
          <h3 class="steps__item__step">{{index + 1}}.</h3>
        </div>
      </div>
    </div>
    <button @click="store.commit('updateModalSubscribe', true)"  class="link bg-orange">{{text.seeProducts[store.state.lang]}} <span>→</span></button>
  </section>

  <TheReviews />

  <div class="progress">
    <div class="progress__text">
      <div class="progress__text__top">
        <h2 class="section-title">{{text.checkYourProgress[store.state.lang]}}</h2>
        <p class="txt">{{text.checkYourProgressTxt[store.state.lang]}}</p>
      </div>
      <button @click="store.commit('updateModalSubscribe', true)" class="link bg-orange">{{text.startDiscovery[store.state.lang]}} <span>→</span></button>
    </div>
    <BeforeAfter/>
  </div>

  <section id="routine" class="routines" v-if="alternatives.data.length">
    <div class="routines__top">
      <h2 class="section-title">{{text.alternativeRoutines[store.state.lang]}}</h2>
      <div class="section-subtitle">
        <h3>130</h3>
        <p>{{text.alternativeRoutinesSubtitle[store.state.lang]}}</p>
      </div>
      <p class="txt">
        {{text.alternativeRoutinesTxt[store.state.lang]}}</p>
    </div>
    <div class="routines__list">
      <RoutineCard v-for="routine in alternatives.data" :routine="routine.routine" :key="routine.routine.id" />
      <div v-if="!beauty" class="routine-item center bg-orange min-tablet">
        <router-link to="#" class="link bold">{{text.seeMoreRoutines[store.state.lang]}}<span>→</span></router-link>
      </div>
    </div>
    <ThePagination v-if="alternatives.meta.pageCount > 1" :meta="alternatives.meta" />
    <router-link v-if="!beauty" to="#" class="link bold tablet bg-orange">{{text.seeMoreRoutines[store.state.lang]}}<span>→</span></router-link>
  </section>

  <AiAssistance v-if="!beauty"/>

  <BaseSubscripe />

  <TheFooter/>
</template>

<style lang="scss" scoped>
.header__hint {
  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
  }
}

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
      padding-bottom: 40px;

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

        @media (max-width: 1000px) {
          font-size: 24px;
        }
        @media (max-width: 480px) {
          font-size: 18px;
        }
      }
      .d-sb:first-child {
        padding-bottom: 20px;
      }
    }

    @media (max-width: 1200px) {
      padding: 60px 20px;
    }
    @media (max-width: 768px) {
      padding: 20px;
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
  grid-template-columns: 300px auto auto;
  align-items: center;
  padding: 60px;
  background-image: url("@/assets/img/global/bg.jpg");

  .hint-content {
    h2 {
      font-size: 65px;
      font-weight: 700;
      line-height: 60px;
      color: $orange;
      text-transform: uppercase;

      span {
        font-size: 77px;

        @media (max-width: 768px) {
          font-size: inherit;
        }
      }
      @media (max-width: 768px) {
        font-weight: 500;
      }
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

    @media (max-width: 900px) and (min-width: 768px) {
      grid-column: 1 / 3;
    }
  }

  @media (max-width: 1400px) {
    padding: 60px 40px;
    grid-gap: 20px;
  }
  @media (max-width: 1200px) {
    padding: 60px 20px;
  }
  @media (max-width: 900px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.steps {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__text {
    padding: 100px 20px 20px;

    h2 {
      padding-bottom: 30px;
    }

    @media (max-width: 1000px) {
      padding-top: 20px;
    }
  }
  &__inner {
    border-left: 1px solid $black;
    background-position: top center;
    background-image: url("@/assets/img/routine/steps-bg.png");
    grid-row: 1 / 3;

    padding: 100px 20px;

    &__content {
      max-height: 665px;
      overflow-y: auto;

      .steps__item {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 5px;

        &__text {
          h3 {
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

          @media (max-width: 1000px) {
            font-size: 56px;
          }
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

    @media (max-width: 1000px) {
      padding: 50px 20px;
    }
    @media (max-width: 768px) {
      grid-row: 2;
    }
  }
  button {
    grid-column: 1;
    grid-row: 2;
    align-self: end;

    @media (max-width: 768px) {
      grid-row: 3;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.progress {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__text {
    display: grid;
    align-content: space-between;

    &__top {
      padding: 60px;

      h2 {
        padding-bottom: 20px;
      }
      @media (max-width: 1200px) {
        padding: 60px 20px;
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
  .link.tablet {
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }
  @media (max-width: 1000px) {
    padding-top: 50px;
  }
}
</style>
