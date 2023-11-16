<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import ProductSlider from '@/views/SingleProduct/ProductSlider.vue'
import { Product } from '@/interfaces'

const props = defineProps<{ product: Product }>()

const aboutActiveTab = ref('about')
const aboutTabs = ref(['about', 'ingredients', 'how to use'])
onMounted(() => {
  console.log(props)
})
</script>

<template>
<section id="full-details" class="aboutProduct">
  <ProductSlider :sliders="JSON.parse(product.pictures)" />
  <div class="aboutProduct-inner">
    <div class="min-tablet aboutProduct-tabs">
        <div class="buttons">
          <button v-for="tab in aboutTabs" :class="{ active: aboutActiveTab === tab }" :key="tab"
            @click="aboutActiveTab = tab">{{ tab }}
          </button>
        </div>
        <div class="aboutProduct-tabs-content">
        <Transition name="tab">
          <div class="aboutProduct-content" v-if="aboutActiveTab === 'about'">
            <h3 class="title" style="padding-bottom: 20px">{{ product.name }}</h3>
            <p class="txt" style="padding-bottom: 20px">{{ product.description }}</p>
              <p class="txt-highlight">benefits:</p>
              <!-- <p
                  class="txt-highlight"
                  v-for="benefit in product.benefits.split('``')"
                  :key="benefit"
                >+ {{ benefit }}</p> -->
            </div>
          </Transition>
          <Transition name="tab">
            <div class="aboutProduct-content" v-if="aboutActiveTab === 'ingredients'">
              <p class="txt bold">KEY INGREDIENTS</p>
              <!-- <p
                  v-for="(ingredient, idx) in product.ingredients.split('``')"
                  class="txt bold"
                  :key="ingredient"
                >{{ idx + 1 }}: {{ ingredient }}</p> -->
              <br />
              <p class="txt">
                <b>Full ingredients: </b>
                dolor sit amet consectetur. Cursus aenean odio proin eget non aliquam. Tincidunt nunc auctor nibh risus
                nunc. Viverra massa tincidunt massa nibh vestibulum proin vitae enim lectus. Convallis dolor hac integer
                euismod in id cras elit purus. Ornare tortor sociis eu massa. Dui egestas est.
              </p>
            </div>
          </Transition>
          <Transition name="tab">
            <div class="aboutProduct-content" v-if="aboutActiveTab === 'how to use'">
              <p class="txt">{{ product.manual }}</p>
            </div>
          </Transition>
        </div>
        <div class="scan">
          <img src="@/assets/img/global/qr.png" alt="">
          <div class="scan-content">
          <p class="txt-highlight">scan qr code to make most from product page</p>
          <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive
            maximum details about products and experiences Your SkinTwins had with this product.</p>
        </div>
      </div>
    </div>
      <div class="tablet aboutProduct-accordions">
        <div :class="{ active: aboutActiveTab === 'about' }" class="aboutProduct-accordion">
          <button :class="{ active: aboutActiveTab === 'about' }" @click="aboutActiveTab = 'about'">
            about
          </button>
          <div class="aboutProduct-content">
            <h3 class="title" style="padding-bottom: 20px">{{ product.name }}</h3>
            <p class="txt" style="padding-bottom: 20px">{{ product.description }}</p>
            <p class="txt-highlight">benefits:</p>
          <!-- <p
              v-if="product.benefits.includes('``')"
              class="txt-highlight"
              v-for="benefit in product.benefits.split('``')"
                :key="benefit"
              >+ {{ benefit }}</p>
              <p v-else class="txt-highlight">{{ product.benefits }}</p> -->
          </div>
        </div>
        <div :class="{ active: aboutActiveTab === 'ingredients' }" class="aboutProduct-accordion">
          <button :class="{ active: aboutActiveTab === 'ingredients' }" @click="aboutActiveTab = 'ingredients'">
            ingredients
          </button>
          <div class="aboutProduct-content">
            <p class="txt bold">KEY INGREDIENTS</p>
            <!-- <p
                v-for="(ingredient, idx) in product.ingredients.split('``')"
                class="txt bold"
                :key="ingredient"
              >{{ idx + 1 }}: {{ ingredient }}</p> -->
            <br />
            <p class="txt">
              <b>Full ingredients: </b>
              dolor sit amet consectetur. Cursus aenean odio proin eget non aliquam. Tincidunt nunc auctor nibh risus
              nunc. Viverra massa tincidunt massa nibh vestibulum proin vitae enim lectus. Convallis dolor hac integer
              euismod in id cras elit purus. Ornare tortor sociis eu massa. Dui egestas est.
            </p>
          </div>
        </div>
        <div :class="{ active: aboutActiveTab === 'how to use' }" class="aboutProduct-accordion">
          <button :class="{ active: aboutActiveTab === 'how to use' }" @click="aboutActiveTab = 'how to use'">
            how to use
          </button>
          <div class="aboutProduct-content">
            <p class="txt">{{ product.manual }}</p>
          </div>
        </div>
      </div>
      <router-link to="#" class="tablet link bold tablet-orange">discover more <span>→</span></router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.aboutProduct {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  border-bottom: 1px solid $black;

  .slider {
    padding: 50px 20px;

    @media (max-width: 900px) {
      padding: 20px;
    }
  }

  &-inner {
    height: 100%;
    border-left: 1px solid $black;
    display: grid;
    grid-template-rows: 1fr;

    button {
      width: 100%;
      padding: 20px 50px;
      text-transform: uppercase;
      font-size: 20px;
      transition: .3s;
      color: $black;
      border-bottom: 1px solid $black;

      &.active {
        color: $orange;
        border-bottom: none;
      }

      &:not(:first-child) {
        border-left: 1px solid $black;
      }

      @media (max-width: 1200px) {
        padding: 20px;
      }
    }

    .aboutProduct-content {
      @include pad();
      overflow: hidden;

      &-title {
        padding-bottom: 20px;
      }

      .txt:not(.bold) {
        padding-bottom: 20px;
      }
    }

    .aboutProduct-tabs {
      display: grid;
      grid-template-rows: 65px auto auto;

      .buttons {
        display: flex;
      }

      .scan {
        align-self: end;
        background: $orange;
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    .aboutProduct-accordion {
      .aboutProduct-content {
        height: 0;
        overflow: hidden;
        transition: .3s;
        padding: 0;
      }

      &.active {
        .aboutProduct-content {
          padding: 20px;
          height: max-content;
        }
      }
    }

    @media (max-width: 900px) {
      border-top: 1px solid $black;
      grid-template-rows: auto auto auto;
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: auto;
  }
}</style>
