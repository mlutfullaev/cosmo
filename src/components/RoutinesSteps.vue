<script setup lang="ts">

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
        <h4 class="title-secondary">STEPS</h4>
        <p class="txt">Achieve radiant skin with a simple 3-step beauty routine</p>
      </div>
      <div class="routines__steps__inner__item">
        <h3 class="step">05</h3>
        <h4 class="title-secondary">STEPS</h4>
        <p class="txt">Achieve radiant skin with a simple 3-step beauty routine</p>
      </div>
      <div class="routines__steps__inner__item">
        <h3 class="step">07</h3>
        <h4 class="title-secondary">STEPS</h4>
        <p class="txt">Achieve radiant skin with a simple 3-step beauty routine</p>
      </div>
      <div class="routines__steps__inner__item">
        <h3 class="step">10</h3>
        <h4 class="title-secondary">STEPS</h4>
        <p class="txt">Achieve radiant skin with a simple 3-step beauty routine</p>
      </div>
      <div class="routines__steps__inner__item">
        <h3 class="step">12</h3>
        <h4 class="title-secondary">STEPS</h4>
        <p class="txt">Achieve radiant skin with a simple 3-step beauty routine</p>
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
  }
}
</style>
