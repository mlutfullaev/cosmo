<script setup lang="ts">
import { ref } from 'vue'
import AiAssistance from '@/components/AiAssistance.vue'
import LuxAi from '@/components/LuxAi.vue'
import text from '@/assets/locales/productIntro.json'
import store from '../store'

const productPages = ref([
  'Full Details assistant',
  'Reviews and experiences',
  'Ai assistance',
  'Beauty routines',
  'Pricing near You',
  'Promo samples available'
])
const skinTwins = ref([
  'CHECK REVIEWS BEFORE YOU BUY',
  'SKINTWINS EXPERIENCES',
  'RECEIVE BEAUTY DISCOVERIES',
  'REMINDERS BASED ON EXPERIENCES'
])
</script>

<template>
  <TheHeader/>
  <main class="bg-img">
    <div class="main__content">
      <h2 class="title">{{text.mainTitle[store.state.lang]}}</h2>
      <h3 class="title-secondary">{{text.mainSubtitle[store.state.lang]}}</h3>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="32" viewBox="0 0 62 32" fill="none">
      <path d="M1 1L31 31L61 1" stroke="black"/>
    </svg>
    <h4 class="running-text">{{text.runningText[store.state.lang]}} → {{text.runningText[store.state.lang]}} → {{text.runningText[store.state.lang]}} → {{text.runningText[store.state.lang]}} → {{text.runningText[store.state.lang]}} → {{text.runningText[store.state.lang]}} → {{text.runningText[store.state.lang]}} →  {{text.runningText[store.state.lang]}} →</h4>
  </main>
  <div class="productIntro">
    <div class="productIntro-inner">
      <div class="productIntro-inner-content">
        <h2 class="title">{{text.makeMost[store.state.lang]}}</h2>
        <p class="txt">{{text.makeMostTxt[store.state.lang]}}</p>
        <h3
          class="title-secondary bold"
          v-for="(item, idx) in productPages"
          :key="item"
          v-motion
          :initial="{ x: -40, opacity: 0 }"
          :visible="{ x: 0, opacity: 1, transition: {duration: 400, delay: idx * 200}}"
          :delay="400">
          {{ idx + 1 < 10 ? '0' : '' }}{{ idx + 1 }} {{ item }}
        </h3>
      </div>
      <RouterLink to="/product-filter" class="link bold tablet-orange">{{text.startYourBeauty[store.state.lang]}}<span>→</span>
      </RouterLink>
    </div>
    <div class="bg-img" :style='{backgroundImage: `url("${require("@/assets/img/product/intro-1.png")}")`}'></div>
  </div>
  <div class="productIntro">
    <div class="bg-img" :style='{backgroundImage: `url("${require("@/assets/img/global/girls-smiling.png")}")`}'></div>
    <div class="productIntro-inner">
      <div class="productIntro-inner-content">
        <h2 class="title">{{text.connectWithSkintwins[store.state.lang]}}</h2>
        <p class="txt">{{text.connectTxt[store.state.lang]}}</p>
        <h3
          class="title-secondary bold"
          v-for="(item, idx) in skinTwins"
          :key="item"
          v-motion
          :initial="{ x: -40, opacity: 0 }"
          :visible="{ x: 0, opacity: 1, transition: {duration: 400, delay: idx * 150}}"
          :delay="400">
          {{ idx + 1 < 10 ? '0' : '' }}{{ idx + 1 }} {{ item }}
        </h3>
      </div>
      <RouterLink to="/registration" class="link bold tablet-orange">{{text.joinSkintwin[store.state.lang]}} <span>→</span>
      </RouterLink>
    </div>
  </div>
  <LuxAi/>
  <AiAssistance/>
  <TheFooter/>
</template>

<style lang="scss" scoped>
main {
  background-image: url("@/assets/img/product/intro-bg.png");
  text-align: center;
  overflow: hidden;

  .main__content {
    display: grid;
    align-content: center;
    justify-items: center;
    height: calc(100vh - 208px);
    padding-bottom: 20px;

    h2 {
      margin: 100px 0 20px;

      @media (max-width: 1000px) {
        margin: 30px 0 10px;
      }
    }
    h3 {
      margin-bottom: 50px;
      @media (max-width: 1200px) {
        margin-bottom: 0;
      }
    }
  }
  .running-text {
    margin-top: 65px;
    border-top: 1px solid black;
    font-size: 36px;
    text-transform: uppercase;
    width: max-content;
    transition: .3s;
    font-weight: 400;
    position: relative;
    animation-duration: 75s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-name: toLeft;

    @keyframes toLeft {
      0% {
        transform: translateX(-100%);
        left: 100%;
      }
      100% {
        transform: translateX(0);
        left: 0
      }
    }

    @media (max-width: 1000px) {
      font-size: 96px;
      line-height: 100px;
      animation-duration: 45s;
    }
    @media (max-width: 480px) {
      font-size: 56px;
      line-height: 55px;
    }
  }

  @media (max-width: 1000px) {
    padding: 30px 0;

    svg {
      display: none;
    }
  }
}

.productIntro {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &-inner {
    &-content {
      padding: 60px;

      p {
        margin: 10px 0 100px;

        @media (max-width: 1000px) {
          margin: 10px 0 40px;
        }
      }

      .title-secondary {
        padding-bottom: 30px;
        @media (max-width: 1000px) {
          padding-bottom: 10px;
        }
      }

      @media (max-width: 1200px) {
        padding: 60px 20px;
      }
      @media (max-width: 1000px) {
        padding: 40px 20px;
      }
    }

    .link {
      padding: 60px;
      display: block;
      background: $orange;

      @media (max-width: 1200px) {
        padding: 60px 20px;
      }
      @media (max-width: 1000px) {
        padding: 40px 20px;
      }
      @media (max-width: 768px) {
        border: none;
        text-align: center
      }
      @media (max-width: 480px) {
        padding: 16px 20px;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .bg-img {
      height: 400px;
      grid-row: 1;
    }
  }
}
</style>
