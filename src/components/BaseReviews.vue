<script setup lang="ts">
import BaseRate from '@/components/BaseRate.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

type Review = {
  id: number,
  reviewUser: string,
  reviewText: string,
  reviewRating: number,
}

const reviews = ref<Review[]>([])

onMounted(() => {
  axios.get('https://api-www.beautyid.app/reviews/?order=ASC&page=1&take=2')
    .then(res => {
      reviews.value = res.data.data
    })
})
</script>

<template>
  <div class="base-reviews">
    <div class="base-reviews__top">
      <h3 class="title">Reviews</h3>
      <div class="rating">
        <h5 class="title">4.7/5</h5>
        <BaseRate :rates="4.5" :text="true"/>
      </div>
    </div>
    <div class="base-reviews__bottom">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="base-reviews__bottom__review">
        <p class="txt bold t-up">{{ review.reviewUser }}</p>
        <BaseRate :rates="review.reviewRating"/>
        <p class="txt">{{ review.reviewText }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-reviews {
  display: grid;
  align-content: space-between;

  &__top {
    @include pad();

    .rating {
      display: flex;
      align-items: center;
      justify-content: left;
      gap: 20px;

      h5 {
        font-weight: 700;
      }

      .rates {
        grid-template-columns: auto auto;
      }
    }
  }
  &__bottom {
    &__review {
    @include pad();
    border-top: 1px solid $black;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;

    .text:last-child {
      grid-column: 1 / 3;
    }
  }
  }
}
</style>
