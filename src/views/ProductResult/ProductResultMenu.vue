<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Product } from '@/interfaces'
import ProductCard from '@/components/ProductCard.vue'
import TheFilter from '@/layouts/TheFilter.vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ProductFilterSelect from '@/components/ProductFilterSelect.vue'
import ReligionDiets from '@/components/ReligionDiets.vue'
import SearchResultBottom from '@/components/SearchResultBottom.vue'

const route = useRoute()
const router = useRouter()
const products = ref<Product[]>([])
const allItems = ref(0)

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
    <div class="productResult-scan">
      <div class="d-center">
        <h3 class="title-secondary"><span class="bold">create profile</span> to find the product that is best suited to your skin.</h3>
        <img src="@/assets/img/global/qr.png" alt="qr-code">
      </div>
      <h2 class="title">{{ $route.params.param }}</h2>
      <p class="txt">Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products.</p>
    </div>
  </div>
  <div class="text-block">
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
    <RouterLink to="/product-filter" class="link bold">specify your search <span>→</span></RouterLink>
  </div>
  
  <TheFilter :items-length="allItems" where="product"/>

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

  <SearchResultBottom />
  
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

    @media (max-width: 1000px) {
      padding: 40px;
    }
    @media (max-width: 768px) {
      padding: 20px;
    }
  }
  .productResult-scan {
    padding: 60px;
    text-align: left;
    
    @media (max-width: 1000px) {
      padding: 40px;
    }
    @media (max-width: 768px) {
      padding: 20px;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
  @media (max-width: 480px) {
    padding-top: 80px;
  }
}
.text-block {
  border-top: 1px solid $black;
  .txt {
    max-width: 450px;
    margin: 0 auto;
    padding-bottom: 20px;
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
</style>
