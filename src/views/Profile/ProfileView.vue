<script lang="ts" setup>
import store from '@/store'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const activePage = ref('skin')
const pages = ref([
  {
    link: '',
    text: 'Skin Profile'
  },
  {
    link: 'products',
    text: 'Products'
  },
  {
    link: 'routines',
    text: 'Routine'
  },
  {
    link: 'account',
    text: 'Account setup'
  },
])
const router = useRouter()
const route = useRoute()

onMounted(() => {
  console.log(route)
  if (!store.state.beauty) {
    router.push('/')
  }
})

const logout = () => {
  store.commit('logout')
  router.push('/')
}
</script>

<template>
  <TheHeader/>
  <div class="profile">
    <div class="profile__sidebar">
      <div class="profile__sidebar__buttons">
        <router-link
          v-for="page in pages"
          :key="page.link"
          class="btn btn-outline"
          :to="'/profile/' + page.link"
          :class="{'btn-orange': route.name === page.link}"
        >
          {{page.text}}
        </router-link>
      </div>

      <button class="btn btn-outline" @click="logout">
        log out
      </button>
    </div>
    <router-view></router-view>
  </div>
  <TheFooter />
</template>

<style lang="scss" scoped>
.profile {
  display: grid;
  grid-template-columns: 480px 1fr;
  min-height: calc(100vh - $header-size);

  &__sidebar {
    //padding: 60px;
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 60px;
    border-right: 1px solid $black;

    &__buttons {
      display: flex;
      gap: 16px;
      flex-direction: column;

      button {
        font-size: 32px;

        &.btn-orange {
          border-color: $orange;
        }
      }
    }

    a, button {
      padding: 16px;
      width: max-content;
      font-size: 20px;
    }
  }
  & > div {
    padding: 60px
  }
}
</style>
