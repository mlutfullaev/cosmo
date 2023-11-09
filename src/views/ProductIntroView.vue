<script lang="ts">
import { defineComponent } from 'vue'
import AiAssistance from '@/components/AiAssistance.vue'
import LuxAi from '@/components/LuxAi.vue'

export default defineComponent({
  components: {
    LuxAi,
    AiAssistance
  },
  data: () => ({
    productPages: [
      'Full Details assistant',
      'Reviews and experiences',
      'Ai assistance',
      'Beauty routines',
      'Pricing near You',
      'Promo samples available'
    ],
    skinTwins: [
      'CHECK REVIEWS BEFORE YOU BUY',
      'SKINTWINS EXPERIENCES',
      'RECEIVE BEAUTY DISCOVERIES',
      'REMINDERS BASED ON EXPERIENCES'
    ]
  })
})
</script>

<template>
  <TheHeader/>
  <main class="bg-img">
    <h1 class="first-title">la roche posay Chanel Siseido La roche posay</h1>
    <h1 class="second-title">la roche posay Chanel Siseido La roche posay</h1>
    <h2 class="title">Beauty Products Interactive Library</h2>
    <h3 class="title-secondary">Connecting You with Brands explaining their products</h3>
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="32" viewBox="0 0 62 32" fill="none">
      <path d="M1 1L31 31L61 1" stroke="black"/>
    </svg>
  </main>
  <div class="productIntro">
    <div class="productIntro-inner">
      <div class="productIntro-inner-content">
        <h2 class="title">Make most from Product Page</h2>
        <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive
          maximum details about products and experiences Your SkinTwins had with this product. Check details, receive
          Answers, collect samples and Discover Alternative Productsdirectly from Product Interactive Label.
        </p>
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
      <RouterLink to="/product-filter" class="link bold tablet-orange">Start Your Beauty Discovery <span>→</span>
      </RouterLink>
    </div>
    <div class="bg-img" :style='{backgroundImage: `url("${require("@/assets/img/product/intro-1.png")}")`}'></div>
  </div>
  <div class="productIntro">
    <div class="bg-img" :style='{backgroundImage: `url("${require("@/assets/img/global/girls-smiling.png")}")`}'></div>
    <div class="productIntro-inner">
      <div class="productIntro-inner-content">
        <h2 class="title">Соnnect with your SkinTwins</h2>
        <p class="txt">Your SkinTwins are the people with the same skin, age group, ethinical origin, skin condition and
          concerns. We let You to check experiences of the second You to check experiences with the products which are
          most relevant to You.</p>
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
      <RouterLink to="/registration" class="link bold tablet-orange">JOIN YOU SKINTWIN COMMUNITY <span>→</span>
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
  padding-bottom: 40px;

  h1 {
    color: $grey;
    font-size: 250px;
    width: max-content;
    transition: .3s;
    font-weight: 400;
    line-height: 230px;
    position: relative;
    animation-duration: 40s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    &.first-title {
      animation-name: toRight;
    }

    &.second-title {
      animation-name: toLeft;
    }

    @keyframes toRight {
      0% {
        transform: translateX(0);
        left: 0;
      }
      50% {
        transform: translateX(-100%);
        left: 100%
      }
      100% {
        transform: translateX(0);
        left: 0;
      }
    }

    @keyframes toLeft {
      0% {
        transform: translateX(-100%);
        left: 100%;
      }
      50% {
        transform: translateX(0);
        left: 0
      }
      100% {
        transform: translateX(-100%);
        left: 100%;
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
      border-top: 1px solid $black;
      border-bottom: 1px solid $black;

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
