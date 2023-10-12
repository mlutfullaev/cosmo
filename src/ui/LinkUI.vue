<template>
  <router-link :to="routerLink">
    <slot /> <span>→</span>
  </router-link>
</template>

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

<style lang="scss" scoped>
a {
  color: $black;
  font-family: 'PT Root UI', serif;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
}
</style>
