<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Product } from '@/assets/interfaces'
import ProductCard from '@/components/ProductCard.vue'
import axios from 'axios'
import SearchResultBottom from '@/components/SearchResultBottom.vue'
import { API_URL } from '@/assets/constants'

const alternatives = ref<Product[]>([])

onMounted(() => {
  axios.get(`${API_URL}goods/alternative/22346?order=ASC&page=1&take=10`)
    .then(res => {
      alternatives.value = res.data.data
    })
})
</script>

<template>
  <TheHeader/>

  <div class="productResult-top">
    <h2 class="title">There are no result for your search <span class="bold">{{ $route.params.param ? `“${$route.params.param}”` : '' }}</span></h2>
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
    <RouterLink to="/product-filter" class="link bold">specify your search <span>→</span></RouterLink>
  </div>

  <section class="product-list">
    <div class="product-item">
      <h3 class="title t-up">check alternative products</h3>
      <p class="txt">These aternative products to L’Oreal Argan Pure Oil were selected based on the ingredients and
        Brand statements about concerns and benefits.</p>
    </div>
    <ProductCard v-for="product in alternatives" :key="product.id" :product="product" />
    <div class="d-center product-item center">
        <RouterLink to="/product-filter" class="link bold">specify your search <span>→</span></RouterLink>
    </div>
  </section>

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
    padding: 20px;
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
