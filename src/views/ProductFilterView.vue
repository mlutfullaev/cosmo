<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {}
})
</script>

<template>
  <div class="productFilter">
    <TheHeader />
    <div class="productFilter-top">
      <RouterLink to="/search-results">
        <svg xmlns="http://www.w3.org/2000/svg" width="62" height="24" viewBox="0 0 62 24" fill="none">
          <path d="M0.939335 10.9393C0.35355 11.5251 0.35355 12.4749 0.939335 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51471C13.1924 2.92893 13.1924 1.97918 12.6066 1.39339C12.0208 0.807607 11.0711 0.807607 10.4853 1.39339L0.939335 10.9393ZM62 10.5L2 10.5L2 13.5L62 13.5L62 10.5Z" fill="black"/>
        </svg>
      </RouterLink>
      <h1 class="title">We can do in-depth selection as well</h1>
      <p class="txt">Please select the targeted age group. If the product does not have age specification or warnings for age </p>
    </div>
    <div class="productFilter-inner">
      <div class="productFilter-tabs">
        <div class="productFilter-tab">
          <button>
            Age targeted group
          </button>
          <p class="txt">
            Please select the targeted age group. If the product does not have age specification or warnings for age use, we will show it presnt it in any selection/
          </p>
        </div>
      </div>
      <div class="content">

      </div>
    </div>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.productFilter {

  &-top {
    padding: 60px;
    position: relative;
    display: grid;
    align-items: center;
    justify-content: center;

    a {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 30px;
    }
  }
}
</style>
