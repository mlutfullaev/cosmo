<script lang="ts">
import { defineComponent, PropType } from 'vue'
import axios from 'axios'

type Brand = {
  id: number,
  brandName: string,
  brandDescription: string,
}

export default defineComponent({
  props: {
    brandSelected: String,
  },
  emits: ['brand-select'],
  data: () => ({
    activeAlpha: 'A',
    filterResults: [] as PropType<Brand[]>,
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  }),
  mounted () {
    axios.get(`https://api-www.beautyid.app/brands/byfirstletter/${this.activeAlpha}?order=ASC&take=42`)
      .then((res) => {
        this.filterResults = res.data.data
      })
  },
  watch: {
    activeAlpha () {
      axios.get(`https://api-www.beautyid.app/brands/byfirstletter/${this.activeAlpha}?order=ASC&take=42`)
        .then((res) => {
          this.filterResults = res.data.data
        })
    }
  }
})
</script>

<template>
  <div class="filterBrands">
    <p class="txt-highlight">brands</p>
    <div class="filterBrands-alphabet">
      <button
        v-for="alpha in alphabet"
        :class="{active: activeAlpha === alpha}"
        @click="activeAlpha = alpha"
        :key="alpha">
        {{ alpha }}
      </button>
    </div>
    <div class="filterBrands-content">
      <button
        v-for="item in filterResults"
        :class="{active: brandSelected === item.brandName}"
        @click="$emit('brand-select', item.brandName)"
        :key="item.id">
        {{ item.brandName }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filterBrands {
  padding: 20px;

  p {
    text-align: center;
  }

  &-alphabet {
    display: grid;
    grid-template-columns: repeat(36, 1fr);
    min-height: 83px;
    align-items: start;
    gap: 5px;
    padding: 20px 0;

    button {
      font-size: 14px;
      transition: .2s;

      &.active {
        color: $orange;
        font-size: 36px;
        font-weight: 700;
      }
    }
  }

  &-content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px 20px;

    button {
      transition: .3s;
      align-self: start;
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 3px;
      text-align: left;

      &::after {
        content: '  →';
        transition: .3s;
        color: transparent;
        position: relative;
        left: -7px;
      }

      &:hover, &.active {
        color: $orange;
        text-decoration-color: $orange;

        &::after {
          color: $orange;
          left: 0;
        }
      }
    }
  }
}
</style>
