<script>
export default {
  name: 'DetailedLink',
  props: {
    routerLink: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    }
  }
}
</script>

<template>
  <div>
    <LinkUI :router-link="routerLink">
      <slot />
    </LinkUI>
    <p>{{description}}</p>
  </div>
</template>

<style lang="scss" scoped>
</style>
