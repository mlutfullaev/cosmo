<script setup lang="ts">
import { ref } from 'vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import TheMenu from '@/layouts/TheMenu.vue'
import CountryAlert from '@/components/CountryAlert.vue'

const alertActive = ref(false)
const city = ref('city')
</script>

<template>
  <header class="d-sb">
    <div class="header-items d-sb">
      <router-link to="/" class="logo">cosmo.<span>wiki</span></router-link>
      <button class="d-center" @click="alertActive = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="19" viewBox="0 0 13 19" fill="none">
          <path
            d="M6.31574 18.0585C5.32689 17.1153 4.42552 16.096 3.57358 15.0273C2.58093 13.7798 1.67956 12.4677 0.983557 11.0262C0.542377 10.1173 0.192476 9.17405 0.0593614 8.16618C-0.138409 6.6791 0.158247 5.29091 0.945525 4.02442C1.98382 2.35098 3.49372 1.34691 5.43338 1.02363C8.00059 0.597665 10.6325 1.85655 11.937 4.10809C12.9639 5.88041 13.0742 7.73641 12.4124 9.65706C11.918 11.0909 11.1649 12.384 10.3016 13.6201C9.22905 15.1604 8.012 16.5752 6.68086 17.8988C6.62761 17.952 6.57056 18.0052 6.51352 18.0547H6.31194L6.31574 18.0585ZM3.4747 7.37129C3.4747 8.98769 4.79824 10.3036 6.42984 10.3036C8.03102 10.3036 9.35456 8.98008 9.35836 7.3789C9.35836 5.75491 8.05004 4.42756 6.44506 4.42376C4.79444 4.41995 3.4785 5.72828 3.4747 7.37129Z"
            fill="black"/>
        </svg>
        {{ city }}
      </button>
    </div>
    <nav>
      <HeaderSearch/>
      <router-link to="/routine-intro">SKIN ROUTINES LIBRARY ↓</router-link>
      <router-link to="/product-intro">SKIN PRODUCT LIBRARY ↓</router-link>
      <router-link to="/registration">AI PERSONAL AI ASSISTANT ↓</router-link>
    </nav>
    <CountryAlert
      :city="city"
      :alert-active="alertActive"
      @alert="(value: boolean) => alertActive = value"
      @city="(value: string) => city = value"/>
  </header>
  <TheMenu/>
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

    @media (max-width: 768px) {
      padding-right: 40px;
    }
  }
}
</style>
