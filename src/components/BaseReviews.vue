<script lang="ts">
import { defineComponent } from 'vue'
import BaseRate from '@/components/BaseRate.vue'

export default defineComponent({
  components: { BaseRate }
})
</script>

<template>
  <div class="base-reviews">
    <div class="review-top">
      <h3 class="title">Reviews</h3>
      <div class="rating">
        <h5 class="title">4.7/5</h5>
        <BaseRate :rates="4.5" :text="true"/>
      </div>
    </div>
    <div class="review-bottom">
      <div class="review">
        <p class="txt bold t-up">Name</p>
        <BaseRate :rates="3.5" />
        <p class="txt">Lorem ipsum dolor sit amet consectetur. Neque magna pharetra consectetur non molestie. </p>
      </div>
      <div class="review">
        <p class="txt bold t-up">Name</p>
        <BaseRate :rates="3.5" />
        <p class="txt">Lorem ipsum dolor sit amet consectetur. Neque magna pharetra consectetur non molestie. </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-reviews {
  display: grid;
  align-content: space-between;

  .review {
    @include pad();
    border-top: 1px solid $black;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;

    .text:last-child {
      grid-column: 1 / 3;
    }
  }
  .review-top {
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
}
</style>
