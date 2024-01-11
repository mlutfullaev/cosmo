<script lang="ts" setup>
import store from '@/store'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  if (!store.state.beauty) {
    router.push('/')
  }
})

const logout = () => {
  store.commit('logout')
  router.push('/')
}
</script>

<template>
  <TheHeader/>
  <h3 class="title-secondary">{{store.state.username}}</h3>
  <button class="btn btn-orange" @click="logout">Log out</button>
<!--  <TheFooter />-->
</template>

<style lang="scss" scoped>

</style>
