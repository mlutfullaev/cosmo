<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BaseRate from '@/components/BaseRate.vue'

interface Card {
  title: string,
  price: string,
  imgUrl: string,
  rate: number,
  promoted: boolean,
  recommended: boolean,
  id: number
}
export default defineComponent({
  name: 'productCard',
  components: { BaseRate },
  props: {
    card: {
      required: true,
      type: Object as PropType<Card>
    },
    bgImg: {
      required: false,
      type: Boolean,
      default: false,
    }
  }
})
</script>

<template>
  <div class="product-card" :class="bgImg ? 'bg-img' : ''" :style="bgImg ? {backgroundImage: `url('${require(`@/assets/img/${card.imgUrl}`)}')`}: {}">
    <BaseRate :rates="card.rate" :text="true"/>
    <h4  class="txt-highlight">{{card.title}}</h4>
    <p class="txt">{{card.price}}</p>
    <img v-if="!bgImg" :src="require(`@/assets/img/${card.imgUrl}`)" alt="">
    <p class="recommended" :class="{active: card.recommended}">recommended</p>
    <p class="promoted" :class="{active: card.promoted}">promoted</p>
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

<style lang="scss" scoped>
.product-card {
  position: relative;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  padding: 20px;
  height: 100%;

  img {
    justify-self: center;
    align-self: center;
    width: 70%;

    @media (max-width: 1000px) {
      width: 80%;
    }
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

  @media (max-width: 1000px) {
    padding: 10px;
  }
}
</style>
