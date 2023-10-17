<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainView',
})
</script>

<template>
  <TheHeader />
  <main>
    <div class="main-item d-center bg-orange find-details">
      <router-link to="/" class="link bold">Find Details about Beauty Products <span>→</span></router-link>
    </div>
    <div class="main-item d-center get-ai">
      <router-link to="/" class="link bold">Get Your AI Personal Beauty Assistant <span>→</span></router-link>
      <p class="main-num">02</p>
    </div>
    <div class="main-item bg-img discover-beauty">
      <h2 class="main-num-large">03</h2>
      <router-link to="/" class="link bold">Discover Beauty Routines for every occasion <span>→</span></router-link>
    </div>
    <div class="main-item d-center bg-orange cosmo-wiki">
      <h2 class="logo">cosmo.<span>wiki</span></h2>
    </div>
    <div class="main-item bg-img number-one">
      <h1 class="highlight orange">01</h1>
    </div>
    <div class="main-item bg-img first-img"></div>
    <div class="main-item bg-img second-img"></div>
    <div class="main-item d-center independent-library">
      <h1 class="main-title">Independent Library of Beauty Products and Skin Routines Experiences</h1>
    </div>
    <div class="main-item d-center bg-orange find-what">
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
    padding: 40px 30px;

    &.find-details {
      @media (max-width: 768px) {
        grid-column: 2;
        grid-row: 3;
      }
      @media (max-width: 480px) {
        grid-column: 1;
        grid-row: 4;
      }
    }
    &.get-ai {
      @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 4;
      }
      @media (max-width: 480px) {
        grid-row: 6;
      }
    }
    &.discover-beauty {
      grid-row: 1 / 3;
      grid-column: 3;
      background-image: url('@/assets/img/main/03.png');
      display: grid;
      gap: 50px;
      align-content: space-between;
      color: $white;

      @media (max-width: 768px) {
        grid-column: 1 / 3;
        grid-row: 5;
      }
      @media (max-width: 480px) {
        grid-column: 1;
        grid-row: 7;
      }
    }
    &.cosmo-wiki {
      @media (max-width: 768px) {
        grid-column: 1 / 3;
        grid-row: 1;
      }
      @media (max-width: 480px) {
        grid-column: 1;
      }
    }
    &.number-one {
      grid-row: 2 / 5;
      grid-column: 1;
      background-image: url('@/assets/img/main/01.png');

      @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 3;
      }
      @media (max-width: 480px) {
        grid-column: 1;
      }
    }
    &.first-img {
      background-image: url('@/assets/img/main/02.jpeg');

      @media (max-width: 768px) {
        grid-column: 2;
        grid-row: 4;
      }
      @media (max-width: 480px) {
        grid-column: 1;
        grid-row: 5;
      }
    }
    &.second-img {
      grid-row: 2 / 4;
      grid-column: 4;
      background-image: url('@/assets/img/main/04.png');

      @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 6;
      }
      @media (max-width: 480px) {
        grid-column: 1;
        grid-row: 9;
      }
    }
    &.independent-library {
      grid-row: 3 / 5;
      grid-column: 2 / 4;

      @media (max-width: 768px) {
        grid-column: 1 / 3;
        grid-row: 2;
      }
      @media (max-width: 480px) {
        grid-column: 1;
      }
    }
    &.find-what {
      grid-row: 4;
      grid-column: 4;

      @media (max-width: 768px) {
        grid-column: 2;
        grid-row: 6;
      }
      @media (max-width: 480px) {
        grid-column: 1;
        grid-row: 8;
      }
    }
  }

  .logo {
    font-size: 52px;
    padding-bottom: 10px;

    @media (max-width: 1541px) {
      font-size: 42px;
    }
    @media (max-width: 1340px) {
      font-size: 36px;
    }
    @media (max-width: 1000px) {
      font-size: 30px;
    }
    @media (max-width: 768px) {
      font-size: 52px;
    }
    @media (max-width: 360px) {
      font-size: 40px;
    }
  }

  .main-title {
    text-align: center;
    font-size: 58px;
    font-weight: 700;

    @media (max-width: 1540px) {
      font-size: 42px;
    }
    @media (max-width: 1340px) {
      font-size: 36px;
    }
    @media (max-width: 1000px) {
      font-size: 30px;
    }
    @media (max-width: 768px) {
      font-size: 48px;
    }
    @media (max-width: 480px) {
      font-size: 30px;
    }
    @media (max-width: 360px) {
      font-size: 24px;
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
    @media (max-width: 1140px) {
      font-size: 30px;
    }
  }

  .main-num-large {
    color: $orange;
    font-family: 'PT Root UI', serif;
    font-size: 150px;
    font-style: normal;
    font-weight: 700;

    @media (max-width: 1540px) {
      font-size: 100px;
    }
    @media (max-width: 1340px) {
      font-size: 90px;
    }
    @media (max-width: 1000px) {
      font-size: 70px;
    }
    @media (max-width: 768px) {
      font-size: 150px;
    }
  }

  .link {
    @media (max-width: 900px) {
      font-size: 18px;
    }
    @media (max-width: 768px) {
      font-size: 30px;
    }
    @media (max-width: 480px) {
      font-size: 18px;
      padding-bottom: 25px;
    }
  }

  @media (max-width: 1340px) {
    min-height: 100vh;
    height: auto;
  }
  @media (max-width: 768px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: 250px 480px 480px auto 510px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 480px auto 250px auto 500px auto 250px;
  }
}
</style>
