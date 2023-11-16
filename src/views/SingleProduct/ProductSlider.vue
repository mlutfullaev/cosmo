<script setup lang="ts">
import { defineProps, ref } from 'vue'

import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const props = defineProps<{ sliders: { picture: string }[] }>()

const currentSlide = ref(0)

function prev () {
  currentSlide.value = currentSlide.value ? currentSlide.value - 1 : props.sliders.length - 1
}

function next () {
  currentSlide.value = currentSlide.value === props.sliders.length - 1 ? 0 : currentSlide.value + 1
}
</script>

<template>
  <div class="slider">
    <Carousel
      id="carousel"
      :items-to-show="1"
      :wrap-around="false"
      :autoplay="5000"
      v-model="currentSlide">
      <Slide class="carousel-item" v-for="slide in sliders" :key="slide.picture">
        <img :src="`https://api-www.beautyid.app/images/getimage/${slide.picture}`" alt="">
      </Slide>
    </Carousel>
    <Carousel
      id="thumbnails"
      :items-to-show="3"
      v-model="currentSlide"
      ref="carousel"
    >
      <Slide v-for="(slide, idx) in sliders" :key="slide.picture">
        <div class="thumbnails-item" @click="currentSlide = idx">
          <img
            :src="`https://api-www.beautyid.app/images/getimage/${slide.picture}`"
            alt="">
        </div>
      </Slide>
    </Carousel>
    <div class="navigation">
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
        v-for="(slide, idx) in sliders"
        :key="slide.picture"
        @click="currentSlide = idx"
        :class="{active: currentSlide === idx}"
      ></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  position: relative;

  #carousel {
    .carousel-item img {
      width: 60%;

      @media (max-width: 1200px) {
        width: 80%;
      }
    }
  }

  #thumbnails {
    padding-top: 30px;

    .thumbnails-item img {
      width: 100px;
    }

    .carousel__slide--active .thumbnails-item {
      border: 1px solid $black;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }

  .navigation {
    @media (max-width: 900px) {
      display: none;
    }

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
  }

  @media (max-width: 900px) {
    .pagination {
      display: flex;
    }
  }
}
</style>
