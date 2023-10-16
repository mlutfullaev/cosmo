<script>
export default {
  name: 'LinkUI',
  props: {
    routerLink: {
      required: true,
      type: String,
    }
  }
}
</script>

<template>
  <router-link :to="routerLink">
    <slot /> <span>→</span>
  </router-link>
</template>

<style lang="scss" scoped>
</style>
