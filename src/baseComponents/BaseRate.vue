<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps<{rates: number, text?: boolean}>()
</script>

<template>
  <div class="base-rates">
    <div class="base-rates__icons">
      <svg
        v-for="rate in 5"
        :key="rate"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none">
        <path d="M19.8257 8.81619L15.3586 13.3962L16.4087 19.8783C16.5012 20.3956 15.9403 20.7743 15.4919 20.5291L9.99976 17.484V0.607178C10.2331 0.607178 10.4665 0.71563 10.5665 0.940877L13.3251 6.82234L19.4673 7.7567C19.9807 7.84846 20.1699 8.45329 19.8257 8.81619Z" :fill="rate <= rates ? '#FF8A00' : '#666666'"/>
        <path d="M10.0005 0.607178V17.484L4.50831 20.5291C4.06744 20.7768 3.49822 20.4014 3.59156 19.8783L4.64166 13.3962L0.174576 8.81619C-0.169623 8.45329 0.0187279 7.84846 0.532942 7.7567L6.67518 6.82234L9.43377 0.940878C9.53378 0.71563 9.76714 0.607178 10.0005 0.607178Z" :fill="rate - 0.5 === rates ? '#FF8A00' : rate <= rates ? '#FF8A00' : '#666666'"/>
      </svg>
    </div>
    <p v-if="text">251 Reviews</p>
  </div>
</template>

<style lang="scss">
.base-rates {
  display: grid;
  justify-items: right;
  gap: 5px;

  &__icons {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 5px;
  }
  p {
    color: #D7D7D7;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
  }
}
</style>
