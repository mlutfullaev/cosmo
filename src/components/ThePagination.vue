<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    currentPage: Number,
    pageCount: Number,
    take: Number,
    all: Number
  },
  data: () => ({
    pages: [] as number[],
  }),
  mounted () {
    // if (this.currentPage === 1) {
    //   this.pages = [1, 2, 3]
    // } else if (this.currentPage === this.pageCount) {
    // }
  }
})
</script>

<template>
  <div class="thePagination d-sb">
    <p class="note bold t-up">
      Showing {{ currentPage * take - take + 1 }}–{{ currentPage * take }} Of {{ all }} routines
    </p>
    <div class="thePagination-buttons d-center">
      <button v-if="currentPage > 1">
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="21" viewBox="0 0 29 21" fill="black">
          <path
            d="M28.6406 12.5974L8.08062 12.5974L15.8406 20.3574L10.2806 20.3574L0.280621 10.3574L10.2806 0.357422L15.7606 0.357422L8.04062 8.07742L28.6406 8.07742V12.5974Z"/>
        </svg>
      </button>
      <button>1</button>
      <button class="active">2</button>
      <button>3</button>
      <button>...</button>
      <button v-if="currentPage < pageCount">
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="21" viewBox="0 0 29 21" fill="black">
          <path
            d="M0.639648 8.11742H21.1996L13.4397 0.357422H18.9996L28.9997 10.3574L18.9996 20.3574H13.5196L21.2396 12.6374H0.639648V8.11742Z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thePagination {
  border-top: 1px solid $black;
  border-bottom: 1px solid $black;
  padding: 30px 60px;

  &-buttons {
    gap: 10px;

    button {
      padding: 10px;
      font-weight: 700;
      font-size: 36px;
      transition: .3s;

      svg {
        transition: .3s;
      }

      &:hover {
        color: $orange;

        svg {
          fill: $orange;
        }
      }

      &.active {
        color: $orange;
      }
    }
  }
}
</style>
