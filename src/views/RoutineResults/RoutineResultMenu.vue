<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Routine, StringObject } from '@/interfaces'
import axios from 'axios'
import SearchResultBottom from '@/components/SearchResultBottom.vue'
import RoutinesSteps from '@/components/RoutinesSteps.vue'
import TheHeader from '@/layouts/TheHeader.vue'
import RoutineCard from '@/components/RoutineCard.vue'
import TheFilter from '@/layouts/TheFilter.vue'
import store from '@/store'
import ThePagination from '@/layouts/ThePagination.vue'

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

onMounted(() => {
  axios.get(`https://api-www.beautyid.app/goods/bynamebrand/${route.params.param}?order=ASC&page=1&take=11`)
    .then(res => {
      if (!res.data.data.length) {
        router.push(`/routine-results/not-found/${route.params.param || ''}`)
        return
      }
      routines.value = res.data.data
      allItems.value = res.data.meta.itemCount
      meta.value = res.data.meta
    })
})
watch(route, () => {
  axios.get(`https://api-www.beautyid.app/goods/bynamebrand/${route.params.param}?order=ASC&page=1&take=11`)
    .then(res => {
      if (!res.data.data.length) {
        router.push(`/routine-results/not-found/${route.params.param || ''}`)
        return
      }
      routines.value = res.data.data
      meta.value = res.data.meta
      allItems.value = res.data.meta.itemCount
    })
})

const filter = (filters: StringObject) => {
  console.log(filters)
}
</script>

<template>
  <TheHeader />

  <div class="productResult-top">
    <div class="bg-orange">
      <h2 class="title">Search Results for <span class="bold">{{ $route.params.param }}</span></h2>
      <h1 class="highlight">{{ allItems }}</h1>
      <h3 class="title-secondary">{{ $route.params.param }}'s routines in our library</h3>
    </div>
    <div class="productResult-scan">
      <div class="d-center">
        <h3 class="title-secondary"><span class="bold">create profile</span> to find the product that is best suited to your skin.</h3>
        <img src="@/assets/img/global/qr.png" alt="qr-code">
      </div>
      <h2 class="title">{{ $route.params.param }}</h2>
      <p class="txt">Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products. Search Results for  Oily skin person within 25-45 age range looking for hydration and cleansing acne products.</p>
    </div>
  </div>
  <div class="text-block">
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. </p>
    <RouterLink to="/product-filter" class="link bold">specify your search <span>→</span></RouterLink>
  </div>

  <TheFilter
    @filter="filter"
    :filters="store.state.routineFilters"
    where="routine"
    :items-length="allItems"/>

  <div class="routines__list">
    <RoutineCard
      v-for="routine in routines"
      :routine="routine"
      :key="routine.id"
    />
    <div class="routine-item bg-orange">
      <img src="@/assets/img/global/qr.png" alt="qr-code">
      <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. We recommend you to narrow your search by using our AI Supported Beauty Product Search.</p>
      <RouterLink to="/routine-filter" class="link bold">To start AI search please scan QR code</RouterLink>
    </div>
  </div>

  <ThePagination v-if="meta && meta.pageCount > 1" :meta="meta" />

  <div class="link-block" v-if="allItems > Number(route.query.take) && store.state.beauty">
    <RouterLink class="link bold" :to="{path: `/routine-results/filtered/`, query: {...route.query, take: Number(route.query.take) + 8}}">browser more <span>→</span></RouterLink>
  </div>
  <div class="tablet-link bg-orange tablet" v-if="allItems > Number(route.query.take) && !store.state.beauty">
    <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research.</p>
    <RouterLink class="link bold" :to="{path: `/routine-results/filtered/`, query: {...route.query, take: Number(route.query.take) + 8}}">browser more <span>→</span></RouterLink>
  </div>

  <RoutinesSteps />

  <SearchResultBottom />

  <TheFooter/>
</template>

<style lang="scss" scoped>
.productResult-top {
  text-align: center;
  display: grid;
  grid-template-columns: 50% 50%;

  .bg-orange {
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-weight: 400;

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
        line-height: 100px;
      }
    }

    @media (max-width: 1000px) {
      padding: 40px;
    }
    @media (max-width: 768px) {
      padding: 20px;
    }
  }
  .productResult-scan {
    padding: 60px;
    text-align: left;

    @media (max-width: 1000px) {
      padding: 40px;
    }
    @media (max-width: 768px) {
      padding: 20px;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
  @media (max-width: 480px) {
    padding-top: 80px;
  }
}
.text-block {
  border-top: 1px solid $black;
  .txt {
    max-width: 450px;
    margin: 0 auto;
    padding-bottom: 20px;
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
</style>
