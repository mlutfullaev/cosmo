<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainView',
})
</script>

<template>
  <main>
    <div class="main-item d-center bg-orange">
      <router-link to="/" class="link bold">Find Details about Beauty Products <span>→</span></router-link>
    </div>
    <div class="main-item d-center">
      <router-link to="/" class="link bold">Get Your AI Personal Beauty Assistant <span>→</span></router-link>
      <p class="main-num">02</p>
    </div>
    <div class="main-item bg-img">
      <h2 class="main-num-large">03</h2>
      <router-link to="/" class="link bold">Discover Beauty Routines for every occasion <span>→</span></router-link>
    </div>
    <div class="main-item d-center bg-orange">
      <h2 class="logo">cosmo.<span>wiki</span></h2>
    </div>
    <div class="main-item bg-img">
      <h1 class="highlight orange">01</h1>
    </div>
    <div class="main-item bg-img"></div>
    <div class="main-item bg-img"></div>
    <div class="main-item d-center">
      <h1 class="main-title">Independent Library of Beauty Products and Skin Routines Experiences</h1>
    </div>
    <div class="main-item d-center bg-orange">
      <p class="main-num">04</p>
      <router-link to="/" class="link bold">Find what your SkinTwin are using <span>→</span></router-link>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);

  .main-item {
    position: relative;
    padding: 30px;

    &:nth-child(3) {
      grid-row: 1 / 3;
      grid-column: 3;
      background-image: url('@/assets/img/main/03.png');
      display: grid;
      align-content: space-between;
      color: $white;
    }
    &:nth-child(5) {
      grid-row: 2 / 5;
      grid-column: 1;
      background-image: url('@/assets/img/main/01.png');
    }
    &:nth-child(6) {
      background-image: url('@/assets/img/main/02.jpeg')
    }
    &:nth-child(7) {
      grid-row: 2 / 4;
      grid-column: 4;
      background-image: url('@/assets/img/main/04.png')
    }
    &:nth-child(8) {
      grid-row: 3 / 5;
      grid-column: 2 / 4;
    }
    &:nth-child(9) {
      grid-row: 4;
      grid-column: 4;
    }
  }
  .logo {
    font-size: 52px;
    padding-bottom: 10px;

    @media (max-width: 1541px) {
      font-size: 42px;
    }
  }
  .main-title {
    text-align: center;
    font-size: 58px;
    font-weight: 700;

    @media (max-width: 1540px) {
      font-size: 42px;
    }
  }
  .main-num {
    color: $black;
    font-family: 'PT Root UI', serif;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    position: absolute;
    bottom: 15px;
    right: 20px;

    @media (max-width: 1540px) {
      font-size: 42px;
    }
  }
  .main-num-large {
    color: $orange;
    font-family: 'PT Root UI', serif;
    font-size: 150px;
    font-style: normal;
    font-weight: 700;

    @media (max-width: 1540px) {
      font-size: 120px;
    }
  }
}
</style>
