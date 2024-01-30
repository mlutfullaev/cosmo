<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'
import BaseModal from '@/baseComponents/BaseModal.vue'
import BaseSelect from '@/baseComponents/BaseSelect.vue'
import store from '@/store'
import router from '@/router'
import { useRoute } from 'vue-router'
const emits = defineEmits<{(event: 'close'): void}>()
defineProps<{active: boolean}>()

const route = useRoute()

const country = ref('Home')
const languages: Record<string, string> = {
  English: 'en',
  Russian: 'ru',
}
const language = ref('English')
Object.keys(languages).forEach(key => {
  if (languages[key] === store.state.lang) {
    language.value = key
  }
})

const saveChanges = () => {
  store.commit('switchLanguage', languages[language.value])
  router.push({
    name: route.name as string,
    params: { ...route.params, locale: store.state.lang }
  })
  emits('close')
}
</script>

<template>
  <BaseModal :active="active" @close="$emit('close')" :fromBottom="true">
    <div class="footer-modal">
      <h2 class="title-secondary">you are viewing the cosmo.wiki website in the version: Praha, CZ</h2>
      <p class="txt">Specifying your location allows COSMO.WIKI to offer you the best service, taking into account local peculiarities.</p>
      <div class="footer-modal__item">
        <p class="name">Change location</p>
        <BaseSelect
          :options="['Pomodoro', 'Mama mia', 'Mars', 'Home']"
          :selected="country"
          @change="value => country = value" />
      </div>
      <div class="footer-modal__item">
        <p class="name">select your language</p>
        <BaseSelect
          :options="['English', 'Russian']"
          :selected="language"
          @change="value => language = value" />
      </div>
      <button class="btn btn-orange" @click="saveChanges">SAVE</button>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.footer-modal {
  max-width: 650px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding-top: 10px;

  @media (max-width: 1000px) {
    max-width: 480px;
    padding: 30px 0;
  }
  @media (max-width: 480px) {
    padding: 50px 0 30px;
  }
  h2 {
    font-weight: 500;
    @media (max-width: 1000px) {
      font-size: 24px;
    }
    @media (max-width: 480px) {
      font-size: 18px;
      line-height: 20px;
    }
  }
  .txt {
    padding-top: 20px;
    @media (max-width: 1000px) {
      padding-top: 8px;
    }
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  .dropdown {
    text-align: left;
  }
  .name {
    font-weight: 700;
    padding: 60px 0 12px;

    @media (max-width: 1000px) {
      font-size: 16px;
      padding-top: 40px;
    }
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  .btn {
    width: 100%;
    color: $black;
    margin-top: 60px;
    padding: 16px 30px;
  }
}
</style>
