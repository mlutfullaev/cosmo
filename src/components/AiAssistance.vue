<script setup lang="ts">
import { ref } from 'vue'
import store from '@/store'

const descriptions = ref([
  {
    tabText: 'PRODUCT CHECK TO MATCH YOUR SKIN',
    title: 'PRODUCT DETAILS AT YOUR FINGERTIPS. JUST ASK THE QUESTION.',
    description: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now.  In the Store or at home.  Anything You wanted to know about this product now.'
  },
  {
    tabText: 'EFFICIENCY ASSESMENT',
    title: 'SELF ASSESMENT AND AI ASSISTANCE TO MAKE BEST EVALUATIONS.',
    description: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now.  In the Store or at home.  Anything You wanted to know about this product now.'
  },
  {
    tabText: 'ASSISTANT IN THE STORE AND HOME',
    title: 'NOT A MINUTE WASTED TO WAIT FOR ASSISTANT.',
    description: 'Just type the Brand and Product Title or scan barcode to get full assistance about the product in the Store or at Home. Works anywhere you can use your smartphone and internet.)'
  },
  {
    tabText: 'PERSONAL REMINDERS TO START',
    title: 'KEEP CONTROL OF EVERYTHING',
    description: 'Tell LUX to remind You to use specific product by Wednesdays only or to start on 15th of March next year and keep it fully under control. LUX will remind you when to start or stop using. No need to keep Your Weekly Routine Card.'
  },
  {
    tabText: 'SAVE IT. CHECK IT LATER.',
    title: 'PERSONAL. BEAUTY.  LIBRARY. ',
    description: 'Save the Product name to Your notes and check it later in the Store. Your Product Library is the great way to keep beauty products wish list notes.'
  },
])
const activeDesc = ref('PRODUCT CHECK TO MATCH YOUR SKIN')

const checkBeauty = () => {
  store.commit('checkBeauty')
}
</script>

<template>
  <section id="ai-assistance" class="ai-assistance">
    <h2 class="section-title">Ask your question</h2>
    <h3>Get most with Your Personal AI Beauty Assistant</h3>
    <div class="ai-assistance__content">
      <div class="ai-assistance__content__switcher">
        <button
          v-for="(desc, idx) in descriptions"
          :key="desc.title"
          @click="activeDesc = desc.tabText"
          class="txt-highlight"
          :class="{active: activeDesc === desc.tabText}"
        >0{{ idx + 1 }} {{ desc.tabText }}
        </button>
      </div>
      <div class="ai-assistance__content__inner">
        <div
          class="ai-assistance-item"
          v-for="(desc, idx) in descriptions"
          :key="desc.tabText"
          v-show="activeDesc === desc.tabText">
          <Transition name="tab">
            <div v-if="activeDesc === desc.tabText">
              <h1 class="ai-assistance-number">0{{ idx + 1 }}</h1>
              <div>
                <p class="txt-highlight">{{ desc.title }}</p>
                <p class="txt">{{ desc.description }}</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ai-assistance {
  padding: 150px 60px;

  h3 {
    font-size: 36px;
    font-weight: 700;
    padding: 10px 0 60px;
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
      @media (max-width: 768px) {
        border-top: 1px solid $black;
      }
    }

    p {
      padding-bottom: 20px;
      max-width: 800px;

      &.txt-highlight {
        border-top: 1px solid $black;
        padding-top: 20px;

        @media (max-width: 768px) {
          border-top: none;
          padding-top: 0;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    padding: 120px 20px;
  }
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
}
</style>
