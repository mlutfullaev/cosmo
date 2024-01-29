<script setup lang="ts">
import ModalSubscribe from '@/components/ModalSubscribe.vue'
import store from '@/store'

</script>

<template>
  <router-view/>
  <div class="modal" :class="{active: store.state.modalSubscribe}" @click="store.commit('updateModalSubscribe', false)">
    <ModalSubscribe :active="store.state.modalSubscribe" />
  </div>
</template>

<style lang="scss">
</style>
