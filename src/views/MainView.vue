<template>
  <main>
    <div class="main-item">
      <LinkUI router-link="#">Find Details about Beauty Products</LinkUI>
    </div>
    <div class="main-item">
      <h3 class="main-text">Get Your AI Personal Beauty Assistant </h3>
      <h3 class="number-small">02</h3>
    </div>
    <div class="main-item bg-img">
      <h2 class="number-medium">03</h2>
      <LinkUI router-link="#">Discover Beauty Routines for every occasion</LinkUI>
    </div>
    <div class="main-item">
      <h2 class="logo">cosmo.<span>wiki</span></h2>
    </div>
    <div class="main-item bg-img">
      <h1 class="number-large">01</h1>
    </div>
    <div class="main-item bg-img"></div>
    <div class="main-item bg-img"></div>
    <div class="main-item">
      <h1 class="title-main">Independent Library of Beauty Products and Skin Routines Experiences</h1>
    </div>
    <div class="main-item">
      <h3 class="number-small">04</h3>
      <LinkUI router-link="#">Find what your SkinTwin are using</LinkUI>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LinkUI from '@/ui/LinkUI.vue'

export default defineComponent({
  name: 'MainView',
  components: { LinkUI }
})
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);

  .main-item {
    padding: 30px;

    &:nth-child(1) {
      grid-column: 1;
      grid-row: 1;
      background-color: $orange;
    }
    &:nth-child(2) {
      display: grid;

      .number-small {
        align-self: end;
        justify-self: end;
      }
    }
    &:nth-child(3) {
      grid-row: 1 / 3;
      grid-column: 3;
      background-image: url('@/assets/img/main/03.png');
      display: grid;
      align-content: space-between;

      .number-medium {
        color: $orange;
      }
      a {
        color: $white;
      }
    }
    &:nth-child(4) {
      display: grid;
      align-items: center;
      justify-content: center;
      background-color: $orange;
    }
    &:nth-child(5) {
      grid-row: 2 / 5;
      grid-column: 1;
      background-image: url('@/assets/img/main/01.png');
      display: grid;

      .number-large {
        color: $orange;
        align-self: end;
      }
    }
    &:nth-child(6) {
      background-image: url('@/assets/img/main/02.png')
    }
    &:nth-child(7) {
      grid-row: 2 / 4;
      grid-column: 4;
      background-image: url('@/assets/img/main/04.png')
    }
    &:nth-child(8) {
      grid-row: 3 / 5;
      grid-column: 2 / 4;
      display: grid;
      align-content: center;

      h1 {
        text-align: center;
        font-size: 52px;
        font-weight: 400;

        @media (max-width: 1540px) {
          font-size: 42px;
        }
      }
    }
    &:nth-child(9) {
      grid-row: 4;
      grid-column: 4;
      background-color: $orange;
      display: grid;

      a {
        font-family: 'Inter', serif;
        align-self: end;
        justify-self: end;
      }
    }
  }
  .main-text {
    color: $black;
    font-family: 'PT Root UI', serif;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;

    @media (max-width: 1541px) {
      font-size: 30px;
    }
  }
  .logo {
    font-size: 52px;
    padding-bottom: 10px;

    @media (max-width: 1541px) {
      font-size: 42px;
    }
  }
}
</style>
