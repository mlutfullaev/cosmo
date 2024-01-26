<script setup lang="ts">
import { ref } from 'vue'
import CreateRoutine from '@/views/Profile/CreateRoutine.vue'

const create = ref(false)
const products = ref([])

</script>

<template>
  <div v-if="!create" class="profile-routines">
    <h1 class="title-secondary">MY SAVED routines</h1>
    <p class="txt-highlight">no routines here yet</p>
    <p class="txt">
      To add routine, click on
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
        <path d="M17 4.58679V15.8621C17 17.3013 15.8114 17.9067 14.36 17.212L9.86858 15.0383C9.38858 14.81 8.61142 14.81 8.13142 15.0383L3.64 17.212C2.18857 17.9067 1 17.3013 1 15.8621V4.58679C1 2.88955 2.59999 1.5 4.55427 1.5H13.4457C15.4 1.5 17 2.88955 17 4.58679Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </p>
    <div class="d-sb">
      <h1 class="title-secondary">MY addED routines</h1>
      <button class="btn btn-outline" @click="create = true">CREATE new ROUTINE +</button>
    </div>
    <p class="txt-highlight" v-if="!products.length">no routines here yet</p>
    <div v-else class="profile-list">

    </div>
  </div>
  <CreateRoutine v-else @close="create = false" />
</template>

<style scoped lang="scss">
.profile-routines {
  h1 {
    padding: 60px 0 36px;
  }
  > h1:first-child {
    padding-top: 0;
  }

  .btn {
    padding: 8px 40px;
    font-size: 20px;
  }
}
</style>
