<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Product } from '@/interfaces'
import ProductCard from '@/components/ProductCard.vue'
import TheFilter from '@/layouts/TheFilter.vue'

const route = useRoute()

const products = ref<Product[]>([])
const allItems = ref(0)
onMounted(() => {
  if (route.params.search) {
    axios.get(`https://api-www.beautyid.app/goods/byname/${route.params.search}?order=ASC&page=1&take=11`)
      .then(res => {
        products.value = res.data.data
        allItems.value = res.data.meta.itemCount
      })
  } else {
    axios.get('https://api-www.beautyid.app/goods/?order=ASC&page=1&take=11')
      .then(res => {
        products.value = res.data.data
        allItems.value = res.data.meta.itemCount
      })
  }
  console.log(route.query)
})
</script>

<template>
  <TheHeader/>

  <div class="searchResult-top">
    <h2 class="title">Search Results for <span class="bold">{{ $route.params.search }}</span></h2>
    <h1 class="highlight orange">{{ allItems }}</h1>
    <h3 class="title-secondary">hand creams in our library</h3>
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
    <RouterLink to="/product-filter" class="link bold">specify your search <span>→</span></RouterLink>
  </div>

  <TheFilter :tags="true"/>

  <section class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"/>
    <div class="products-item">
      <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
      <router-link to="/product-filter" class="link bold">specify your search <span>→</span></router-link>
    </div>
  </section>

  <div class="tablet-link bg-orange tablet">
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research.</p>
    <RouterLink class="link bold" to="#">discover more <span>→</span></RouterLink>
  </div>

  <section class="searchResult-bottom">
    <div class="searchResult-bottom-img bg-img d-center">
      <h1 class="title">We know more than 100 people with same skin as yours</h1>
    </div>
    <div class="searchResult-bottom-item d-center bg-orange">
      <div class="scan">
        <img src="@/assets/img/global/qr.png" alt="">
        <div class="scan-content">
          <p class="title-secondary bold">scan qr code to Make most from routine Page</p>
          <p class="txt">People with the same age group, ethnicity origin, skin conditions and concerns are your
            SkinTwins and you to see their experiences with {ROUTINE NAME}.</p>
        </div>
      </div>
      <div class="tablet-link bg-orange tablet">
        <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive
          maximum details about products and experiences Your SkinTwins had with this product.</p>
        <RouterLink class="link bold" to="#">try lux ai <span>→</span></RouterLink>
      </div>
    </div>
  </section>
  
  <TheFooter/>
</template>

<style lang="scss" scoped>
.searchResult-top {
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
    @media (max-width: 1000px) {
      font-size: 100px;
    }
    @media (max-width: 768px) {
      font-size: 200px;
    }
    @media (max-width: 480px) {
      line-height: 100px;
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

.searchResult-bottom {
  padding-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 700px;

  &-img {
    background-image: url("@/assets/img/global/girls-smiling.png");
    color: $white;
    text-align: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: 300px auto;
    height: max-content;
    padding-top: 30px;
  }
}
</style>
