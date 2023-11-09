<script lang="ts">
import { defineComponent } from 'vue'
import LuxAi from '@/components/LuxAi.vue'

export default defineComponent({
  components: { LuxAi }
})
</script>

<template>
  <TheHeader/>
  <main>
    <div class="main-content d-center">
      <h1 class="title">In order to get full details and Personal assistance you should create Your skin profile in
        Messengers or in our Beauty ID application.</h1>
    </div>
    <div class="main-img bg-img"></div>
  </main>
  <section class="socials bg-orange">
    <a class="title-secondary" href="#">Telegram</a>
    <a class="title-secondary" href="#">whatsapp</a>
    <a class="title-secondary" href="#">kakaotalk</a>
    <a class="title-secondary" href="#">app store</a>
    <a class="title-secondary" href="#">google Play</a>
  </section>
  <LuxAi/>
  <TheFooter/>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 50% 50%;
  height: calc(100vh - 62px);

  .main-content {
    padding: 60px;

    @media (max-width: 768px) {
      padding: 50px 30px;
    }
    @media (max-width: 550px) {
      .title {
        font-size: 24px;
      }
    }
  }

  .main-img {
    background-image: url("@/assets/img/global/girls-smiling.png");
  }

  @media (max-width: 1440px) {
    height: 800px;
  }
  @media (max-width: 1230px) {
    height: 600px;
  }
  @media (max-width: 768px) {
    height: max-content;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 300px;
  }
}

.socials {
  display: grid;
  grid-template-columns: repeat(5, auto);
  align-items: center;
  justify-content: center;
  justify-items: center;
  padding: 60px;
  height: 300px;
  gap: 60px;

  .title-secondary {
    transition: .3s;

    &:hover {
      color: #fff;
      font-weight: 700;
    }

    @media (max-width: 1230px) {
      font-size: 24px;
    }
  }

  @media (max-width: 1350px) {
    gap: 30px;
  }
  @media (max-width: 900px) {
    grid-template-columns: auto auto auto;
    grid-row-gap: 0
  }
  @media (max-width: 600px) {
    height: auto;
    padding: 30px;
    grid-row-gap: 20px;
    grid-template-columns: auto;
  }
}
</style>
