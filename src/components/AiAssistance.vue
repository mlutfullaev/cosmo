<script setup lang="ts">
import { ref } from 'vue'
import store from '@/store'

const descriptions = ref([
  {
    title: 'PRODUCT DETAILS',
    description: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now.  In the Store or at home.  Anything You wanted to know about this product now.'
  },
  {
    title: 'AI ASSISTANCE IN YOUR SMARTPHONE',
    description: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now.  In the Store or at home.  Anything You wanted to know about this product now.'
  },
  {
    title: 'SKINTWIN RELEVANT ARTICLES',
    description: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now.  In the Store or at home.  Anything You wanted to know about this product now.'
  },
  {
    title: 'REMINDERS, NOTIFICATIONS and more',
    description: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now.  In the Store or at home.  Anything You wanted to know about this product now.'
  },
])
const activeDesc = ref('PRODUCT DETAILS')

const checkBeauty = () => {
  store.commit('checkBeauty')
}
</script>

<template>
  <section id="ai-assistance" class="ai-assistance">
    <h3 class="title">Get most Support with Your Personal AI Beauty Assistant</h3>
    <div class="ai-assistance__content">
      <div class="ai-assistance__content__switcher">
        <button
          v-for="(desc, idx) in descriptions"
          :key="desc.title"
          @click="activeDesc = desc.title"
          class="txt-highlight"
          :class="{active: activeDesc === desc.title}"
        >0{{ idx + 1 }} {{ desc.title }}
        </button>
      </div>
      <div class="ai-assistance__content__inner">
        <div
          class="ai-assistance-item"
          v-for="(desc, idx) in descriptions"
          :key="desc.title"
          v-show="activeDesc === desc.title">
          <Transition name="tab">
            <div v-if="activeDesc === desc.title">
              <h1 class="ai-assistance-number">0{{ idx + 1 }}</h1>
              <div>
                <p class="txt-highlight">{{ desc.title }}</p>
                <p class="txt">{{ desc.description }}</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div class="scan" v-if="!store.state.beauty">
        <img @click="checkBeauty" src="@/assets/img/global/qr.png" alt="">
        <div class="scan-content">
          <p class="txt bold t-up">scan qr code to make most from product page</p>
          <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive
            maximum details about products and experiences Your SkinTwins had with this product.</p>
        </div>
      </div>
    </div>
    <router-link to="#" class="tablet link bold tablet-orange">discover more <span>→</span></router-link>
  </section>
</template>

<style lang="scss" scoped>
.ai-assistance {
  padding: 100px 60px;

  h3 {
    text-transform: uppercase;
    padding-bottom: 50px;
    max-width: 730px;

    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }

  &__content {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr;
    grid-gap: 30px;

    &__switcher {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 20px;

      button {
        color: $grey;
        transition: .3s;
        text-align: left;

        &.active {
          color: $orange;
        }
      }
    }
    @media (max-width: 768px) {
      grid-template-columns: auto;
      padding: 0 20px;
      grid-gap: 20px;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    gap: $padding;

    > div {
      padding: 0 0 20px;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: auto;
        border-top: none;
        padding: 20px 0;
      }
    }

    .ai-assistance-number {
      font-size: 250px;
      color: $orange;
      font-weight: 400;

      @media (max-width: 1200px) {
        font-size: 121px;
      }
      @media (max-width: 1000px) {
        font-size: 96px;
      }
    }

    p {
      padding-bottom: 20px;
      max-width: 800px;

      &.txt-highlight {
        border-top: 1px solid $black;
        padding-top: 20px;
      }
    }
  }

  .scan {
    grid-column: 2;
    max-width: 900px;
    margin-left: auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (max-width: 768px) {
    padding: 60px 0;
  }
}
</style>
