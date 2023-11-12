<script setup lang="ts">
import { ref, watch } from 'vue'

const menuActive = ref(false)

function burgerSubmit () {
  menuActive.value = !menuActive.value
}
watch(menuActive, (newMenuActive) => {
  if (newMenuActive) {
    document.body.classList.add('menu-active')
  } else {
    document.body.classList.remove('menu-active')
  }
})
</script>

<template>
  <div class="menu">
    <button @click="burgerSubmit" class="btn-burger" :class="{active: menuActive}">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none">
        <symbol id="line" viewBox="0 0 150 1">
          <line y1="0.5" x2="150" y2="0.5"/>
        </symbol>
        <symbol id="circle" viewBox="0 0 182 182">
          <circle cx="91" cy="91" r="87.5"/>
        </symbol>
      </svg>
      <span></span>
      <svg class="circle">
        <use xlink:href="#circle"/>
      </svg>
    </button>
    <div class="menu-inner" :class="{active: menuActive}">
      <div class="menu-content">
        <router-link to="/" class="link bold">SKIN PRODUCTS LIBRARY <span>→</span></router-link>
        <router-link to="/" class="link bold">BEUTY ROUTINES LIBRARY <span>→</span></router-link>
        <router-link to="/" class="link bold">PERSONAL AI ASSISTANT <span>→</span></router-link>
        <router-link to="/registration" class="link bold">create profile <span>→</span></router-link>
        <router-link to="/" class="link bold">how to use <span>→</span></router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-burger {
  position: fixed;
  top: 13px;
  right: 13px;
  width: 40px;
  padding-left: 1px;
  height: 40px;
  cursor: pointer;
  z-index: 3;

  span {
    position: relative;
    display: block;
    width: 30px;
    right: 0;
    height: 2px;
    background: #000;
    transition: all .2s ease-in-out;

    &:before, &:after {
      position: absolute;
      background: #000;
      content: '';
      right: 0;
      width: 20px;
      height: 2px;
      transition: all .2s ease-in-out;
    }

    &:before {
      top: -8px;
    }

    &:after {
      top: 8px;
    }
  }

  .circle {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    fill: none;
    stroke: #000000;
    stroke-width: 6px;
    stroke-dasharray: 550;
    stroke-dashoffset: -550;
    transition: .3s ease-in-out;
  }

  &.active {
    span {
      background: transparent;

      &:before {
        transform: rotate(45deg) translate(5px, 6px);
      }

      &:after {
        transform: rotate(-45deg) translate(5px, -6px);
      }
    }

    .circle {
      stroke-dashoffset: 0;
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
}

.menu-inner {
  right: -100%;
  top: 0;
  position: fixed;
  height: 100vh;
  width: 100%;
  background: #F2F2F6;
  z-index: 2;
  transition: .2s;
  display: flex;
  justify-content: right;

  &.active {
    right: 0;
  }

  .menu-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 80px;
    text-align: right;
    height: 100%;
    background: $white;
    padding: 140px 60px 100px;
    width: max-content;
    align-content: start;

    @media (max-width: 400px) {
      padding: 80px 40px 40px;
      gap: 40px;
      width: 100%;
    }

    a {
      @media (max-width: 340px) {
        max-width: 200px;
        justify-self: right;
      }
    }
  }
}
</style>
