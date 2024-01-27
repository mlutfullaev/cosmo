<script lang="ts" setup>
import BaseDrag from '@/baseComponents/BaseDrag.vue'
import { ref, defineEmits } from 'vue'
import BaseEditableRate from '@/baseComponents/BaseEditableRate.vue'
defineEmits<{(event: 'close'): void}>()

const rate = ref(0)
</script>

<template>
  <div class="profile-create">
    <h1 class="title-secondary">add new product to the library</h1>
    <p class="txt">Once added the product will be seen by your skintwim community and others</p>
    <p class="name">brand NAME</p>
    <input type="text" class="input-form" placeholder="name">
    <p class="name">product title</p>
    <input type="text" class="input-form" placeholder="name">
    <p class="label">as written on the package</p>
    <p class="name" style="padding-bottom: 0">Add the photo of barcode</p>
    <p class="txt" style="padding-top: 0;">To verify your review we need to check the information on your product</p>
    <BaseDrag />
    <h1 class="title-secondary">YOUR REVIEW WITH THIS PRODUCT</h1>
    <p class="txt">You review about this product will certainly help Your SkinTwinss to navigate within Beauty world</p>
    <p class="name">Rate</p>
    <BaseEditableRate :rates="rate" @rate="rated => rate = rated" />
    <p class="name">Add a text</p>
    <textarea class="textarea-form" placeholder="Write a review to tell us what you’ve enjoyed"></textarea><br/>
    <button class="btn btn-orange" @click="$emit('close')">save</button>
  </div>
</template>

<style lang="scss" scoped>
.profile-create {

  .name {
    padding: 36px 0 12px;
  }
  .label {
    padding-top: 12px;
  }
  .txt {
    padding-top: 20px;
  }
  .btn {
    padding: 8px;
    font-size: 20px;
    width: 416px;
    margin-top: 36px;

    &-orange {
      margin-top: 60px;
    }
  }
  h1:not(:first-child) {
    margin-top: 60px;
  }
  .base-rates {
    width: max-content;
  }
  textarea {
    max-width: 852px;
  }
}
</style>
