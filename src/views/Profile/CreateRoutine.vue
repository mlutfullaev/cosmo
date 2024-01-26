<script lang="ts" setup>
import BaseDrag from '@/baseComponents/BaseDrag.vue'
import { ref, defineEmits } from 'vue'
defineEmits<{(event: 'close'): void}>()
const steps = ref([
  {
    title: '',
    description: '',
    howTo: '',
    product: '',
    id: new Date().getTime(),
  }
])

const addStep = () => {
  steps.value.push({
    title: '',
    description: '',
    howTo: '',
    product: '',
    id: new Date().getTime(),
  })
}
</script>

<template>
 <div class="profile-create">
   <h1 class="title-secondary">CREATE YOUR new ROUTINE</h1>
   <p class="txt">Once added the product will be seen by your skintwim community and others</p>
   <p class="name">title OF YOUR  NEW ROUTINE</p>
   <input type="text" class="input-form" placeholder="name">
   <p class="name">short description</p>
   <textarea class="textarea-form" placeholder="This summary description will be shown on the summary card f the Routine. " />
   <p class="name">full description</p>
   <textarea class="textarea-form" placeholder="This is full description, including benefits, targeting concerns and everything you feel important about this routine."></textarea>
   <p class="name">Tags</p>
   <input type="text" class="input-form" value="#">
   <p class="label">Tags help to find Your routine with the Library</p>
   <p class="name">Add the photo or video</p>
   <BaseDrag />
   <div class="profile-step" v-for="(step, key) in steps" :key="step.id">
     <h1 class="title-secondary">step {{key + 1}}</h1>
     <p class="name">title</p>
     <input type="text" v-model="step.title" class="input-form" placeholder="Write here how you want to call this step">
     <p class="name">Write here how you want to call this step</p>
     <input type="text" v-model="step.product" class="input-form" placeholder="Brand / Product Title">
     <p class="name">DESCRIPTION  (Optional)</p>
     <textarea class="textarea-form profile-step__description" v-model="step.description" placeholder="Short description or Things not to forget while doing this step" />
     <p class="name">how to (Optional)</p>
     <input type="text" v-model="step.howTo" class="input-form" placeholder="Short manual  how to do this  step">
   </div>
   <button class="btn btn-outline" @click="addStep">Add step +</button><br/>
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
  .profile-step {
    margin-top: 60px;

    textarea {
      background: $white;
      border: 1px solid $black;
    }
  }
  textarea {
    max-width: 852px;
  }
}
</style>
