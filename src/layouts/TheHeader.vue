<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import TheMenu from '@/layouts/TheMenu.vue'
import CountryAlert from '@/components/CountryAlert.vue'
import FilterBrands from '@/components/FilterBrands.vue'
import axios from 'axios'

const alertActive = ref(false)
const city = ref('city')
const productLibrary = reactive<{[key: string]: {title: string, items: {id: number, param: string, text: string}[]}}>({
  categories: {
    title: 'Categories',
    items: []
  },
  skinTypes: {
    title: 'skin type',
    items: []
  },
  steps: {
    title: 'steps',
    items: []
  },
})
onMounted(() => {
  axios.get('https://api-www.beautyid.app/forms?order=ASC&page=1&take=8')
    .then(res => {
      productLibrary.categories.items = res.data.data.map((category: { id: number, applicationName: string }) => ({ id: category.id, text: category.applicationName, param: category.applicationName }))
    })
  axios.get('https://api-www.beautyid.app/skintypes?order=ASC&page=1&take=8')
    .then(res => {
      productLibrary.skinTypes.items = res.data.data.map((skinType: { id: number, skinTypeName: string, skinTypeNameForSearch: string }) => ({ id: skinType.id, text: skinType.skinTypeName, param: skinType.skinTypeNameForSearch }))
      productLibrary.steps.items = res.data.data.map((skinType: { id: number, skinTypeName: string, skinTypeNameForSearch: string }) => ({ id: skinType.id, text: skinType.skinTypeName, param: skinType.skinTypeNameForSearch }))
    })
})
</script>

<template>
  <header class="d-sb">
    <div class="header-items d-sb">
      <router-link to="/" class="logo">cosmo.<span>wiki</span></router-link>
      <button class="d-center" @click="alertActive = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="19" viewBox="0 0 13 19" fill="none">
          <path d="M6.31574 18.0585C5.32689 17.1153 4.42552 16.096 3.57358 15.0273C2.58093 13.7798 1.67956 12.4677 0.983557 11.0262C0.542377 10.1173 0.192476 9.17405 0.0593614 8.16618C-0.138409 6.6791 0.158247 5.29091 0.945525 4.02442C1.98382 2.35098 3.49372 1.34691 5.43338 1.02363C8.00059 0.597665 10.6325 1.85655 11.937 4.10809C12.9639 5.88041 13.0742 7.73641 12.4124 9.65706C11.918 11.0909 11.1649 12.384 10.3016 13.6201C9.22905 15.1604 8.012 16.5752 6.68086 17.8988C6.62761 17.952 6.57056 18.0052 6.51352 18.0547H6.31194L6.31574 18.0585ZM3.4747 7.37129C3.4747 8.98769 4.79824 10.3036 6.42984 10.3036C8.03102 10.3036 9.35456 8.98008 9.35836 7.3789C9.35836 5.75491 8.05004 4.42756 6.44506 4.42376C4.79444 4.41995 3.4785 5.72828 3.4747 7.37129Z" fill="black"/>
        </svg>
        <span class="min-phone">{{ city }}</span>
      </button>
    </div>
    <nav>
      <HeaderSearch />
      <router-link to="/routine-intro">SKIN ROUTINES LIBRARY ↓</router-link>
      <div class="nav-item">
        <router-link to="/product-intro">SKIN PRODUCT LIBRARY ↓</router-link>
        <div class="sub-menu">
          <div class="sub-menu-content">
            <div
              v-for="(lib, key) of productLibrary"
              :key="key"
              class="sub-menu-item">
              <p class="txt-highlight">{{lib.title}}</p>
              <RouterLink
                class="note"
                v-for="item in lib.items"
                :to="`/product-results/menu/${item.param}`"
                :key="item.id"
              >{{ item.text }}</RouterLink>
            </div>
          </div>
          <FilterBrands button-type="link" />
        </div>
      </div>
      <router-link to="/registration">CREATE PROFILE</router-link>
    </nav>
    <CountryAlert
      :city="city"
      :alert-active="alertActive"
      @alert="(value: boolean) => alertActive = value"
      @city="(value: string) => city = value"/>
  </header>
  <TheMenu :productLibrary="productLibrary"/>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 2;
  padding: 20px;
  border-bottom: 1px solid $black;

  .header-items {
    gap: 20px;

    button {
      font-size: 14px;
      gap: 5px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      text-transform: uppercase;
      transition: .3s;

      &:hover {
        color: $orange;
      }

      @media (max-width: 769px) {
        display: none;
      }
    }

    .nav-item {

      .sub-menu {
        border-top: 1px solid $black;
        top: 62px;
        position: absolute;
        right: 0;
        background-color: $white;
        widows: 100%;
        left: 0;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-30px);
        transition: .3s;

        &-content {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding-bottom: 10px;

          p {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid $black;
            margin-bottom: 10px;
          }
          a {
            display: block;
            color: $grey-dark;
            margin: 0 auto;
            width: max-content;
            text-align: center;
            padding: 10px 20px;
            transition: .3s;

            &:hover {
              color: $orange;
            }
          }
        }
      }

      &:hover {
        .sub-menu {
          visibility: visible;
          opacity: 1;
          z-index: 1;
          transform: translateY(0);
        }
      }
    }

    @media (max-width: 768px) {
      padding-right: 40px;
    }
    @media (max-width: 480px) {
      gap: 0;
    }
  }
}
</style>
