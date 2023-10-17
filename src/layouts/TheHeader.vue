<script lang="ts">
import { defineComponent } from 'vue'
import HeaderSearch from '@/components/HeaderSearch.vue'
import TheMenu from '@/components/TheMenu.vue'

export default defineComponent({
  name: 'TheHeader',
  components: { TheMenu, HeaderSearch },
})
</script>

<template>
  <header>
      <router-link to="/" class="logo">cosmo.<span>wiki</span></router-link>
    <nav>
      <HeaderSearch />
      <router-link to="#">SKIN ROUTINES LIBRARY<span></span></router-link>
      <router-link to="#">SKIN PRODUCT LIBRARY<span></span></router-link>
      <router-link to="#">AI PERSONAL AI ASSISTANT<span></span></router-link>
    </nav>
  </header>
  <TheMenu />
</template>

<style lang="scss" scoped>
header {
  position: relative;
  padding: 20px;
  border-bottom: 1px solid $black;
  @include display-center(space-between);

  nav {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;

      span {
        content: '';
        height: 1px;
        width: 0;
        background-color: $orange;
        display: block;
        bottom: 0;
        left: 0;
        transition: all .2s
      }

      &:hover span {
        width: 100%;
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
