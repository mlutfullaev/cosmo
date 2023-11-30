<script setup lang="ts">
import { defineEmits, defineProps, onMounted, PropType, ref, watch } from 'vue'
import axios from 'axios'

type Brand = {
  id: number,
  brandName: string,
  brandDescription: string,
}

const emit = defineEmits<{(event: 'changeBrand', brand: string): void}>()
const props = defineProps(
  {
    buttonType: {
      required: false,
      default: 'link',
      type: String as PropType<'link' | 'button'>,
    },
    where: {
      required: true,
      type: String,
    },
    title: {
      required: false,
      type: String,
    }
  }
)
const activeAlpha = ref('A')
const filterResults = ref<Brand[]>([])
const alphabet = ref([])

watch(activeAlpha, () => {
  axios.get(`https://api-www.beautyid.app/brands/byfirstletter/${activeAlpha.value}?order=ASC&take=30`)
    .then((res) => {
      filterResults.value = res.data.data
    })
})

const selectedBrand = ref('')
watch(selectedBrand, () => {
  emit('changeBrand', selectedBrand.value)
})

onMounted(() => {
  axios.get(`https://api-www.beautyid.app/brands/${props.where === 'product-results/brand/' ? 'getfirstletters' : 'getroutinebrandsfirstletters'}`)
    .then((res) => {
      alphabet.value = res.data.map((item: { letter: string }) => item.letter)
      activeAlpha.value = alphabet.value[0]

      axios.get(`https://api-www.beautyid.app/brands/byfirstletter/${activeAlpha.value}?order=ASC&take=30`)
        .then((res) => {
          filterResults.value = res.data.data
        })
    })
})
</script>

<template>
  <div class="filterBrands">
    <p class="txt-highlight">{{title || 'brands'}}</p>
    <div class="filterBrands-alphabet">
      <button v-for="alpha in alphabet" :class="{ active: activeAlpha === alpha, filterBtn: buttonType === 'button' }" @click="activeAlpha = alpha"
        :key="alpha">
        {{ alpha }}
      </button>
    </div>
    <div v-if="buttonType === 'link'" class="filterBrands-content">
      <RouterLink
       v-for="item in filterResults"
       :to="`/${where}${item.brandName}`"
       :key="item.id">
        {{ item.brandName }}
      </RouterLink>
    </div>
    <div v-else class="filterBrands-content">
      <div
        v-for="item in filterResults"
        class="btn-tag d-center"
        :class="{ active: selectedBrand === item.brandName }"
        :key="item.id">
        <button class="note" @click="() => selectedBrand = item.brandName">
          {{ item.brandName }}
        </button>
        <svg
          @click="selectedBrand = ''"
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 15.5C12.125 15.5 15.5 12.125 15.5 8C15.5 3.875 12.125 0.5 8 0.5C3.875 0.5 0.5 3.875 0.5 8C0.5 12.125 3.875 15.5 8 15.5Z" fill="white" stroke="#FF8A00" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.87695 10.1225L10.122 5.87756L5.87695 10.1225Z" fill="white"/>
          <path d="M5.87695 10.1225L10.122 5.87756" stroke="#FF8A00" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.122 10.1225L5.87695 5.87756L10.122 10.1225Z" fill="white"/>
          <path d="M10.122 10.1225L5.87695 5.87756" stroke="#FF8A00" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filterBrands {
  padding: 40px 20px;
  border-top: 1px solid $black;
  border-bottom: 1px solid $black;

  p {
    text-align: center;
  }

  &-alphabet {
    display: grid;
    grid-template-columns: repeat(36, 1fr);
    align-items: start;
    overflow-x: auto;
    width: 100%;
    margin: 30px 0;

    button {
      padding: 0 3px;
      font-size: 14px;
      font-weight: 400;
      transition: .2s;

      &.active {
        color: $orange;
      }
      &:hover {
        color: $orange;
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(18, 1fr);
    }

    @media (max-width: 480px) {
      gap: 5px 0;
      grid-template-columns: repeat(12, 1fr);
    }
  }

  &-content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px 25px;

    a {
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

      &:hover,
      &.active {
        color: $orange;
        text-decoration-color: $orange;

        &::after {
          color: $orange;
          left: 0;
        }
      }
    }
    .btn-tag {
      align-self: center;

      @media (max-width: 480px) {
        grid-column: 1 / 3;
      }
    }
    @media (max-width: 1000px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 768px) {
      gap: 10px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
