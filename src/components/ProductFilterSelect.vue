<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    activeTab: 0,
    filters: [
      {
        title: 'Age targeted group',
        subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
        contentTitle: 'Please select Your age group to make relevant search',
        variants: ['18 - 25', '25 - 35', '35 - 55', '0-6', '6 - 14', '14 - 18', '55 +'],
        selectedVariant: '0-6',
      },
      {
        title: 'Targeted Concerns',
        subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
        contentTitle: 'Please select Your age group to make relevant search',
        variants: ['18 - 25', '25 - 35', '35 - 55', '0-6', '6 - 14', '14 - 18', '55 +'],
        selectedVariant: '0-6',
      },
      {
        title: 'Product Claims (Vegan, Natural, etc)',
        subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
        contentTitle: 'Please select Your age group to make relevant search',
        variants: ['18 - 25', '25 - 35', '35 - 55', '0-6', '6 - 14', '14 - 18', '55 +'],
        selectedVariant: '0-6',
      },
      {
        title: 'Religious Certified Products',
        subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
        contentTitle: 'Please select Your age group to make relevant search',
        variants: ['18 - 25', '25 - 35', '35 - 55', '0-6', '6 - 14', '14 - 18', '55 +'],
        selectedVariant: '0-6',
      },
      {
        title: 'Targeted Skin Types',
        subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
        contentTitle: 'Please select Your age group to make relevant search',
        variants: ['18 - 25', '25 - 35', '35 - 55', '0-6', '6 - 14', '14 - 18', '55 +'],
        selectedVariant: '0-6',
      },
    ]
  })
})
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
          <p class="txt-highlight">{{ filterTab.contentTitle }}</p>
          <div class="filter-buttons">
            <button
              v-for="variant in filterTab.variants"
              :class="{active: variant === filterTab.selectedVariant}"
              @click="filterTab.selectedVariant = variant"
              class="filter-button"
              :key="variant">
              {{ variant }}
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
        <p class="txt-highlight">{{ filterTab.contentTitle }}</p>
        <div class="productFilter-buttons">
          <button
            v-for="variant in filterTab.variants"
            :class="{active: variant === filterTab.selectedVariant}"
            @click="filterTab.selectedVariant = variant"
            :key="variant">
            {{ variant }}
          </button>
        </div>
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
    .productFilter-item {
      border-left: 1px solid $black;
      border-bottom: 1px solid $black;
      display: none;
      padding: 40px;
      height: 100%;

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
        height: max-content;
        align-items: center;

        button {
          padding: 20px;
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
      }

      @media (max-width: 1000px) {
        padding: 40px 20px;
      }
    }
  }

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
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;

    &-inner {
      display: none;
    }
  }
}
</style>
