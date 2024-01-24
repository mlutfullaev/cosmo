<script lang="ts" setup>
import store from '@/store'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProfileSkinView from '@/views/Profile/ProfileSkinView.vue'
import ProfileProductsView from '@/views/Profile/ProfileProductsView.vue'
import ProfileRoutinesView from '@/views/Profile/ProfileRoutinesView.vue'
import ProfileAccountView from '@/views/Profile/ProfileAccountView.vue'

const activePage = ref('skin')
const pages = ref([
  {
    link: 'skin',
    text: 'Skin Profile'
  },
  {
    link: 'products',
    text: 'Products'
  },
  {
    link: 'routine',
    text: 'Routine'
  },
  {
    link: 'account',
    text: 'Account setup'
  },
])
const router = useRouter()

onMounted(() => {
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
        <button
          v-for="page in pages"
          :key="page.link"
          class="btn btn-outline"
          :class="{'btn-orange': page.link === activePage}"
          @click="activePage = page.link"
        >
          {{page.text}}
        </button>
      </div>

      <button class="btn btn-outline" @click="logout">
        log out
      </button>
    </div>
    <ProfileSkinView v-if="activePage === 'skin'" />
    <ProfileProductsView v-if="activePage === 'products'" />
    <ProfileRoutinesView v-if="activePage === 'routine'" />
    <ProfileAccountView v-if="activePage === 'account'" />
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

    button {
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
