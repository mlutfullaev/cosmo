<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    routerLink: {
      type: Object,
      required: false,
      default: () => ({
        value: 'Discover more',
        link: '/routine-intro'
      })
    },
    intro: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
})
</script>

<template>
  <section id="routine" class="routine">
    <h1 class="routine-title">routine guide</h1>
    <div class="routine-inner">
      <img src="@/assets/img/product/routine-1.png" class="min-tablet routine-item-img" alt="routine-img">
      <img src="@/assets/img/product/routine-1-tablet.png" class="tablet min-phone routine-item-img" alt="routine-img">
      <img src="@/assets/img/product/routine-1-phone.png" class="phone routine-item-img" alt="routine-img">
      <div class="routine-item-discover">
        <p class="txt" v-if="!intro">Argan oil is used in 2818 Routines in COSMO.WIKI Routine Library</p>
        <router-link :to="routerLink.link" class="link bold tablet-orange">{{ routerLink.value }} <span>→</span>
        </router-link>
      </div>
      <div class="routine-item-share" v-if="!intro">
        <h3 class="title">Share Your Routines with Friends</h3>
        <p class="txt">Make Routine. Share Signup to be the first to hear about exclusive deals,special offers and
          upcoming collections</p>
      </div>
      <div class="routine-item-signup d-center" v-if="!intro">
        <router-link to="/registration" class="link bold tablet-orange">Sign up <span>→</span></router-link>
      </div>
      <div class="d-center routine-item-scan" v-if="!intro">
        <div class="scan-content">
          <h3 class="title">Check Routines designed for Your Skin Type</h3>
          <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive
            maximum details about products and experiences Your SkinTwins had with this product.</p>
        </div>
        <img src="@/assets/img/global/qr.png" alt="" v-if="!intro">
      </div>
    </div>
    <router-link to="#" class="tablet link bold tablet-orange">Sign up <span>→</span></router-link>
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
