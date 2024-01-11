<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{ sidebarActive: boolean }>()
</script>

<template>
 <div class="sidebar" :class="{active: sidebarActive}">
   <button class="btn-close" @click="$emit('close')">
     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
       <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>
   </button>
   <slot v-if="sidebarActive"></slot>
 </div>
</template>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  width: 480px;
  position: fixed;
  right: -481px;
  transition: .3s;
  top: 0;
  background: #fff;
  z-index: 100;
  border-left: 1px solid $black;

  &.active {
    right: 0;
  }
}
</style>
