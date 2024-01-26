<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
defineProps<{active: boolean}>()
defineEmits<{(event: 'close'): void}>()
</script>

<template>
 <div class="modal" :class="{active: active}" @click.stop="$emit('close')">
   <div class="modal__content" @click.stop>
     <button class="btn-close" @click.stop="$emit('close')">
       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
         <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>
     </button>
     <slot></slot>
   </div>
 </div>
</template>

<style lang="scss" scoped>

</style>
