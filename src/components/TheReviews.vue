<script lang="ts" setup>
import { Review } from '@/assets/interfaces'
import { onMounted, ref } from 'vue'
import BaseReviews from '@/baseComponents/BaseReviews.vue'
import WriteReview from '@/components/WriteReview.vue'
import BaseRate from '@/baseComponents/BaseRate.vue'
import axios from 'axios'
import store from '@/store'
import { API_URL } from '@/assets/constants'

const reviews = ref<Review[]>([])
const beauty = store.state.beauty

onMounted(() => {
  axios.get(`${API_URL}reviews/?order=ASC&page=1&take=${beauty ? 10 : 2}`)
    .then(res => {
      reviews.value = res.data.data
    })
})

const write = ref(false)
</script>

<template>
  <section id="reviews" class="reviews" >
    <div class="reviews__text" :class="{['bg-img']: beauty}">
      <div class="reviews__text__content">
        <h2 class="section-title">Reviews</h2>
        <h2 class="section-title">4.7/5</h2>
        <BaseRate :rates="4.5"/>
        <div class="section-subtitle">
          <h3>126</h3>
          <p>Beauties Reviewed leafs argan oil</p>
        </div>
      </div>
      <button v-if="beauty" @click="write = true" class="link bg-orange">Write a review <span>→</span></button>
      <button
        v-else
        @click="store.commit('updateModalSubscribe', true)"
        class="link bg-orange"
      >CHECK YOUR SKIN TYPE REVIEWS <span>→</span></button>
    </div>
    <BaseReviews v-if="beauty && !write" :reviews="reviews"/>
    <WriteReview v-else-if="beauty && write" @close="write = false"/>
    <div v-else class="reviews__picture bg-img">
      <h3 class="title">Check your SkinTwins experiences with Argan Oil</h3>
    </div>
  </section>
</template>

<style scoped lang="scss">
.reviews {
  border-bottom: 1px solid $black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 1000px;

  &__text {
    display: grid;
    grid-template-rows: 1fr auto;
    color: $black;

    &.bg-img {
      border-right: 1px solid $black;
      background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("@/assets/img/global/girls-smiling.png");
      color: #fff;
    }
    &__content {
      padding: 60px;
      display: grid;
      justify-items: left;
      align-content: start;

      .section-title {
        &:last-of-type {
          color: inherit;
          display: flex;

          padding: 10px 0;
        }
        @media (max-width: 1350px) and (min-width: 1200px) {
          font-size: 130px;
        }
        @media (max-width: 1125px) and (min-width: 1000px) {
          font-size: 110px;
        }
      }
      .section-subtitle {
        padding-top: 10px;
      }
      @media (max-width: 1200px) {
        padding: 60px 20px;
      }
      @media (max-width: 1000px) {
        padding: 40px 20px;
      }
      @media (max-width: 768px) {
        padding: 20px;
      }
    }
  }
  &__picture {
    padding: 60px;
    background-image: url("@/assets/img/product/reviews-img.png");
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 480px;

    @media (max-width: 768px) {
      grid-row: 1;
    }
  }

  @media (max-width: 1200px) {
    height: auto;
  }
  @media (max-width: 768px) {
    grid-template-columns: auto;
    border: none;
  }
}
</style>
