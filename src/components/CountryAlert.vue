<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  props: {
    alertActive: {
      required: true,
      type: Boolean,
    },
    city: {
      required: true,
      type: String,
    },
  },
  emits: ['alert', 'city'],
  data: () => ({
    another: false,
    cities: [] as string[],
    allCities: [] as string[],
    searchModel: '',
  }),
  methods: {
    onSearch () {
      if (this.searchModel.length) {
        this.cities = this.allCities.filter(city => city.includes(this.searchModel))
      } else {
        this.cities = []
      }
    }
  },
  mounted () {
    if (!localStorage.getItem('location')) {
      axios.get(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.VUE_APP_GEOAPIFEY_API}`)
        .then(res => {
          localStorage.setItem('location', res.data.city.name)
          this.$emit('city', res.data.city.name)
        })
    } else {
      this.$emit('city', localStorage.getItem('location'))
    }
    axios.get('https://countriesnow.space/api/v0.1/countries')
      .then((res) => {
        res.data.data.forEach((data: { cities: string[] }) => {
          data.cities.forEach((city: string) => {
            this.allCities.push(city)
          })
        })
      })
  },
  watch: {
    alertActive () {
      if (!this.alertActive) {
        this.another = false
        this.searchModel = ''
        this.cities = []
      }
    }
  }
})
</script>

<template>
  <div class="alert location" :class="{hidden: !alertActive}">
    <button class="alert-close" @click="$emit('alert', false)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z"
              stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="location-correct" v-if="!another">
      <p class="name">Are you in <span>{{ city }}?</span></p>
      <button class="btn btn-orange" @click="$emit('alert', false)">Yes</button>
      <button class="btn" @click="another = true">Choose city</button>
    </div>
    <div v-else class="location-another">
      <h2 class="title">Choose your city</h2>
      <input
        class="input-search"
        v-model="searchModel"
        type="text"
        ref="searchRef"
        @input="onSearch">
      <div class="location-another-cities">
        <button
          class="txt"
          v-for="city in cities.slice(0, 10)"
          :key="city"
          @click="() => {$emit('city', city); $emit('alert', false)}">
          {{ city }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.location {
  top: 100%;
  bottom: auto;
  right: auto;
  left: 20px;
  width: 658px;

  &.hidden {
    left: -100%;
  }

  &-correct {
    p {
      padding-bottom: 20px;
    }
  }

  &-another {
    max-width: 500px;
    max-height: 445px;
    overflow-y: auto;

    .input-search {
      margin: 20px 0;
    }

    &-cities {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 5px;

      button {
        transition: .3s;

        &:hover {
          color: $orange;
        }
      }
    }
  }
}
</style>
