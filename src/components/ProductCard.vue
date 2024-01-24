<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import BaseRate from '@/baseComponents/BaseRate.vue'
import { Product } from '@/assets/interfaces'
import { API_URL } from '@/assets/constants'
import text from '@/assets/locales/components.json'
import store from '../store'

defineProps({
  product: Object as PropType<Product>,
  bgImg: {
    required: false,
    type: Boolean,
    default: false,
  }
})

</script>

<template>
  <div
    v-if="product && Object.keys(product).length"
    @click="$router.push(`/single-product/${product ? product.id : ''}`)"
    class="product-card"
    :class="bgImg ? 'bg-img' : ''"
    :style="bgImg ? {backgroundImage: `url('${API_URL}images/getimage/${product.mainPicture}')`}: {}">
    <BaseRate :rates="product.goodRating || 0"/>
    <h4 class="txt-highlight">{{ product.name }}</h4>
    <p class="txt">from <span>150$</span></p>
    <img v-if="!bgImg" :src="`${API_URL}images/getimage/${product.mainPicture}`" :alt="product.SEOmainImageAlt">
    <p class="recommended" :class="{active: false}">{{text.recommended[store.state.lang]}}</p>
    <p class="promoted" :class="{active: true}">{{text.promoted[store.state.lang]}}</p>
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="34" viewBox="0 0 36 34" fill="none">
        <path d="M33.8351 22.2065L24.4531 31.6073" stroke="#292D32" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 22.2065H33.8352" stroke="#292D32" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 11.0082L11.382 1.60742" stroke="#292D32" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M33.8352 11.0083H2" stroke="black" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<style lang="scss">
.product-card {
  position: relative;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  padding: 20px;
  height: 100%;
  cursor: pointer;

  img {
    justify-self: center;
    width: 90%;
    align-self: center;
  }

  button {
    align-self: end;
    justify-self: right;

    @media (max-width: 1000px) {
      position: absolute;
      bottom: 5px;
      right: 5px;
      svg {
        width: 20px;
        height: auto;
      }
    }
  }

  &.bg-img {
    grid-template-rows: auto 1fr auto auto;

    .txt, .txt-highlight {
      color: #fff;
      align-self: end;
    }

    button svg path {
      stroke: #fff;
    }
  }

  .base-rates {
    padding-bottom: 10px;

    svg {
      @media (max-width: 1200px) {
        width: 15px;
        height: auto;
      }
      @media (max-width: 1000px) {
        width: 20px;
      }
      @media (max-width: 768px) {
        width: 10px;
      }
    }
  }

  @media (max-width: 1200px) {
    .txt-highlight {
      font-weight: 400;

      padding-bottom: 5px;
    }
    .txt span {
      font-weight: 700;
    }
  }
  @media (max-width: 1000px) {
    padding-top: 10px;
  }
}
</style>
