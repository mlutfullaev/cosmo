<script setup lang="ts">
import { ref } from 'vue'
import ProfileItem from '@/components/ProfileItem.vue'

const createProduct = ref(false)
const products = ref([
  {
    text: '1 lb african black soap / 16 oz 100% natural raw soap for acne, eczema, psoriasis, scar removal face and body wash. handmade by aroma depot',
    price: '$ 180',
    rating: 4.5,
    img: require('@/assets/img/product/product.png')
  },
  {
    text: '1 lb african black soap / 16 oz 100% natural raw soap for acne, eczema, psoriasis, scar removal face and body wash. handmade by aroma depot',
    price: '$ 180',
    rating: 4.5,
    img: require('@/assets/img/product/product.png')
  },
  {
    text: '1 lb african black soap / 16 oz 100% natural raw soap for acne, eczema, psoriasis, scar removal face and body wash. handmade by aroma depot',
    price: '$ 180',
    rating: 4.5,
    img: require('@/assets/img/product/product.png')
  },
  {
    text: '1 lb african black soap / 16 oz 100% natural raw soap for acne, eczema, psoriasis, scar removal face and body wash. handmade by aroma depot',
    price: '$ 180',
    rating: 4.5,
    img: require('@/assets/img/product/product.png')
  },
])

</script>

<template>
  <div v-if="!createProduct" class="profile-products">
    <h1 class="title-secondary">MY SAVED PRODUCTS</h1>
    <p class="txt-highlight" v-if="!products.length">no products here yet</p>
    <p class="txt" v-if="!products.length">
      To add products, click on
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
        <path d="M17 4.58679V15.8621C17 17.3013 15.8114 17.9067 14.36 17.212L9.86858 15.0383C9.38858 14.81 8.61142 14.81 8.13142 15.0383L3.64 17.212C2.18857 17.9067 1 17.3013 1 15.8621V4.58679C1 2.88955 2.59999 1.5 4.55427 1.5H13.4457C15.4 1.5 17 2.88955 17 4.58679Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </p>
    <div v-else class="profile-list">
      <ProfileItem
        v-for="product in products"
        :key="product.text"
        :text="product.text"
        :img="product.img"
        :rating="product.rating"
        :price="product.price"
        img-alt="hello"
      />
    </div>
    <div class="d-sb">
      <h1 class="title-secondary">MY addED PRODUCTS</h1>
      <button class="btn btn-outline">Add new +</button>
    </div>
    <p class="txt-highlight" v-if="!products.length">no products here yet</p>
  </div>
  <div v-else class="profile-products">

  </div>
</template>

<style scoped lang="scss">
.profile-products {
  h1 {
    padding: 60px 0 36px;
  }
  > h1:first-child {
    padding-top: 0;
  }
}
</style>
