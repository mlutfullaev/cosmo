<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Filter } from '@/assets/interfaces'
import axios from 'axios'
import store from '@/store'
import FilterCategories from '@/components/FilterCategories.vue'
import FilterBrands from '@/components/FilterBrands.vue'
import FilterSelect from '@/components/FilterSelect.vue'
import { API_URL } from '@/assets/constants'
import text from '@/assets/locales/filter.json'

const alertActive = ref(true)
const activeLib = ref(0)
const library = ref([
  {
    title: 'categories',
    categories: [],
    selected: '',
  },
  {
    title: 'benefits',
    categories: [],
    selected: '',
  },
])

const filterQuery = ref<{[key: string]: string | number}>({
  page: 1,
  take: 11,
})
const updateFilterQuery = (query: {[key: string]: string | number}) => {
  filterQuery.value = { ...filterQuery.value, ...query }
}
const filters = reactive<Filter>({
  age: {
    title: 'Age targeted group',
    subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
    variants: [],
    selectedVariant: '',
  },
  concerns: {
    title: 'Targeted Concerns',
    subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
    variants: [],
    selectedVariant: '',
  },
  benefits: {
    title: 'Product Claims (Vegan, Natural, etc)',
    subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
    variants: [],
    selectedVariant: '',
  },
  religionDiets: {
    title: 'Religious Certified Products',
    subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
    variants: [],
    selectedVariant: '',
  },
  skinTypes: {
    title: 'Targeted Skin Types',
    subtitle: 'Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/',
    variants: [],
    selectedVariant: '',
  },
})

onMounted(() => {
  axios.get(`${API_URL}skinbenefits?order=ASC&page=1&take=10`)
    .then(res => {
      library.value[1].categories = res.data.data.map((c: {benefitName: string, id: number}) => ({ title: c.benefitName, id: c.id, imgUrl: require('@/assets/img/product/library-1.png') }))
    })
  axios.get(`${API_URL}forms?order=ASC&page=1&take=10`)
    .then(res => {
      library.value[0].categories = res.data.data.map((c: {applicationName: string, id: number}) => ({ title: c.applicationName, id: c.id, imgUrl: require('@/assets/img/product/library-1.png') }))
    })
  axios.get(`${API_URL}ages?order=ASC&page=1&take=10`)
    .then(res => {
      filters.age.variants = res.data.data.map((item: { ageMin: number; ageMax: number, id: number, ageName: string, }) => ({
        text: `${item.ageMin} - ${item.ageMax}`,
        param: item.ageName,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}concerns?order=ASC&page=1&take=10`)
    .then(res => {
      filters.concerns.variants = res.data.data.map((item: { id: number, concernName: string, }) => ({
        text: item.concernName,
        param: item.concernName,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}goodbenefits?order=ASC&page=1&take=10`)
    .then(res => {
      filters.benefits.variants = res.data.data.map((item: { id: number, goodBenefitName: string, }) => ({
        text: item.goodBenefitName,
        param: item.goodBenefitName,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}religiondiets?order=ASC&page=1&take=10`)
    .then(res => {
      filters.religionDiets.variants = res.data.data.map((item: { id: number, religionDietName: string, }) => ({
        text: item.religionDietName,
        param: item.religionDietName,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}skintypes?order=ASC&page=1&take=10`)
    .then(res => {
      filters.skinTypes.variants = res.data.data.map((item: { id: number, skinTypeName: string, }) => ({
        text: item.skinTypeName,
        param: item.skinTypeName,
        id: item.id,
      }))
    })
})
</script>

<template>
  <div class="productFilter">
    <TheHeader/>

    <div class="productFilter-library bg-img">
      <h3 class="title-secondary"><span>{{text.product[store.state.lang]}}</span> {{text.library[store.state.lang]}}</h3>
      <p class="name">
        {{text.subtitle[store.state.lang]}}
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
          updateFilterQuery({[library[activeLib].title]: category})
        }"
        :category-selected="library[activeLib].selected"/>
    </div>

    <FilterBrands where="product-results/brand/" />

    <div class="productFilter-title">
      <a @click="$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="24" viewBox="0 0 62 24" fill="none">
          <path
            d="M0.939335 10.9393C0.35355 11.5251 0.35355 12.4749 0.939335 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51471C13.1924 2.92893 13.1924 1.97918 12.6066 1.39339C12.0208 0.807607 11.0711 0.807607 10.4853 1.39339L0.939335 10.9393ZM62 10.5L2 10.5L2 13.5L62 13.5L62 10.5Z"
            fill="black"/>
        </svg>
      </a>
      <h1 class="title">{{text.weCanDo[store.state.lang]}}</h1>
      <p class="txt">
        {{text.productSelectTarget[store.state.lang]}}
      </p>
    </div>

    <FilterSelect @updateFilter="(key, value) => {filters[key].selectedVariant = value; updateFilterQuery({[key]: value})}" :filters="filters" />

    <router-link :to="{path: `/product-results/filtered/${store.state.productSearch}`, query: filterQuery}" class="link bold">search <span>→</span></router-link>
    <div class="scan tablet bg-orange">
      <p class="txt" style="padding-bottom: 10px">
        {{text.weCollectBeauty[store.state.lang]}}
      </p>
      <router-link to="/" class="link bold">{{text.scanQrCodeLux[store.state.lang]}}<span>→</span></router-link>
    </div>

    <TheFooter/>

    <div class="alert min-tablet" :class="{hidden: !alertActive}">
      <button class="btn-close" @click="alertActive = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <img src="@/assets/img/global/qr.png" alt="">
      <div class="scan-content">
        <p class="txt bold t-up">{{text.scanQrCode[store.state.lang]}}</p>
        <p class="txt">{{text.weCollectBeauty[store.state.lang]}}</p>
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
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      border-bottom: 1px solid $black;
      max-width: 50%;
      margin: 0 auto 50px;

      button {
        padding: 20px;
        transition: .3s;

        &:hover, &.active {
          color: $orange;
        }
      }

      @media (max-width: 1200px) {
        max-width: 60%;
      }
      @media (max-width: 1000px) {
        margin: 20px;
        max-width: 80%;
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
      cursor: pointer;
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
