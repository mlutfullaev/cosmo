<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    position: 50
  }),
})
</script>

<template>
  <div class="before-after">
    <div class="before-after-content" :style="{['--position']: position + '%'}">
      <div class="image-container">
        <img
          class="image-before slider-image"
          src="@/assets/img/routine/before.png"
          alt="color photo"
        />
        <img
          class="image-after slider-image"
          src="@/assets/img/routine/after.png"
          alt="black and white"
        />
      </div>
      <!-- step="10" -->
      <input
        type="range"
        min="0"
        max="100"
        v-model="position"
        aria-label="Percentage of before photo shown"
        class="slider"
        ref="slider"
      />
      <div class="slider-line" aria-hidden="true"></div>
      <div class="slider-button" aria-hidden="true"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.before-after {
  display: grid;
  place-items: center;
  padding: 60px;
  background: $orange;

  &-content {
    display: grid;
    place-content: center;
    position: relative;
    overflow: hidden;
    --position: 50%;

    .image-container {
      max-height: 500px;
    }

    .slider-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left;
    }

    .image-before {
      position: absolute;
      inset: 0;
      width: var(--position);
    }

    .slider {
      position: absolute;
      inset: 0;
      cursor: pointer;
      opacity: 0;
      width: 100%;
      height: 100%;
    }

    .slider:focus-visible ~ .slider-button {
      outline: 5px solid black;
      outline-offset: 3px;
    }

    .slider-line {
      position: absolute;
      inset: 0;
      width: 1px;
      height: 100%;
      background-color: #fff;
      left: var(--position);
      transform: translateX(-50%);
      pointer-events: none;
    }

    .slider-button {
      position: absolute;
      background-color: #fff;
      color: black;
      padding: 8px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: 50%;
      left: var(--position);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  }
  img {
    display: block;
    max-width: 100%;
  }
}
</style>
