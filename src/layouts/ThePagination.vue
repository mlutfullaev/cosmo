<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'vue-awesome-paginate/dist/style.css'

const router = useRouter()
const route = useRoute()
const props = defineProps<{
  meta: {
    page: number,
    take: number,
    itemCount: number,
    pageCount: number,
  }
}>()

const page = ref(1)
watch(page, () => {
  router.replace({ query: { ...route.query, page: page.value } })
})
</script>

<template>
  <div class="thePagination d-sb">
    <p class="note bold t-up">
      Showing {{ meta.page * meta.take - meta.take + 1 }} - {{ meta.page * meta.take }} Of {{ meta.itemCount }} routines
    </p>
    <div class="thePagination-buttons d-center">
      <button v-if="page > 1" @click="page = page - 1">
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="21" viewBox="0 0 29 21" fill="black">
          <path d="M28.6406 12.5974L8.08062 12.5974L15.8406 20.3574L10.2806 20.3574L0.280621 10.3574L10.2806 0.357422L15.7606 0.357422L8.04062 8.07742L28.6406 8.07742V12.5974Z"/>
        </svg>
      </button>
      <vue-awesome-paginate
        :total-items="meta.itemCount"
        :items-per-page="meta.take"
        :max-pages-shown="3"
        v-model="page"
        :hide-prev-next="true"
      />
      <button v-if="page < meta.pageCount" @click="page = page + 1">
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="21" viewBox="0 0 29 21" fill="black">
          <path d="M0.639648 8.11742H21.1996L13.4397 0.357422H18.9996L28.9997 10.3574L18.9996 20.3574H13.5196L21.2396 12.6374H0.639648V8.11742Z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.thePagination {
  border-top: 1px solid $black;
  border-bottom: 1px solid $black;
  padding: 30px 60px;

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

    &.active-page {
      color: $orange;
    }
  }

  @media (max-width: 480px) {
    justify-content: center !important;

    > p {
      display: none;
    }
  }
}
</style>
