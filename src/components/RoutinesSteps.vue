<script setup lang="ts">
import text from '@/assets/locales/components.json'
import store from '../store'
</script>

<template>
  <section class="routines__steps">
    <div class="routines__steps__top">
      <h2 class="title">Lorem ipsum dolor sit amet consectetur. Et lobortis pharetra</h2>
      <p class="txt">Lorem ipsum dolor sit amet consectetur. Sit mi tristique pulvinar porttitor. At sem lacus euismod non nibh nisi arcu sociis. Enim venenatis fermentum aliquam dolor. Eu cras tellus congue in id dignissim tortor sed donec. Tellus malesuada tortor nunc neque at. Ut in enim est aliquam ut id. Diam convallis erat eget elit volutpat eros. Elit mi pharetra nunc blandit lacinia nulla. Tempus arcu faucibus arcu justo libero aliquam lobortis. Praesent vel enim aenean id vel quis.</p>
    </div>
    <div class="routines__steps__inner">
      <div class="routines__steps__inner__item">
        <h3 class="step">03</h3>
        <h4 class="title-secondary">{{text.steps[store.state.lang]}}</h4>
        <p class="txt">{{text.stepsTxt[store.state.lang]}}</p>
      </div>
      <div class="routines__steps__inner__item">
        <h3 class="step">05</h3>
        <h4 class="title-secondary">{{text.steps[store.state.lang]}}</h4>
        <p class="txt">{{text.stepsTxt[store.state.lang]}}</p>
      </div>
      <div class="routines__steps__inner__item">
        <h3 class="step">07</h3>
        <h4 class="title-secondary">{{text.steps[store.state.lang]}}</h4>
        <p class="txt">{{text.stepsTxt[store.state.lang]}}</p>
      </div>
      <div class="routines__steps__inner__item">
        <h3 class="step">10</h3>
        <h4 class="title-secondary">{{text.steps[store.state.lang]}}</h4>
        <p class="txt">{{text.stepsTxt[store.state.lang]}}</p>
      </div>
      <div class="routines__steps__inner__item">
        <h3 class="step">12</h3>
        <h4 class="title-secondary">{{text.steps[store.state.lang]}}</h4>
        <p class="txt">{{text.stepsTxt[store.state.lang]}}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.routines__steps {
  padding: 120px;

  &__top {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 20px;
    justify-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  &__inner {
    display: flex;
    text-align: center;
    justify-content: space-between;
    gap: 20px;

    p {
      max-width: 210px;
      margin: 0 auto;
    }

    &__item {
      @media (max-width: 768px) {
        width: 30%;
      }
      @media (max-width: 480px) {
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      flex-wrap: wrap;
      justify-content: left;
    }
  }
  @media (max-width: 1000px) {
    padding: 60px 20px;
  }
}
</style>
