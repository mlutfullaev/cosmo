<script setup lang="ts">
import { Review } from '@/assets/interfaces'
import { defineProps, ref } from 'vue'
import BaseRate from '@/baseComponents/BaseRate.vue'

defineProps<{reviews: Review[]}>()

const contentRef = ref()
const hideScrollbar = ref(false)

const checkScroll = () => {
  const container = contentRef.value

  if (container) {
    const scrollPosition = container.scrollTop + container.clientHeight
    const threshold = container.scrollHeight - 100

    hideScrollbar.value = scrollPosition >= threshold
  }
}
</script>

<template>
  <div class="base-reviews">
    <div
      @scroll="checkScroll"
      class="base-reviews__content"
      ref="contentRef">
      <div
        v-for="review in reviews"
        class="base-reviews__item"
        :key="review.id">
        <p class="txt bold t-up">
          {{ review.reviewUser }}
          <span class="your-skin" v-if="false">YOUR SKINTWIN</span>
        </p>
        <BaseRate :rates="review.reviewRating"/>
        <p class="txt">{{ review.reviewText }}</p>
      </div>
    </div>
    <div class="base-reviews__scrollbar" v-if="!hideScrollbar || reviews.length > 5">
      <svg xmlns="http://www.w3.org/2000/svg" width="92" height="30" viewBox="0 0 92 30" fill="none">
        <path d="M1.00001 1.85547L45.9999 27.8555L91 1.85548" stroke="black" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-reviews {
  position: relative;

  &__content {
    display: grid;
    max-height: 1000px;
    overflow-y: auto;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__item {
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
  &__scrollbar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) -131.57%, #FFF 83.11%);
    display: flex;
    justify-content: center;
    align-items: end;
    padding: 30px;
    height: 20%;
  }
  @media (max-width: 1000px) {
    max-height: 700px;
  }
}
</style>
