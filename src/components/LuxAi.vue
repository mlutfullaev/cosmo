<script setup lang="ts">
import text from '@/assets/locales/components.json'
import store from '../store'
</script>

<template>
  <section class="luxAi">
    <h1 class="luxAi-title tablet">{{text.luxAi[store.state.lang]}}</h1>
    <div class="luxAi-inner">
      <div class="luxAi-inner-item d-center">
        <h1 class="luxAi-word min-tablet">L</h1>
        <div class="luxAi-inner-item-active">
          <h3 class="title-secondary">
            {{text.luxL[store.state.lang]}}
          </h3>
        </div>
      </div>
      <div class="luxAi-inner-item d-center">
        <h1 class="luxAi-word min-tablet">U</h1>
        <div class="luxAi-inner-item-active">
          <h3 class="title-secondary">
            {{text.luxU[store.state.lang]}}
          </h3>
        </div>
      </div>
      <div class="luxAi-inner-item d-center">
        <h1 class="luxAi-word min-tablet">X</h1>
        <div class="luxAi-inner-item-active">
          <h3 class="title-secondary">
            {{text.luxX[store.state.lang]}}
          </h3>
        </div>
      </div>
      <div class="luxAi-inner-item d-center">
        <h1 class="luxAi-word min-tablet">A</h1>
        <div class="luxAi-inner-item-active">
          <h3 class="title-secondary">
            {{text.luxA[store.state.lang]}}
          </h3>
        </div>
      </div>
      <div class="luxAi-inner-item d-center">
        <h1 class="luxAi-word min-tablet">I</h1>
        <div class="luxAi-inner-item-active">
          <h3 class="title-secondary">
            {{text.luxI[store.state.lang]}}
          </h3>
        </div>
      </div>
      <div class="luxAi-inner-item d-center">
        <h2 class="title">
          {{text.getMostSupport[store.state.lang]}}</h2>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.luxAi {
  .luxAi-title {
    color: #FF8A00;
    font-size: 96px;
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;
    padding: 30px 0;
  }

  &-inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid $black;

    &-item {
      position: relative;
      padding: 60px;
      overflow: hidden;
      transition: .3s;
      border-bottom: 1px solid $black;
      border-right: 1px solid $black;

      .luxAi-word {
        font-size: 400px;
        line-height: 300px;
        color: $orange;
        font-weight: 400;
        transition: .3s;
      }

      &:hover {
        > .luxAi-word {
          scale: .7;
          opacity: 0;
        }

        .luxAi-inner-item-active {
          bottom: 0;
          opacity: 1;
        }
      }

      &-active {
        padding: 60px;
        transition: .3s;
        position: absolute;
        bottom: -100%;
        background: #fff;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: grid;
        align-content: end;
        opacity: 0;

        svg {
          margin-bottom: 5px;
        }

        @media (max-width: 1550px) {
          padding: 40px 20px;
        }
        @media (max-width: 1250px) {
          padding: 20px;
        }
        @media (max-width: 1550px) and (min-width: 1400px) {
          .title-secondary {
            font-size: 30px;
          }
        }
        @media (max-width: 1300px) and (min-width: 1000px) {
          .title-secondary {
            font-size: 26px;
          }
        }
        @media (max-width: 768px) {
          position: relative;
          bottom: 0;
          opacity: 1;
          padding: 0;
        }
      }

      @media (max-width: 1400px) {
        padding: 30px;
      }
      @media (max-width: 1400px) {
        padding: 60px 20px;
      }
      @media (min-width: 769px) {
        &:nth-child(3n) {
          border-right: none;

        }
      }
      @media (max-width: 768px) {
        padding: 40px 20px;

        &:nth-child(2n) {
          border-right: none;

        }
      }
      @media (max-width: 480px) {
        &:last-child {
          padding: 50px 20px;
          grid-row: 1;
        }
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 480px) {
      border-top: none;
      grid-template-columns: 1fr;
    }
  }
}
</style>
