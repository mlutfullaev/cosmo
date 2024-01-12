<script lang="ts" setup>
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import TheAuth from '@/layouts/TheAuth.vue'

</script>

<template>
  <TheHeader />
  <div class="password-reset">
    <div class="bg-img"></div>
    <TheAuth type="password-reset" />
  </div>
  <TheFooter />
</template>

<style lang="scss" scoped>
.password-reset {
  display: grid;
  grid-template-columns: 1fr 480px;
  min-height: calc(100vh - $header-size);

  .bg-img {
    background-image: url('@/assets/img/global/girls-smiling.png');
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .bg-img {
      display: none;
    }
  }
}
</style>
