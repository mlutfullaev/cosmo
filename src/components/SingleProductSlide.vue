<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { Product } from '@/interfaces'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const props = defineProps<{ product: Product }>()

const aboutActiveTab = ref('about')
const aboutTabs = ref(['about', 'ingredients', 'how to use'])

const slides = ref(JSON.parse(props.product.pictures))
const currentSlide = ref(0)
const prev = () => {
  currentSlide.value = currentSlide.value ? currentSlide.value - 1 : slides.value.length - 1
}
const next = () => {
  currentSlide.value = currentSlide.value === slides.value.length - 1 ? 0 : currentSlide.value + 1
}
</script>

<template>
  <section id="full-details" class="full-details">
    <div class="full-details__slider">
      <Carousel
        id="carousel"
        :items-to-show="1"
        :wrap-around="false"
        :autoplay="5000"
        v-model="currentSlide">
        <Slide class="carousel-item" v-for="slide in slides" :key="slide.picture">
          <img :src="`https://api-www.beautyid.app/images/getimage/${slide.picture}`" alt="">
        </Slide>
      </Carousel>
      <Carousel
        id="thumbnails"
        :items-to-show="3"
        v-model="currentSlide"
        ref="carousel"
      >
        <Slide v-for="(slide, idx) in slides" :key="slide.picture">
          <div class="thumbnails-item" @click="currentSlide = idx">
            <img
              :src="`https://api-www.beautyid.app/images/getimage/${slide.picture}`"
              alt="">
          </div>
        </Slide>
      </Carousel>
      <div class="navigation" v-if="slides.length > 1">
        <button @click="prev" class="prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="102" height="23" viewBox="0 0 102 23" fill="none">
            <path
              d="M0.939339 10.2427C0.353554 10.8285 0.353554 11.7782 0.939339 12.364L10.4853 21.9099C11.0711 22.4957 12.0208 22.4957 12.6066 21.9099C13.1924 21.3242 13.1924 20.3744 12.6066 19.7886L4.12132 11.3033L12.6066 2.81806C13.1924 2.23227 13.1924 1.28252 12.6066 0.696735C12.0208 0.110948 11.0711 0.110948 10.4853 0.696735L0.939339 10.2427ZM102 9.80334L2 9.80334L2 12.8033L102 12.8033L102 9.80334Z"
              fill="black"/>
          </svg>
        </button>
        <button @click="next" class="next">
          <svg xmlns="http://www.w3.org/2000/svg" width="102" height="23" viewBox="0 0 102 23" fill="none">
            <path
              d="M101.061 12.364C101.646 11.7782 101.646 10.8285 101.061 10.2427L91.5147 0.696743C90.9289 0.110956 89.9792 0.110956 89.3934 0.696743C88.8076 1.28253 88.8076 2.23228 89.3934 2.81806L97.8787 11.3033L89.3934 19.7886C88.8076 20.3744 88.8076 21.3242 89.3934 21.9099C89.9792 22.4957 90.9289 22.4957 91.5147 21.9099L101.061 12.364ZM0 12.8033H100V9.80334H0V12.8033Z"
              fill="black"/>
          </svg>
        </button>
      </div>
      <div class="pagination">
        <button
          v-for="(slide, idx) in slides"
          :key="slide.picture"
          @click="currentSlide = idx"
          :class="{active: currentSlide === idx}"
        ></button>
      </div>
    </div>
    <div class="full-details__inner">
      <div class="full-details__inner__buttons">
        <button v-for="tab in aboutTabs" :class="{ active: aboutActiveTab === tab }" :key="tab"
          @click="aboutActiveTab = tab">{{ tab }}
        </button>
      </div>
      <div>
        <Transition name="tab">
          <div class="full-details__inner__tab" v-if="aboutActiveTab === 'about'">
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
          <div class="full-details__inner__tab" v-if="aboutActiveTab === 'ingredients'">
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
          <div class="full-details__inner__tab" v-if="aboutActiveTab === 'how to use'">
            <p class="txt">{{ product.manual }}</p>
          </div>
        </Transition>
      </div>
      <div class="scan">
        <img src="@/assets/img/global/qr.png" alt="">
        <div class="scan-content">
          <p class="txt-highlight">scan qr code to make most from product page</p>
          <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive maximum details about products and experiences Your SkinTwins had with this product.</p>
        </div>
      </div>
    </div>
    <div class="tablet full-details__accordions">
      <div :class="{ active: aboutActiveTab === 'about' }" class="full-details__accordion">
        <button :class="{ active: aboutActiveTab === 'about' }" @click="aboutActiveTab = 'about'">about</button>
        <div class="full-details__inner__tab">
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
      <div :class="{ active: aboutActiveTab === 'ingredients' }" class="full-details__accordion">
        <button :class="{ active: aboutActiveTab === 'ingredients' }" @click="aboutActiveTab = 'ingredients'">ingredients</button>
        <div class="full-details__inner__tab">
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
      <div :class="{ active: aboutActiveTab === 'how to use' }" class="full-details__accordion">
        <button :class="{ active: aboutActiveTab === 'how to use' }" @click="aboutActiveTab = 'how to use'">
          how to use
        </button>
        <div class="full-details__inner__tab">
          <p class="txt">{{ product.manual }}</p>
        </div>
      </div>
    </div>
    <router-link to="#" class="tablet link bold tablet-orange">discover more <span>→</span></router-link>
  </section>
</template>

<style lang="scss" scoped>
.full-details {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  border-bottom: 1px solid $black;
  
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

  &__slider {
    position: relative;
    padding: 50px 20px;

    #carousel {
      .carousel-item img {
        max-width: 80%;
        max-height: 686px;
          
        @media (max-width: 1440px) {
          max-height: 400px;
        }
        @media (max-width: 480px) {
          max-height: 300px;
        }
      }
    }

    #thumbnails {
      padding-top: 30px;

      .thumbnails-item img {
        max-height: 100px;
        max-width: 100px;
      }

      .carousel__slide--active .thumbnails-item {
        border: 1px solid $black;
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    .navigation {
      button {
        position: absolute;
        top: 50%;
      }

      .next {
        right: 20px;
      }

      .prev {
        left: 20px;
      }
      @media (max-width: 768px) {
        display: none;
      }
    }
    .pagination {
      display: none;
    }

    @media (max-width: 1000px) {
      padding: 30px;
    }
    @media (max-width: 768px) {
      padding: 20px;
      .pagination {
        display: flex;
      }
    }
  }
  &__inner {
    height: 100%;
    border-left: 1px solid $black;
    display: grid;
    grid-template-rows: 65px 1fr auto;
    overflow: hidden;

    &__buttons {
      display: grid;
      grid-template-columns: repeat(3, auto);
    }
    &__title {
      padding-bottom: 20px;
    }
    &__tab {
      padding: 60px;

      @media (max-width: 1200px) {
        padding: 40px;
      }
      @media (max-width: 1000px) {
        padding: 20px;
      }
    }

    .txt:not(.bold) {
      padding-bottom: 20px;
    }
    .scan {
      align-self: end;
      background: $orange;
    }

    @media (max-width: 900px) {
      border-top: 1px solid $black;
      grid-template-rows: auto auto auto;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  &__accordion {
    button {
      text-align: left;
    }
    .full-details__inner__tab {
      max-height: 0;
      overflow: hidden;
      transition: .3s;
      padding: 0 20px;
    }

    &.active {
      .full-details__inner__tab {
        padding: 20px;
        max-height: 400px;
      }
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: 46% 54%;
  }
  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
}
</style>
