<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

export default defineComponent({
  components: { ProductCard },
  data: () => ({
    products: [
      {
        title: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 4,
        id: 1
      },
      {
        title: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 4,
        id: 2
      },
      {
        title: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 4,
        id: 3
      },
      {
        title: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 4,
        id: 4
      },
      {
        title: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 4,
        id: 5
      },
      {
        title: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 4,
        id: 6
      },
      {
        title: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 4,
        id: 7
      },
    ],
  })
})
</script>

<template>
  <TheHeader />
  <div class="searchResult-top">
    <h1 class="title">Search Results for Hand Cream</h1>
    <p class="txt">Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products.</p>
  </div>
  <section class="products">
    <div
      class="products-item"
      v-for="product in products"
      :key="product.title">
      <ProductCard :card="product"/>
    </div>
    <div class="products-item">
      <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
      <router-link to="#" class="link bold">specify your search <span>→</span></router-link>
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
          <p class="txt">People with the same age group, ethnicity origin, skin conditions and concerns are your SkinTwins and you to see their experiences with {ROUTINE NAME}.</p>
        </div>
      </div>
      <div class="tablet-link bg-orange tablet">
        <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive maximum details about products and experiences Your SkinTwins had with this product.</p>
        <RouterLink class="link bold" to="#">try lux ai <span>→</span></RouterLink>
      </div>
    </div>
  </section>
  <TheFooter />
</template>

<style lang="scss" scoped>
.searchResult-top {
  padding: 60px;

  h1 {
    padding-bottom: 20px;
  }
  @media (max-width: 768px) {
    padding: 30px;
  }
  @media (max-width: 480px) {
    padding: 20px;
  }
}
.products .products-item {
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
