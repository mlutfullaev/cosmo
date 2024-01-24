<script lang="ts" setup>
import text from '@/assets/locales/components.json'
import store from '@/store'
</script>

<template>
  <section v-if="!store.state.beauty" class="searchResult-bottom">
    <div class="searchResult-bottom-img bg-img d-center">
      <h1 class="title">{{text.WeKnowPeople[store.state.lang]}}</h1>
    </div>
    <div class="searchResult-bottom-item d-center bg-orange">
      <div>
        <img src="@/assets/img/global/qr.png" alt="">
        <div class="scan-content">
          <p class="title-secondary bold">{{text.scanQrCode[store.state.lang]}}</p>
          <p class="txt">{{text.resultsBottomTxt[store.state.lang]}}</p>
        </div>
      </div>
      <div class="tablet-link bg-orange tablet">
        <p class="txt">{{text.WeCollectBeautyProducts[store.state.lang]}}</p>
        <RouterLink class="link bold" to="#">{{text.tryLuxAi[store.state.lang]}}<span>→</span></RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.searchResult-bottom {
  padding-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 700px;

  &-img {
    background-image: url("@/assets/img/global/girls-smiling.png");
    color: $white;
    text-align: center;
    padding: 20px;
  }

  &-item {
    padding: 60px;

    @media (max-width: 768px) {
      padding: 20px;
      > div:not(.tablet-link) {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: 300px auto;
    height: max-content;
    padding-top: 0;
  }
}
</style>
