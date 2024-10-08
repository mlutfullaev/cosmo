<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import store from '@/store'
import text from '@/assets/locales/components.json'

defineProps({
  routerLink: {
    type: Object as PropType<{value: string, link: string}>,
    default: () => ({
      value: 'Discover more',
      link: '/routine-intro'
    }),
    required: false
  },
  intro: {
    type: Boolean,
    required: false,
    default: false,
  }
})
const checkBeauty = () => {
  store.commit('checkBeauty')
}
</script>

<template>
  <section id="routine" class="routine">
    <h1 class="routine-title">{{text.routineGuide[store.state.lang]}}</h1>
    <div class="routine-inner">
      <img src="@/assets/img/product/routine-1.png" class="min-tablet routine-item-img" alt="routine-img">
      <img src="@/assets/img/product/routine-1-tablet.png" class="tablet min-phone routine-item-img" alt="routine-img">
      <img src="@/assets/img/product/routine-1-phone.png" class="phone routine-item-img" alt="routine-img">
      <div class="routine-item-discover">
        <p class="txt" v-if="!intro">{{text.routineGuideTxt[store.state.lang]}}</p>
        <router-link :to="routerLink.link" class="link bold tablet-orange">{{ routerLink.value }} <span>→</span>
        </router-link>
      </div>
      <div class="routine-item-share" v-if="!intro">
        <h3 class="title">{{text.shareWithFriends[store.state.lang]}}</h3>
        <p class="txt">{{text.makeRoutine[store.state.lang]}}</p>
      </div>
      <div class="routine-item-signup d-center" v-if="!intro">
        <router-link to="/registration" class="link bold tablet-orange">{{text.signUp[store.state.lang]}} <span>→</span></router-link>
      </div>
      <div class="d-center routine-item-scan" v-if="!intro">
        <div class="scan-content">
          <h3 class="title">{{text.checkRoutines[store.state.lang]}}</h3>
          <p class="txt">{{text.WeCollectBeautyProducts[store.state.lang]}}.</p>
        </div>
        <img @click="checkBeauty" src="@/assets/img/global/qr.png" alt="" v-if="!intro">
      </div>
    </div>
    <router-link to="#" class="tablet link bold tablet-orange">{{text.signUp[store.state.lang]}} <span>→</span></router-link>
  </section>
</template>

<style lang="scss" scoped>
.routine {
  .routine-title {
    font-size: 250px;
    text-transform: uppercase;
    color: $orange;
    font-weight: 400;

    @media (max-width: 1200px) {
      font-size: 162px;
    }
    @media (max-width: 1000px) {
      font-size: 130px;
    }
    @media (max-width: 768px) {
      font-size: 96px;
    }
    @media (max-width: 550px) {
      font-size: 80px;
    }
  }

  &-inner {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid $black;
    border-left: 1px solid $black;

    a {
      font-weight: 700;
    }

    .scan {
      padding: 0;
    }

    > div {
      border-bottom: 1px solid $black;
      border-right: 1px solid $black;
      //padding: $padding;
      @include pad();

      h3 {
        padding-bottom: 20px;
      }
    }

    .routine-item-img {
      width: 70%;

      @media (max-width: 1200px) {
        width: 80%;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
    }

    .routine-item-discover {
      width: 30%;
      display: grid;
      align-content: space-between;

      @media (max-width: 1200px) {
        width: 20%;
      }
      @media (max-width: 768px) {
        padding: 0;
        width: 100%;

        p {
          padding: 20px;
        }
      }
    }

    .routine-item-share {
      width: 30%;

      @media (max-width: 768px) {
        width: 50%;
      }
      @media (max-width: 550px) {
        width: 100%;
      }
    }

    .routine-item-signup {
      width: 20%;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .routine-item-scan {
      gap: 20px;
      width: 50%;

      @media (max-width: 768px) {
        img {
          display: none;
        }
      }
      @media (max-width: 550px) {
        width: 100%;
      }
    }
  }
}
</style>
