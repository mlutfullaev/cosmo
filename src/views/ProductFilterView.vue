<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  data: () => ({
    activeTab: 0,
    alertActive: true,
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
  <div class="productFilter">
    <TheHeader/>
    <div class="productFilter-top">
      <RouterLink to="/search-results">
        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="24" viewBox="0 0 62 24" fill="none">
          <path
            d="M0.939335 10.9393C0.35355 11.5251 0.35355 12.4749 0.939335 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51471C13.1924 2.92893 13.1924 1.97918 12.6066 1.39339C12.0208 0.807607 11.0711 0.807607 10.4853 1.39339L0.939335 10.9393ZM62 10.5L2 10.5L2 13.5L62 13.5L62 10.5Z"
            fill="black"/>
        </svg>
      </RouterLink>
      <h1 class="title">We can do in-depth selection as well</h1>
      <p class="txt">Please select the targeted age group. If the product does not have age specification or warnings
        for age </p>
    </div>
    <div class="productFilter-inner">
      <div class="filter-tabs">
        <div
          v-for="(filterTab, idx) in filters"
          class="filter-tab"
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
      <div class="content">
        <div
          class="content-tab"
          v-for="(filterTab, idx) in filters"
          :class="{active: activeTab === idx}"
          :key="filterTab.title">
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
    <div class="productFilter-bottom">
      <RouterLink to="/" class="link bold">search <span>→</span></RouterLink>
    </div>
    <TheFooter/>
    <div class="alert" :class="{hidden: !alertActive}">
      <button class="alert-close" @click="alertActive = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <img src="@/assets/img/global/qr.png" alt="">
      <div class="scan-content">
        <p class="txt bold t-up">scan qr code to make most from product page</p>
        <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive
          maximum details about products and experiences Your SkinTwins had with this product.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.productFilter {
  position: relative;
  overflow: hidden;

  &-top {
    padding: 60px;
    position: relative;
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;

    a {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 30px;
      @media (max-width: 1200px) {
        display: none;
      }
    }

    p {
      max-width: 400px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      padding: 30px;
    }
    @media (max-width: 480px) {
      .title {
        font-size: 24px;
      }
    }
  }

  &-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid $black;

    .content-tab {
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

      @media (max-width: 1000px) {
        padding: 40px 20px;
      }
    }

    .filter-buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;
      height: max-content;
      align-items: center;
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;

      .content {
        display: none;
      }
    }
  }

  &-bottom {
    padding: 60px;
    text-align: center;
  }

  .alert {
    bottom: 20px;
    right: 20px;
    max-width: 500px;
    display: flex;
    align-items: start;
    gap: 20px;

    img {
      width: 20%;
    }
  }
}
</style>
