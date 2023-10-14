<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<template>
  <footer>
    <div class="footer">
      <div class="footer-item">
        <router-link to="/" class="text bold">cosmo.wiki</router-link>
        <p class="text">Make smart Beauty decisions with Independed Skincare Wikipedia for Beauty products and Routine references.</p>
      </div>
      <div class="footer-item">
        <router-link to="#" class="text bold">Skincare Products Library</router-link>
        <router-link to="#" class="text bold">Routines Library</router-link>
        <router-link to="#" class="text bold">your Beauty ID</router-link>
      </div>
      <div class="footer-item">
        <p class="text bold">Connect with LUX AI Personal Beauty Assistant</p>
        <router-link to="/" class="text">Telegram</router-link>
        <router-link to="/" class="text">Whatsapp</router-link>
        <router-link to="/" class="text">Android</router-link>
        <router-link to="/" class="text">IOS</router-link>
      </div>
      <div class="footer-item">
        <p class="text bold">Our Story</p>
        <router-link to="#" class="text">For Retailers</router-link>
        <router-link to="#" class="text">For Brands</router-link>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="text">©2023 COSMO.WIKI. All rights reserved</p>
      <router-link to="#" class="text">Legals</router-link>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background: $grey;
  @include pad();

  .footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    gap: 50px;
    padding-bottom: 40px;

    &-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .footer-bottom {
    @include display-center(space-between);
  }
}
</style>
