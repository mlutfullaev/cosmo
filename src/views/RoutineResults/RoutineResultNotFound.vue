<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Routine } from '@/interfaces'
import axios from 'axios'
import SearchResultBottom from '@/components/SearchResultBottom.vue'
import RoutineCard from '@/components/RoutineCard.vue'

const alternatives = ref<Routine[]>([])

onMounted(() => {
  axios.get('https://api-www.beautyid.app/routines?order=ASC&page=1&take=7')
    .then(res => {
      alternatives.value = res.data.data
    })
})
</script>

<template>
  <TheHeader/>

  <div class="routine-result__top">
    <h2 class="title">There are no result for your search <span class="bold">{{ $route.params.param ? `“${$route.params.param}”` : '' }}</span></h2>
    <p class="txt">You might find the product using our various filters</p>
    <RouterLink to="/routine-filter" class="link bold">specify your search <span>→</span></RouterLink>
  </div>
  <h2 class="title routine-result__title">Check alternative routines</h2>
  
  <div class="routines__list">
    <RoutineCard
      v-for="routine in alternatives"
      :routine="routine"
      :key="routine.id"
    />
    <div class="routine-item bg-orange d-center">
      <RouterLink to="/routine-filter" class="link bold">specify your search <span>→</span></RouterLink>
    </div>
  </div>

  <SearchResultBottom />
  
  <TheFooter/>
</template>

<style lang="scss" scoped>
.routine-result {
  &__top {
    padding: 60px;
    text-align: center;

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
      }
    }

    .txt {
      padding: 40px 0 20px;
    }

    @media (max-width: 768px) {
      padding: 30px;
    }
    @media (max-width: 480px) {
      padding: 20px;
    }
  }

  &__title {
    border-top: 1px solid $black;
    text-align: center;
    padding: 40px 0;
  }
}

.routines__list {
  border-top: none;
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
