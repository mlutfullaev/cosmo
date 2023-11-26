<script setup lang="ts">
import { Review } from '@/interfaces'
import { defineProps } from 'vue'
import BaseRate from '@/components/BaseRate.vue'

defineProps<{reviews: Review[], text: boolean}>()
</script>

<template>
  <div class="base-reviews">
    <div v-for="review in reviews" :key="review.id">
      <p class="txt bold t-up">{{ review.reviewUser }} <span class="your-skin" v-if="text">YOUR SKINTWIN</span></p>
      <BaseRate :rates="review.reviewRating"/>
      <p class="txt">{{ review.reviewText }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-reviews {
  overflow-y: auto;
  max-height: 1000px;
  display: grid;

  &::-webkit-scrollbar {
    display: none;
  }
  > div {
    @include pad();
    border-top: 1px solid $black;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;

    .txt:first-child {
      display: flex;
      align-items: center;
    }
    .txt:last-child {
      grid-column: 1 / 3;
    }

    @media (max-width: 768px) {
      &:nth-child(n+6) {
        display: none;
      }
    }
  }
  @media (max-width: 1000px) {
    max-height: 700px;
  }
}
</style>
