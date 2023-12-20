<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { Product } from '@/interfaces'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import store from '@/store'

const props = defineProps<{ product: Product }>()

const activeTab = ref('')
const tabs = ref(['Full details', 'Key Ingredients'])

const slides = ref(JSON.parse(props.product.pictures))
const currentSlide = ref<string | number>(0)
const prev = () => {
  currentSlide.value = currentSlide.value ? +currentSlide.value - 1 : slides.value.length - 1
}
const next = () => {
  currentSlide.value = currentSlide.value === slides.value.length - 1 ? 0 : +currentSlide.value + 1
}
onMounted(() => {
  activeTab.value = tabs.value[0]
})
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
    <div class="full-details__buttons">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="{active: activeTab === tab}"
      >{{ tab }}</button>
    </div>
    <div class="full-details__inner">
      <p class="txt-highlight orange tablet">{{ activeTab }}</p>
      <h3 class="title">{{ product.name }}</h3>
      <p class="txt">{{ product.description }}</p>
      <router-link to="#" class="link bg-orange">see full details <span>→</span></router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.full-details {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto 1fr;
  align-items: center;
  border-bottom: 1px solid $black;

  &__slider {
    position: relative;
    grid-row: 1 / 3;
    grid-column: 1;
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
      grid-row: 2;

      padding: 20px;

      .pagination {
        display: flex;
      }
    }
  }
  &__buttons {
    padding: 60px;
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid $black;
    gap: 10px;

    button {
      border: 1px solid $black;
      text-transform: uppercase;
      background-color: transparent;
      width: max-content;
      font-size: 14px;
      padding: 10px;
      transition: .3s;

      &.active, &:hover {
        border-color: $orange;
        font-weight: 700;
        color: $white;
        background-color: $orange;
      }
    }
    @media (max-width: 1200px) {
      padding: 60px 20px;
    }
    @media (max-width: 768px) {
      border-left: none;
      grid-row: 1;
    }
  }
  &__inner {
    height: 100%;
    border-left: 1px solid $black;
    position: relative;
    padding: 0 60px 140px;

    .txt-highlight {
      padding-bottom: 10px;
    }
    h3 {
      padding-bottom: 20px;
    }
    .link {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    @media (max-width: 1200px) {
      padding: 0 20px 140px;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: auto;
    border-bottom: none;
  }
}
</style>
