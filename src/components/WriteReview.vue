<script lang="ts" setup>
import { ref } from 'vue'
import BaseEditableRate from '@/baseComponents/BaseEditableRate.vue'
import BaseDrag from '@/baseComponents/BaseDrag.vue'
import texts from '@/assets/locales/components.json'
import store from '../store'

const rate = ref(0)
const file = ref()
const text = ref('')
</script>

<template>
  <div class="write-review">
    <button class="btn-close" @click="$emit('close')">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <h3>{{texts.addPhotoBarcode[store.state.lang]}}</h3>
    <p class="txt">{{texts.toVerifyNeedInfo[store.state.lang]}}</p>

    <BaseDrag @file-dropped="uploadedFile => file = uploadedFile" />

    <h3>{{texts.rate[store.state.lang]}}</h3>
    <BaseEditableRate @rate="(selected) => rate = selected" :rates="rate" />

    <h3>{{texts.addText[store.state.lang]}}</h3>
    <textarea class="textarea-form" v-model="text" :placeholder="texts.textareaPlaceholder[store.state.lang]"></textarea>

    <button
      class="btn btn-orange"
      @click="$emit('close')"
      :disabled="!rate"
    >
      {{texts.send[store.state.lang]}}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.write-review {
  position: relative;
  padding: 60px;
  display: grid;
  grid-template-rows: repeat(6, auto) 1fr auto;

  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: max-content;
  }
  h3 {
    font-size: 32px;
    text-transform: uppercase;
    font-weight: 500;
    padding-bottom: 5px;
  }

  .textarea-form {
    resize: none;
    width: 100%;
    border: none;
    background-color: #F3F3F3;
    outline: none;
    padding: 8px;
    font-size: 20px;
    min-height: 300px;
  }
  .base-rates {
    width: max-content;
    margin: 10px 0 20px;
  }
  button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
