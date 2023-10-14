<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Card {
  title: string,
  price: string,
  imgUrl: string,
  rate: number,
  promoted: boolean,
  recommended: boolean
}
export default defineComponent({
  name: 'productCard',
  props: {
    card: {
      required: true,
      type: Object as PropType<Card>
    }
  }
})
</script>

<template>
  <div class="product-card">
    <div class="rates">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path d="M19.8257 8.81619L15.3586 13.3962L16.4087 19.8783C16.5012 20.3956 15.9403 20.7743 15.4919 20.5291L9.99976 17.484V0.607178C10.2331 0.607178 10.4665 0.71563 10.5665 0.940877L13.3251 6.82234L19.4673 7.7567C19.9807 7.84846 20.1699 8.45329 19.8257 8.81619Z" fill="#FF8A00"/>
        <path d="M10.0005 0.607178V17.484L4.50831 20.5291C4.06744 20.7768 3.49822 20.4014 3.59156 19.8783L4.64166 13.3962L0.174576 8.81619C-0.169623 8.45329 0.0187279 7.84846 0.532942 7.7567L6.67518 6.82234L9.43377 0.940878C9.53378 0.71563 9.76714 0.607178 10.0005 0.607178Z" fill="#FF8A00"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path d="M19.8257 8.81619L15.3586 13.3962L16.4087 19.8783C16.5012 20.3956 15.9403 20.7743 15.4919 20.5291L9.99976 17.484V0.607178C10.2331 0.607178 10.4665 0.71563 10.5665 0.940877L13.3251 6.82234L19.4673 7.7567C19.9807 7.84846 20.1699 8.45329 19.8257 8.81619Z" fill="#FF8A00"/>
        <path d="M10.0005 0.607178V17.484L4.50831 20.5291C4.06744 20.7768 3.49822 20.4014 3.59156 19.8783L4.64166 13.3962L0.174576 8.81619C-0.169623 8.45329 0.0187279 7.84846 0.532942 7.7567L6.67518 6.82234L9.43377 0.940878C9.53378 0.71563 9.76714 0.607178 10.0005 0.607178Z" fill="#FF8A00"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path d="M19.8257 8.81619L15.3586 13.3962L16.4087 19.8783C16.5012 20.3956 15.9403 20.7743 15.4919 20.5291L9.99976 17.484V0.607178C10.2331 0.607178 10.4665 0.71563 10.5665 0.940877L13.3251 6.82234L19.4673 7.7567C19.9807 7.84846 20.1699 8.45329 19.8257 8.81619Z" fill="#FF8A00"/>
        <path d="M10.0005 0.607178V17.484L4.50831 20.5291C4.06744 20.7768 3.49822 20.4014 3.59156 19.8783L4.64166 13.3962L0.174576 8.81619C-0.169623 8.45329 0.0187279 7.84846 0.532942 7.7567L6.67518 6.82234L9.43377 0.940878C9.53378 0.71563 9.76714 0.607178 10.0005 0.607178Z" fill="#FF8A00"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path d="M19.8257 8.81619L15.3586 13.3962L16.4087 19.8783C16.5012 20.3956 15.9403 20.7743 15.4919 20.5291L9.99976 17.484V0.607178C10.2331 0.607178 10.4665 0.71563 10.5665 0.940877L13.3251 6.82234L19.4673 7.7567C19.9807 7.84846 20.1699 8.45329 19.8257 8.81619Z" fill="#FF8A00"/>
        <path d="M10.0005 0.607178V17.484L4.50831 20.5291C4.06744 20.7768 3.49822 20.4014 3.59156 19.8783L4.64166 13.3962L0.174576 8.81619C-0.169623 8.45329 0.0187279 7.84846 0.532942 7.7567L6.67518 6.82234L9.43377 0.940878C9.53378 0.71563 9.76714 0.607178 10.0005 0.607178Z" fill="#FF8A00"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path d="M19.8257 8.81619L15.3586 13.3962L16.4087 19.8783C16.5012 20.3956 15.9403 20.7743 15.4919 20.5291L9.99976 17.484V0.607178C10.2331 0.607178 10.4665 0.71563 10.5665 0.940877L13.3251 6.82234L19.4673 7.7567C19.9807 7.84846 20.1699 8.45329 19.8257 8.81619Z" fill="#D7D7D7"/>
        <path d="M10.0005 0.607178V17.484L4.50831 20.5291C4.06744 20.7768 3.49822 20.4014 3.59156 19.8783L4.64166 13.3962L0.174576 8.81619C-0.169623 8.45329 0.0187279 7.84846 0.532942 7.7567L6.67518 6.82234L9.43377 0.940878C9.53378 0.71563 9.76714 0.607178 10.0005 0.607178Z" fill="#FF8A00"/>
      </svg>
    </div>
    <h4 class="text bold">{{card.title}}</h4>
    <p class="text">{{card.price}}</p>
    <img :src="require(`@/assets/img/${card.imgUrl}`)" alt="">
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
  padding: 20px;

  .rates {
    @include display-center(right);
    padding-bottom: 20px;
    gap: 5px;
  }
  img {
    justify-self: center;
    align-self: center;
    width: 70%;
  }
  .promoted {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5px;
    background: $black;
    color: $white;
  }
  .recommended {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px;
    background: $orange;
  }
  button {
    justify-self: right;
  }
}
</style>
