<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Filter } from '@/assets/interfaces'
import FilterCategories from '@/components/FilterCategories.vue'
import FilterSelect from '@/components/FilterSelect.vue'
import axios from 'axios'
import store from '@/store'
import { API_URL } from '@/assets/constants'
import text from '@/assets/locales/filter.json'

const alertActive = ref(true)
const library = ref({
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
})

const filterQuery = ref<{[key: string]: string | number}>({
  page: 1,
  take: 11,
})
const updateFilterQuery = (query: {[key: string]: string | number}) => {
  filterQuery.value = { ...filterQuery.value, ...query }
}

const filters = reactive<Filter>({
  skinTypes: {
    title: 'skin type',
    subtitle: 'Selecting right skin type allows to match routines targeted to Your skin.',
    variants: [],
    selectedVariant: '',
  },
  concerns: {
    title: 'Targeted Concerns',
    subtitle: 'Selecting right skin type allows to match routines targeted to Your skin.',
    variants: [],
    selectedVariant: '',
  },
  melanine: {
    title: 'Your Skin Melanin level (tone of your skin)',
    subtitle: 'Selecting right skin type allows to match routines targeted to Your skin.',
    variants: [],
    selectedVariant: '',
  },
  routineType: {
    title: 'Type of Routine  ( when this routine will be used)',
    subtitle: 'Selecting right skin type allows to match routines targeted to Your skin.',
    variants: [],
    selectedVariant: '',
  },
  age: {
    title: 'Targeted age  ',
    subtitle: 'Selecting right skin type allows to match routines targeted to Your skin.',
    variants: [],
    selectedVariant: '',
  },
  skinSensitivity: {
    title: 'Skin Sensitivity Level',
    subtitle: 'Selecting right skin type allows to match routines targeted to Your skin.',
    variants: [],
    selectedVariant: '',
  },
  stepsNumber: {
    title: 'Number of the steps in the Routine ',
    subtitle: 'Selecting right skin type allows to match routines targeted to Your skin.',
    variants: [],
    selectedVariant: '',
  },
})

onMounted(() => {
  axios.get(`${API_URL}routines/benefits?order=ASC&page=1&take=20`)
    .then(res => {
      library.value.categories = res.data.data.map((c: {benefitRoutineName: string, id: number}) => ({ title: c.benefitRoutineName, id: c.id, imgUrl: require('@/assets/img/product/library-1.png') }))
    })
  axios.get(`${API_URL}skintypes?order=ASC&page=1&take=10`)
    .then(res => {
      filters.skinTypes.variants = res.data.data.map((item: any) => ({
        text: item.skinTypeName,
        param: item.skinTypeNameForSearch,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}concerns?order=ASC&page=1&take=10`)
    .then(res => {
      filters.concerns.variants = res.data.data.map((item: any) => ({
        text: item.concernName,
        param: item.concernName,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}skintones?order=ASC&page=1&take=10`)
    .then(res => {
      filters.melanine.variants = res.data.data.map((item: any) => ({
        text: item.skintoneName,
        param: item.skintoneName,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}routinetimelimitations?order=ASC&page=1&take=10`)
    .then(res => {
      filters.routineType.variants = res.data.data.map((item: any) => ({
        text: item.timeLimitationName,
        param: item.timeLimitationName,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}ages?order=ASC&page=1&take=10`)
    .then(res => {
      filters.age.variants = res.data.data.map((item: { ageMin: number; ageMax: number, id: number, ageName: string, }) => ({
        text: `${item.ageMin} - ${item.ageMax}`,
        param: item.ageName,
        id: item.id,
      }))
    })
  axios.get(`${API_URL}skinsensitivity?order=ASC&page=1&take=10`)
    .then(res => {
      filters.skinSensitivity.variants = res.data.data.map((item: any) => ({
        text: item.sensitivityName,
        param: item.sensitivityName,
        id: item.id,
      }))
    })
})
const checkBeauty = () => {
  store.commit('checkBeauty')
}
</script>

<template>
  <div class="productFilter">
    <TheHeader/>

    <div class="productFilter-library bg-img">
      <h3 class="title-secondary">{{text.routineTitle[store.state.lang]}}</h3>
      <FilterCategories
        :categories="library"
        @category-select="(category) => {
          library.selected = category;
          updateFilterQuery({[library.title]: category})
        }"
        :category-selected="library.selected"/>
    </div>

    <div class="productFilter-title">
      <h1 class="title">{{text.routineSelection[store.state.lang]}}</h1>
      <p class="txt">{{text.routineSelectionTxt[store.state.lang]}}</p>
      <a @click="$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="24" viewBox="0 0 62 24" fill="none">
          <path
            d="M0.939335 10.9393C0.35355 11.5251 0.35355 12.4749 0.939335 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51471C13.1924 2.92893 13.1924 1.97918 12.6066 1.39339C12.0208 0.807607 11.0711 0.807607 10.4853 1.39339L0.939335 10.9393ZM62 10.5L2 10.5L2 13.5L62 13.5L62 10.5Z"
            fill="black"/>
        </svg>
      </a>
    </div>

    <FilterSelect :routine="true" @updateFilter="(key, value) => {filters[key].selectedVariant = value; updateFilterQuery({[key]: value})}" :filters="filters" />

    <router-link :to="{path: '/routine-results/filtered/', query: filterQuery}" class="link bold">{{text.search[store.state.lang]}} <span>→</span></router-link>
    <div v-if="store.state.beauty" class="scan tablet bg-orange">
      <p class="txt" style="padding-bottom: 10px">{{text.weCollectBeauty[store.state.lang]}}</p>
      <router-link to="/" class="link bold">{{text.scanQrCodeLux[store.state.lang]}}<span>→</span></router-link>
    </div>

    <div v-if="!store.state.beauty" class="alert min-tablet" :class="{hidden: !alertActive}">
      <button class="btn-close" @click="alertActive = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <img src="@/assets/img/global/qr.png" @click="checkBeauty" alt="">
      <div class="scan-content">
        <p class="txt bold t-up">{{text.scanQrCode[store.state.lang]}}</p>
        <p class="txt">{{text.weCollectBeauty[store.state.lang]}}</p>
      </div>
    </div>

    <TheFooter/>
  </div>
</template>

<style lang="scss" scoped>
.productFilter {
  position: relative;
  overflow: hidden;

  &-library {
    text-align: center;
    padding: 100px 0 0;

    .title-secondary {
      padding: 0 20px;

      span {
        font-weight: 700;
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
