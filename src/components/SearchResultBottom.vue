<template>
  <section class="searchResult-bottom">
    <div class="searchResult-bottom-img bg-img d-center">
      <h1 class="title">We know more than 100 people with same skin as yours</h1>
    </div>
    <div class="searchResult-bottom-item d-center bg-orange">
      <div>
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
    padding-top: 30px;
  }
}
</style>
