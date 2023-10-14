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
div {
  padding: 30px 50px;
  border-bottom: 1px solid $black;

  a {
    text-transform: uppercase;
  }
  p {
    color: $black;
    padding-top: 20px;
    font-family: 'PT Root UI', serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
  }
}
</style>
