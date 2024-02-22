<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import store from '@/store'
import { Routine, StringObject } from '@/assets/interfaces'
import TheFilter from '@/layouts/TheFilter.vue'
import SearchResultBottom from '@/components/SearchResultBottom.vue'
import RoutineCard from '@/components/RoutineCard.vue'
import RoutinesSteps from '@/components/RoutinesSteps.vue'
import ThePagination from '@/layouts/ThePagination.vue'
import TheHeader from '@/layouts/TheHeader.vue'
import { API_URL, routineFilters } from '@/assets/constants'

const route = useRoute()
const router = useRouter()
const meta = ref<{
    page: number,
    take: number,
    itemCount: number,
    pageCount: number,
  } | null>(null)
const routines = ref<Routine[]>([])
const allItems = ref(0)

const getItems = () => {
  axios.get(`${API_URL}routines?order=ASC`, {
    params: route.query
  })
    .then(res => {
      if (!res.data.data.length) {
        router.push('/routine-results/not-found')
        return
      }
      routines.value = res.data.data
      allItems.value = res.data.meta.itemCount
      meta.value = res.data.meta
    })
}

onMounted(() => getItems())
watch(route, () => getItems())

const filter = (filters: StringObject) => {
  console.log(filters)
}

const moreItems = () => {
  axios.get(`${API_URL}routines?order=ASC`, {
    params: {
      ...route.query,
      take: 12,
      page: meta.value ? +meta.value.page : 1 + 1,
    }
  })
    .then(res => {
      if (!res.data.data.length) return
      meta.value = res.data.meta
      routines.value = [...routines.value, ...res.data.data]
    })
}
</script>

<template>
  <TheHeader />

  <div class="searchResult-top">
    <h2 class="title">Search Results for <span class="bold">{{ $route.params.param }}</span></h2>
    <h2 class="title bold">Oily skin person within 25-45 age range looking for hydration and cleansing acne products</h2>
    <h1 class="highlight orange">{{ allItems }}</h1>
    <h3 class="title-secondary">Routines</h3>
  </div>

  <TheFilter
    @filter="filter"
    :filters="routineFilters"
    where="routine"
    :items-length="allItems"/>

  <div class="routines__list">
    <RoutineCard
      v-for="routine in routines"
      :routine="routine"
      :key="routine.id"
    />
    <div class="routine-item bg-orange" v-if="allItems > Number(route.query.take) && !store.state.beauty">
      <img src="@/assets/img/global/qr.png" alt="qr-code">
      <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. We recommend you to narrow your search by using our AI Supported Beauty Product Search.</p>
      <RouterLink to="/routine-filter" class="link bold">To start AI search please scan QR code</RouterLink>
    </div>
  </div>

  <ThePagination v-if="meta && meta.pageCount > 1" :meta="meta" />

  <div class="link-block" v-if="allItems > routines.length && store.state.beauty">
    <button class="bold link" @click="moreItems">discover more <span>→</span></button>
  </div>
  <div class="tablet-link bg-orange tablet" v-if="allItems > routines.length && !store.state.beauty">
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research.</p>
    <button class="bold link" @click="moreItems">discover <br/> more <span>→</span></button>
  </div>

  <RoutinesSteps />

  <SearchResultBottom />

  <TheFooter/>
</template>

<style lang="scss" scoped>
.searchResult-top {
  padding: 60px;
  text-align: center;

  .title {
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
    &.bold {
      font-weight: 700;
    }
    span {
      font-weight: 700;
    }
  }

  h1 {
    line-height: 200px;
    padding-top: 20px;

    @media (max-width: 1340px) {
      line-height: 115px;
    }
    @media (max-width: 768px) {
      line-height: 90px;
      font-size: 96px;
    }
    @media (max-width: 480px) {
    }
  }

  .txt {
    padding: 40px 0 20px;
    margin: 0 auto;
    max-width: 450px;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
  @media (max-width: 480px) {
    padding: 80px 20px 20px;
  }
}
.product-list > div {
  &:nth-child(8) {
    display: grid;
    align-content: space-between;
    padding: 20px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &:nth-child(7) {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .link {
    max-width: 300px;
  }
}

.routines__list {
  padding-bottom: 40px;
}

.tablet-link {
  padding: 20px;
  grid-column: 1 / 3;
  width: 100%;

  p {
    padding-bottom: 20px;
  }
}
</style>
