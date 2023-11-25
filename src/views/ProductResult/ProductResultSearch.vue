<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Product, StringObject } from '@/interfaces'
import ProductCard from '@/components/ProductCard.vue'
import TheFilter from '@/layouts/TheFilter.vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import SearchResultBottom from '@/components/SearchResultBottom.vue'
import store from '@/store'

const route = useRoute()
const router = useRouter()
const products = ref<Product[]>([])
const allItems = ref(0)

onMounted(() => {
  axios.get(`https://api-www.beautyid.app/goods/byname/${route.params.param}?order=ASC&page=1&take=11`)
    .then(res => {
      if (!res.data.data.length) {
        router.push(`/product-results/not-found/${route.params.param}`)
        return
      }
      products.value = res.data.data
      allItems.value = res.data.meta.itemCount
    })
})

const filter = (filters: StringObject) => {
  console.log(filters)
}
</script>

<template>
  <TheHeader/>

  <div class="productResult-top">
    <h2 class="title">Search Results for <span class="bold">{{ $route.params.param }}</span></h2>
    <h1 class="highlight orange">{{ allItems }}</h1>
    <h3 class="title-secondary">hand creams in our library</h3>
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
    <RouterLink to="/product-filter" class="link bold">specify your search <span>→</span></RouterLink>
  </div>
  
  <TheFilter
    :items-length="allItems"
    where="product"
    @filter="filter"
    :filters="store.state.productFilters"/>

  <section v-if="products.length" class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"/>
    <div class="product-item tablet">
      <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
      <router-link to="/product-filter" class="link bold">specify your search <span>→</span></router-link>
    </div>
  </section>

  <div v-if="products.length" class="tablet-link bg-orange tablet">
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research.</p>
    <RouterLink class="link bold" to="#">discover more <span>→</span></RouterLink>
  </div>

  <SearchResultBottom />

  <TheFooter/>
</template>

<style lang="scss" scoped>
.productResult-top {
  padding: 60px;
  text-align: center;

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
