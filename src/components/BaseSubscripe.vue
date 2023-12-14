<script lang="ts" setup>
import { ref } from 'vue'

const emailInput = ref('')
const errorInput = ref(false)
const success = ref(false)

const subscribeHandler = () => {
  if (validateEmail(emailInput.value)) {
    success.value = true
  } else {
    errorInput.value = true
  }
}

function validateEmail (email: string): boolean {
  return !!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}
</script>

<template>
 <section v-if="!success" class="base-subscribe bg-img">
   <h2>Subscribe to updates</h2>
   <p class="txt">Aliquam eget lectus a neque porta tincidunt. Suspendisse et vestibulum enim. Nullam quis dui ut nibh tempor mollis. Nunc fermentum mollis ante vel finibus. Phasellus quis tellus vel arcu dapibus volutpat id at/</p>
   <input
     @input="errorInput ? errorInput = false : null"
     :class="{error: errorInput}"
     type="text" v-model="emailInput"
     placeholder="Your email">
   <p class="note">Subscribing you agree to our Policy bla bla</p>

   <button class="link bold" @click="subscribeHandler">SUBSCRIBE <span>→</span></button>
 </section>
  <section v-else class="base-subscribe base-subscribe--success bg-img ">
    <h2>Thank you!</h2>
    <p class="txt">Aliquam eget lectus a neque porta tincidunt. Suspendisse et vestibulum enim. Nullam quis dui ut nibh tempor mollis. Nunc fermentum mollis ante vel finibus. Phasellus quis tellus vel arcu dapibus volutpat id at// Suspendisse et vestibulum enim. Nullam quis dui ut nibh tempor mollis. Nunc fermentum mollis ante vel finibus. Phasellus quis tellus vel arcu dapibus volutpat id at/</p>
  </section>
</template>

<style lang="scss" scoped>
.base-subscribe {
  background-image: url("@/assets/img/product/claims-bg.jpg");
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
  }
  .txt {
    max-width: 980px;

    margin: 0 auto;
    padding-bottom: 30px;
  }
  input {
    border: 1px solid $black;
    width: 450px;
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
