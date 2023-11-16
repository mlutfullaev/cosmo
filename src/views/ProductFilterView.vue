<script setup lang="ts">
import { ref } from 'vue'
import store from '@/store'
import ProductFilterSelect from '@/components/ProductFilterSelect.vue'
import FilterCategories from '@/components/FilterCategories.vue'
import FilterBrands from '@/components/FilterBrands.vue'

const alertActive = ref(true)
const activeLib = ref(0)
const library = ref([
  {
    title: 'categories',
    categories: [
      {
        title: 'cleanser',
        imgUrl: require('@/assets/img/product/library-1.png')
      },
      {
        title: 'toners',
        imgUrl: require('@/assets/img/product/library-2.png')
      },
      {
        title: 'serums',
        imgUrl: require('@/assets/img/product/library-3.png')
      },
      {
        title: 'creams',
        imgUrl: require('@/assets/img/product/library-4.png')
      },
      {
        title: 'oils',
        imgUrl: require('@/assets/img/product/library-5.png')
      },
      {
        title: 'scrubs',
        imgUrl: require('@/assets/img/product/library-6.png')
      },
      {
        title: 'masks',
        imgUrl: require('@/assets/img/product/library-7.png')
      },
    ],
    selected: '',
  },
  {
    title: 'benefits',
    categories: [
      {
        title: 'anti-age',
        imgUrl: require('@/assets/img/product/library-1.png')
      },
      {
        title: 'anti-wrinkle',
        imgUrl: require('@/assets/img/product/library-2.png')
      },
      {
        title: 'hydration',
        imgUrl: require('@/assets/img/product/library-3.png')
      },
      {
        title: 'brightness',
        imgUrl: require('@/assets/img/product/library-4.png')
      },
      {
        title: 'uv-protection',
        imgUrl: require('@/assets/img/product/library-5.png')
      },
      {
        title: 'cleansing',
        imgUrl: require('@/assets/img/product/library-6.png')
      }],
    selected: '',
  },
  {
    title: 'steps',
    categories: [
      {
        title: 'remove makeup',
        imgUrl: require('@/assets/img/product/library-1.png')
      },
      {
        title: 'cleanse',
        imgUrl: require('@/assets/img/product/library-2.png')
      },
      {
        title: 'treat',
        imgUrl: require('@/assets/img/product/library-3.png')
      },
      {
        title: 'moisture',
        imgUrl: require('@/assets/img/product/library-4.png')
      },
      {
        title: 'protect',
        imgUrl: require('@/assets/img/product/library-5.png')
      }],
    selected: '',
  }
])
</script>

<template>
  <div class="productFilter">
    <TheHeader/>

    <div class="productFilter-library bg-img">
      <h3 class="title-secondary"><span>product</span> library</h3>
      <p class="name">
        Select what your skin needs or choose a step to find the product that is best suited to your skin
      </p>
      <div class="productFilter-library-tabs">
        <button
          class="txt-highlight"
          v-for="(lib, idx) in library"
          @click="activeLib = idx"
          :class="{active: activeLib === idx}"
          :key="lib.title">
          {{ lib.title }}
        </button>
      </div>
      <FilterCategories
        :categories="library[activeLib]"
        @category-select="(category) => {
          library[activeLib].selected = category;
          store.commit('updateFilterQuery', {[library[activeLib].title]: category})
        }"
        :category-selected="library[activeLib].selected"/>
    </div>

    <FilterBrands />

    <div class="productFilter-title">
      <a @click="$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="24" viewBox="0 0 62 24" fill="none">
          <path
            d="M0.939335 10.9393C0.35355 11.5251 0.35355 12.4749 0.939335 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51471C13.1924 2.92893 13.1924 1.97918 12.6066 1.39339C12.0208 0.807607 11.0711 0.807607 10.4853 1.39339L0.939335 10.9393ZM62 10.5L2 10.5L2 13.5L62 13.5L62 10.5Z"
            fill="black"/>
        </svg>
      </a>
      <h1 class="title">We can do in-depth selection as well</h1>
      <p class="txt">Please select the targeted age group. If the product does not have age specification or warnings
        for age </p>
    </div>

    <ProductFilterSelect />

    <router-link :to="`/product-results/filtered/${store.state.productSearch}`" class="link bold">search <span>→</span></router-link>
    <div class="scan tablet bg-orange">
      <p class="txt" style="padding-bottom: 10px">We collect Beauty Products details from Brands, Retailers and other users for You to receive maximum details about products and experiences Your SkinTwins had with this product.</p>
      <router-link to="/" class="link bold">Scan qr code to get LUX AI <span>→</span></router-link>
    </div>

    <TheFooter/>

    <div class="alert min-tablet" :class="{hidden: !alertActive}">
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

  &-library {
    text-align: center;
    background-image: url(@/assets/img/product/library-bg.jpg);
    padding: 100px 0;

    .title-secondary {
      padding: 0 20px;

      span {
        font-weight: 700;
      }
    }

    .name {
      padding: 60px;
      max-width: 700px;
      margin: 0 auto;

      @media (max-width: 1200px) {
        padding: 30px 60px;
      }
      @media (max-width: 480px) {
        padding: 20px;
      }
    }

    &-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      border-bottom: 1px solid $black;
      max-width: 60%;
      margin: 0 auto 50px;

      button {
        padding: 20px;
        transition: .3s;

        &:hover, &.active {
          color: $orange;
        }
      }

      @media (max-width: 1200px) {
        max-width: 80%;
      }
      @media (max-width: 1000px) {
        margin: 20px;
        max-width: 100%;
      }
      @media (max-width: 480px) {
        margin-bottom: 20px;
      }
    }

    @media (max-width: 1000px) {
      padding: 50px 0;
    }
  }

  &-title {
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

  > .link {
    display: block;
    padding: 60px;
    width: 100%;
    text-align: center;
    border-top: 1px solid $black
  }

  .alert {
    bottom: 20px;
    right: 20px;
    max-width: 500px;
    display: flex;
    align-items: start;
    gap: 20px;

    &.hidden {
      right: -100%;
    }

    img {
      width: 20%;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>
