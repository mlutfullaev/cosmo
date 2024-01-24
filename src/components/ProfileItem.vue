<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import BaseRate from '@/baseComponents/BaseRate.vue'

defineProps<{img: string, imgAlt: string, title?: string, text?: string, price?: string, rating: number}>()
defineEmits<{(event: 'remove'): void}>()
</script>

<template>
 <div class="profile-item">
   <img :src="img" :alt="imgAlt">
   <div class="profile-item__text">
     <p class="routine" v-if="title">{{title}}</p>
     <p class="txt" v-else-if="text">{{text}}</p>
     <p class="txt" v-if="price">from <span class="bold">{{price}}</span></p>
   </div>
   <div class="profile-item__buttons">
     <BaseRate :rates="rating" />
     <button class="name">
       <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
         <path d="M1 16L16.0002 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M16.0002 16L1 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>
       REMOVE
     </button>
   </div>
 </div>
</template>

<style lang="scss" scoped>
.profile-item {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  border-bottom: 1px solid $black;
  border-right: 1px solid $black;
  padding: 20px;
  grid-gap: 10px;

  img {
    width: 100%;
  }
  &__buttons {
    display: grid;
    align-content: space-between;
  }
}
</style>
