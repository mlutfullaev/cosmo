<template>
  <div class="hint">
    <svg width="4" height="23" viewBox="0 0 4 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.29381 3.96772C1.88669 3.96772 1.54867 3.82366 1.27414 3.53742C0.999612 3.25118 0.863281 2.89481 0.863281 2.47019C0.863281 2.04557 0.999612 1.6892 1.27414 1.40296C1.54867 1.11672 1.88856 0.972656 2.29381 0.972656C2.69906 0.972656 3.03895 1.11672 3.31348 1.40296C3.58801 1.6892 3.72434 2.04557 3.72434 2.47019C3.72434 2.89481 3.58801 3.25118 3.31348 3.53742C3.03895 3.82366 2.69906 3.96772 2.29381 3.96772ZM1.28908 6.77323H3.29854V22.7097H1.28908V6.77134V6.77323Z" fill="#FF8A00"/>
    </svg>
    <div>{{ hint }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({ hint: String })
</script>

<style lang="scss" scoped>
.hint {
  position: relative;
  top: -5px;
  display: inline-flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  width: 30px;
  border: 2px solid $orange;
  border-radius: 50%;
  z-index: 1;

  &:hover div {
    display: block;
  }
  span {
    cursor: pointer;
    width: 20px;
    border-radius: 50%;
    height: 20px;
    background: #B5B6B7;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;

    &:hover {
      background: #0077B2;
    }
  }

  div {
    display: none;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate3d(-30px, -42px, 0);
    background-color: $grey-dark;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    max-width: 200px;
    width: max-content;
    min-width: 50px;

    &::before {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 13.9px 8px 0 8px;
      border-color: $grey-dark transparent transparent transparent;
      transform: rotate(0deg);
      position: absolute;
      bottom: -7px;
      left: 22px;
    }
  }
}
</style>
