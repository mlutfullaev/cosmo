<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue'
import { Filter } from '@/assets/interfaces'
import text from '@/assets/locales/filter.json'
import store from '../store'

const props = defineProps<{filters: Filter, routine?: boolean}>()
defineEmits<{(event: 'updateFilter', key: string, value: string): void}>()
const activeTab = ref<number | string>(Object.keys(props.filters)[0])

</script>

<template>
  <div class="productFilter-select">

    <div class="productFilter-tabs">
      <div
        v-for="(filterTab, idx) in filters"
        class="productFilter-tab"
        @click="activeTab = idx"
        :class="{active: activeTab === idx}"
        :key="filterTab.title">
        <h3>{{ filterTab.title }} <span></span></h3>
        <p>{{ filterTab.subtitle }}</p>
        <div class="content-tab active">
          <p class="txt-highlight">{{text.filterSelect[store.state.lang]}}</p>
          <div class="filter-buttons">
            <button
              v-for="variant in filterTab.variants"
              :class="{active: variant.param === filterTab.selectedVariant}"
              @click="() => $emit('updateFilter', idx, variant.param)"
              class="filter-button"
              :key="variant.id">
              {{ variant.text }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="productFilter-inner">
      <div
        class="productFilter-item"
        v-for="(filterTab, idx) in filters"
        :class="{active: activeTab === idx}"
        :key="filterTab.title">
        <p class="txt-highlight">{{text.filterSelect[store.state.lang]}}</p>
        <div class="productFilter-buttons">
          <button
            v-for="variant in filterTab.variants"
            :class="{active: variant.param === filterTab.selectedVariant}"
            @click="() => $emit('updateFilter', idx, variant.param)"
            :key="variant.id">
            {{ variant.text }}
          </button>
        </div>
      </div>
      <div class="productFilter-text" v-if="routine">
        <p class="txt">{{text.filterTxt[store.state.lang]}}</p>
        <div>
          <p class="txt-highlight">{{text.combination[store.state.lang]}}</p>
          <p class="txt">{{text.dryTxt[store.state.lang]}}</p>
          <p class="txt-highlight">{{text.oily[store.state.lang]}}</p>
          <p class="txt">{{text.oilTxt[store.state.lang]}}</p>
          <p class="txt-highlight">{{text.dry[store.state.lang]}}</p>
          <p class="txt">{{text.skinTxt[store.state.lang]}}</p>
          <p class="txt-highlight">{{text.normal[store.state.lang]}}</p>
          <p class="txt">{{text.welBalanced[store.state.lang]}}</p>
        </div>
        <p class="txt">{{text.notSureStart[store.state.lang]}}<span class="txt-highlight">{{text.combination[store.state.lang]}}</span> {{text.notSureEnd[store.state.lang]}}</p>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.productFilter-select {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid $black;

  .productFilter-inner {
    border-left: 1px solid $black;
    .productFilter-item {
      display: none;
      padding: 40px;

      &.active {
        display: block;
      }

      p {
        padding-bottom: 20px;
      }

      .productFilter-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        height: 100%;
        align-content: start;

        button {
          padding: 10px 20px;
          height: 100%;
          border: 1px solid #000;
          font-size: 20px;

          &.active {
            background: $orange;
            font-weight: 600;
            border-color: $orange;
          }

          @media (max-width: 1000px) {
            padding: 12px 20px;
            font-size: 16px;
          }
        }
        @media (max-width: 768px) {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 1000px) {
        padding: 40px 20px;
      }
      @media (max-width: 768px) {
        padding: 20px;
      }
    }
    .productFilter-text {
      padding: 20px;
      border-top: 1px solid $black;

      > div {
        display: grid;
        grid-template-columns: auto auto;
        gap: 10px;
        padding: 10px 0;
      }
    }
  }

  .productFilter-tabs {
    display: grid;
    align-content: space-between;

    .productFilter-tab {
      padding: 20px 60px;
      overflow: hidden;
      cursor: pointer;
      border-bottom: 1px solid $black;
      max-height: 65px;
      transition: max-height .4s ease-in;

      h3 {
        color: $grey-dark;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        padding-bottom: 20px;
        text-transform: uppercase;

        span {
          width: 14px;
          height: 2px;
          border-radius: 3px;
          display: none;
          background: $black;

          &::before {
            content: '';
            width: 14px;
            height: 1.5px;
            border-radius: 3px;
            background: inherit;
            display: block;
            transition: .3s;
            transform: rotate(90deg);
          }
        }

        @media (max-width: 1000px) {
          font-size: 16px;
        }
        @media (max-width: 480px) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: $black;
          font-size: 14px;
          font-weight: 400;

          span {
            display: block;
          }
        }
      }

      p {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        color: $grey-dark;
      }

      &.active {
        cursor: auto;
        max-height: 300px;

        h3 {
          color: $orange;
          font-size: 36px;

          @media (max-width: 1000px) {
            font-size: 24px;
          }

          span {
            background: $orange;

            &::before {
              transform: rotate(0);
            }
          }
        }

        @media (max-width: 600px) {
          max-height: 600px;
        }
      }
      &:last-child {
        border-bottom: none;
      }

      .content-tab {
        display: none !important;

        @media (max-width: 600px) {
          display: block;
          border: none !important;
          padding: 20px 0 !important;
        }
      }

      @media (max-width: 1200px) {
        padding: 20px;
      }
      @media (max-width: 1000px) {
        max-height: 60px;
      }
      @media (max-width: 716px) and (min-width: 600px) {
        &:nth-child(3) {
          max-height: 80px;

          &.active {
            max-height: 300px;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;

    &-inner {
      display: none;
    }
  }
}
</style>
