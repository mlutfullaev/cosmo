<script lang="ts" setup>
import { ref } from 'vue'
import { useHelpers } from '@/useHelpers'
import store from '../store'
import text from '@/assets/locales/components.json'

const { validateEmail, sendEmail } = useHelpers()
const emailInput = ref('')
const errorInput = ref(false)
const success = ref(false)

const subscribeHandler = async () => {
  if (validateEmail(emailInput.value)) {
    const send = await sendEmail(emailInput.value)

    if (send) {
      success.value = true
    }
  } else {
    errorInput.value = true
  }
}
</script>

<template>
 <section v-if="!success" class="base-subscribe bg-img">
   <h2>{{text.subscribeToUpdates[store.state.lang]}}</h2>
   <p class="txt">{{text.subscribeText[store.state.lang]}}</p>
   <input
     @input="errorInput ? errorInput = false : null"
     :class="{error: errorInput}"
     type="text" v-model="emailInput"
     placeholder="Your email">
   <p class="note">{{text.subscribingYouAgree[store.state.lang]}}</p>

   <button class="link bold" @click="subscribeHandler">{{text.subscribe[store.state.lang]}} <span>→</span></button>
 </section>
  <section v-else class="base-subscribe base-subscribe--success bg-img ">
    <h2>{{text.thankYou[store.state.lang]}}!</h2>
    <p class="txt">{{text.subscribeText[store.state.lang]}}</p>
  </section>
</template>

<style lang="scss" scoped>
.base-subscribe {
  background-image: url("@/assets/img/global/bg.jpg");
  padding: 60px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  &--success {
    padding: 120px 20px;
  }
  h2 {
    font-size: 36px;
    font-weight: 700;

    padding-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 30px;
    }
    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
  .txt {
    max-width: 980px;

    margin: 0 auto;
    padding-bottom: 30px;
  }
  input {
    border: 1px solid $black;
    max-width: 450px;
    width: 100%;
    color: $grey-dark;
    background-color: transparent;
    font-size: 20px;
    transition: .3s;
    outline: none;

    padding: 12px;

    &.error {
      border-color: #cb0000;
      color: #cb0000;

      &::placeholder {
        color: #cb0000;
      }
    }
  }
  .note {
    padding: 12px 0 40px;
  }
}
</style>
