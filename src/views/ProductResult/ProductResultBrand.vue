<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Filter, Product } from '@/interfaces'
import ProductCard from '@/components/ProductCard.vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ReligionDiets from '@/components/ReligionDiets.vue'
import FilterSelect from '@/components/FilterSelect.vue'

const route = useRoute()
const router = useRouter()
const products = ref<Product[]>([])
const allItems = ref(0)

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
  axios.get(`https://api-www.beautyid.app/goods/bynamebrand/${route.params.param}?order=ASC&page=1&take=11`)
    .then(res => {
      if (!res.data.data.length) {
        router.push(`/product-results/not-found/${route.params.param}`)
        return
      }
      products.value = res.data.data
      allItems.value = res.data.meta.itemCount
    })
  axios.get('https://api-www.beautyid.app/ages?order=ASC&page=1&take=10')
    .then(res => {
      filters.age.variants = res.data.data.map((item: { ageMin: number; ageMax: number, id: number, ageName: string, }) => ({
        text: `${item.ageMin} - ${item.ageMax}`,
        param: item.ageName,
        id: item.id,
      }))
    })
  axios.get('https://api-www.beautyid.app/concerns?order=ASC&page=1&take=10')
    .then(res => {
      filters.concerns.variants = res.data.data.map((item: { id: number, concernName: string, }) => ({
        text: item.concernName,
        param: item.concernName,
        id: item.id,
      }))
    })
  axios.get('https://api-www.beautyid.app/goodbenefits?order=ASC&page=1&take=10')
    .then(res => {
      filters.benefits.variants = res.data.data.map((item: { id: number, goodBenefitName: string, }) => ({
        text: item.goodBenefitName,
        param: item.goodBenefitName,
        id: item.id,
      }))
    })
  axios.get('https://api-www.beautyid.app/religiondiets?order=ASC&page=1&take=10')
    .then(res => {
      filters.religionDiets.variants = res.data.data.map((item: { id: number, religionDietName: string, }) => ({
        text: item.religionDietName,
        param: item.religionDietName,
        id: item.id,
      }))
    })
  axios.get('https://api-www.beautyid.app/skintypes?order=ASC&page=1&take=10')
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
  <TheHeader/>

  <div class="productResult-top">
    <div class="bg-orange">
      <h2 class="title">Search Results for <span class="bold">{{ $route.params.param }}</span></h2>
      <h1 class="highlight">{{ allItems }}</h1>
      <h3 class="title-secondary">{{ $route.params.param }}'s products in our library</h3>
    </div>
    <ReligionDiets description="Aliquam eget lectus a neque porta tincidunt. Suspendisse et vestibulum enim. Nullam quis dui ut nibh tempor mollis. Nunc fermentum mollis ante vel finibus. Phasellus quis tellus vel arcu dapibus volutpat /" />
  </div>

  <FilterSelect
    @update-filter="(key: string, value: string) => {}"
    :filters="filters" />

  <div class="text-block">
    <h2 class="title bold">Oily skin person within 25-45 age range looking for hydration and cleansing acne products</h2>
  </div>

  <section class="product-list" v-if="products.length">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"/>
    <div class="product-item">
      <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
      <router-link to="/product-filter" class="link bold">specify your search <span>→</span></router-link>
    </div>
  </section>

  <RouterLink class="browser-more tablet-orange link bold" to="#">browser more <span>→</span></RouterLink>

  <div class="productResult-bottom bg-img d-center">
    <RouterLink to="/" class="link bold">Watch Routines with {{ $route.params.param }} Products  <span>→</span></RouterLink>
  </div>

  <TheFooter/>
</template>

<style lang="scss" scoped>
.productResult-top {
  text-align: center;
  display: grid;
  grid-template-columns: 50% 50%;

  .bg-orange {
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-weight: 400;

      span {
        font-weight: 700;
      }
    }

    h1 {
      line-height: 200px;
      padding-top: 20px;

      @media (max-width: 1340px) {
        line-height: 115px;
      }
      @media (max-width: 768px) {
        line-height: 90px;
        font-size: 96px;
      }
      @media (max-width: 480px) {
        line-height: 100px;
      }
    }

    @media (max-width: 768px) {
      padding: 20px;
    }
    @media (max-width: 480px) {
      padding: 20px;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
}
.product-list > div {
  &:nth-child(8) {
    display: grid;
    align-content: space-between;
    padding: 20px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &:nth-child(7) {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .link {
    max-width: 300px;
  }
}

.browser-more {
  display: block;
  width: max-content;
  margin: 0 auto;
  padding: 60px 20px;
}

.text-block {
  border-top: 1px solid $black;

  h2 {
    margin: 0 auto;
    max-width: 800px;
  }
}
.productResult-bottom {
  background-image: url(@/assets/img/product/banner.png);
  padding: 60px 20px;
  height: 600px;
  color: #fff;
  text-align: center;

  @media (max-width: 1000px) {
    height: 450px;
  }
  @media (max-width: 768px) {
    height: 250px;
  }
  @media (max-width: 480px) {
    height: 150px;
  }
}
</style>
