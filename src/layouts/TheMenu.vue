<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

defineProps<{productLibrary: {title: string, items: {id: number, param: string, text: string}[]}[]}>()

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

const subMenu = ref('')
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
        <div class="menu-item" :class="{active: subMenu === 'product'}">
          <button @click="subMenu = subMenu === 'product' ? '' : 'product'" class="link bold">SKIN PRODUCTS LIBRARY <span>↓</span></button>
          <div class="sub-menu">
            <div
              v-for="lib of productLibrary"
              :key="lib.title"
              class="sub-menu-item">
              <p class="txt-highlight">{{lib.title}}</p>
              <RouterLink
                class="note"
                @click="menuActive = false"
                v-for="item in lib.items"
                :to="`/product-results/menu/${item.param}`"
                :key="item.id"
              >{{ item.text }}</RouterLink>
            </div>
          </div>
        </div>
        <div class="menu-item" :class="{active: subMenu === 'routine'}">
          <button @click="subMenu = subMenu === 'routine' ? '' : 'routine'" class="link bold">BEUTY ROUTINES LIBRARY <span>↓</span></button>
          <div class="sub-menu">
            <div
              v-for="lib of productLibrary"
              :key="lib.title"
              class="sub-menu-item">
              <p class="txt-highlight">{{lib.title}}</p>
              <RouterLink
                @click="menuActive = false"
                class="note"
                v-for="item in lib.items"
                :to="`/routine-results/menu/${item.param}`"
                :key="item.id"
              >{{ item.text }}</RouterLink>
            </div>
          </div>
        </div>
        <router-link @click="menuActive = false" to="/" class="link bold">PERSONAL AI ASSISTANT <span>→</span></router-link>
        <router-link @click="menuActive = false" to="/registration" class="link bold">create profile <span>→</span></router-link>
        <router-link @click="menuActive = false" to="/" class="link bold">how to use <span>→</span></router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-inner {
  right: -100%;
  top: 0;
  position: fixed;
  height: 100vh;
  width: 100%;
  background: #F2F2F6;
  z-index: 3;
  transition: .2s;
  display: flex;
  justify-content: right;

  &.active {
    right: 0;
  }

  .menu-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: right;
    height: 100%;
    background: $white;
    padding: 140px 60px 100px;
    width: max-content;
    align-content: start;
    overflow-y: auto;

    .menu-item {

      .sub-menu {
        max-height: 0;
        transition: .3s;
        overflow: hidden;
        padding: 0;

        &-item {
          display: grid;
          grid-template-columns: auto;
          gap: 8px;
          justify-content: end;
          padding: 10px 0;
        }
      }
      button {
        transition: .3s;
        &:hover span {
          right: 0;
        }
        @media (max-width: 340px) {
          justify-self: right;
        }
      }
      &.active {
        button {
          color: $orange;
        }
        .sub-menu {
          padding: 10px 0;
          max-height: 100%;
        }
      }
    }
    @media (max-width: 400px) {
      padding: 80px 20px 40px;
      gap: 40px;
      width: 100%;
    }

  }
}
</style>
