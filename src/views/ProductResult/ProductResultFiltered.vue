<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import store from '@/store'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { Product, StringObject } from '@/assets/interfaces'
import ProductCard from '@/components/ProductCard.vue'
import TheFilter from '@/layouts/TheFilter.vue'
import SearchResultBottom from '@/components/SearchResultBottom.vue'
import { API_URL, productFilters } from '@/assets/constants'

const route = useRoute()
const router = useRouter()
const products = ref<Product[]>([])
const allItems = ref(0)

const getItems = () => {
  axios.get(`${API_URL}goods/filtered`, {
    params: route.query
  })
    .then(res => {
      if (!res.data.data.length) {
        router.push('/product-results/not-found/')
        return
      }
      products.value = res.data.data
      allItems.value = res.data.meta.itemCount
    })
}

onMounted(() => getItems())
watch(route, () => getItems())

const moreItems = () => {
  axios.get(`${API_URL}goods/filtered`, {
    params: {
      ...route.query,
      take: 12,
      page: route.query.page + 1,
    }
  })
    .then(res => {
      if (!res.data.data.length) return
      console.log(res.data)
      products.value = [...products.value, ...res.data.data]
    })
}

const filter = (filters: StringObject) => {
  console.log(filters)
}
</script>

<template>
  <TheHeader/>

  <div class="searchResult-top">
    <h2 class="title">Search Results for <span class="bold">{{ $route.params.param }}</span></h2>
    <h2 class="title bold">Oily skin person within 25-45 age range looking for hydration and cleansing acne products</h2>
    <h1 class="highlight orange">{{ allItems }}</h1>
    <h3 class="title-secondary">Products</h3>
  </div>
  <TheFilter
    :items-length="allItems"
    where="product"
    @filter="filter"
    :filters="productFilters"/>

  <section v-if="products.length" class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
    <div class="product-item center tablet" v-if="allItems > products.length">
      <button class="bold link" @click="moreItems">discover <br/> more <span>→</span></button>
    </div>
  </section>

  <div class="tablet-link bg-orange tablet" v-if="allItems > products.length">
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research.</p>
    <button class="bold link" @click="moreItems">discover <br/> more <span>→</span></button>
  </div>

  <SearchResultBottom />

  <TheFooter/>
</template>

<style lang="scss" scoped>
.searchResult-top {
  padding: 60px;
  text-align: center;

  .title {
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
    &.bold {
      font-weight: 700;
    }
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
    }
  }

  .txt {
    padding: 40px 0 20px;
    margin: 0 auto;
    max-width: 450px;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
  @media (max-width: 480px) {
    padding: 80px 20px 20px;
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

.tablet-link {
  padding: 20px;
  grid-column: 1 / 3;
  width: 100%;

  p {
    padding-bottom: 20px;
  }
}
</style>
