<script lang="ts" setup>
import { ref } from 'vue'
import BaseSelect from '@/baseComponents/BaseSelect.vue'

const sex = ref('')
const sexOptions = ['woman', 'man']
const age = ref('')
const ageOptions = ['0-6', '6-14', '14-18', '18-25', '25-35', '35-55', '55+']
const skinType = ref('')
const skinTypeOptions = ['Oily', 'Oily-Normal']
const skinTone = ref('')
const skinToneOptions = ['Oily', 'Oily-Normal']
const lifeStatus = ref('')
const lifeStatusOptions = ['Pregnant', 'Oily-Normal']
const skinSensitive = ref('')
const skinSensitiveOptions = ['Sensitive', 'Oily-Normal']
const concerns = ref('')
const concernsOptions = ['Sensitive', 'Oily-Normal']
const allergies = ref('')
const allergiesOptions = ['Sensitive', 'Oily-Normal']
</script>

<template>
 <div class="profile-skin">
   <h1 class="title-secondary">MY beauty skin profile</h1>
   <p class="txt-highlight">BASIC</p>
   <p class="note">Basic profile is the minimal set of requirements to establish Your SkinTwins and receive services.</p>
   <div class="profile-skin__inputs">
     <BaseSelect
       :options="sexOptions"
       @change="value => sex = value"
       :selected="sex"
       ph="Sex"
     />
     <BaseSelect
       :options="ageOptions"
       @change="value => age = value"
       :selected="age"
       ph="Age targeted group"
       label="Age"
     />
     <BaseSelect
       :options="skinTypeOptions"
       @change="value => skinType = value"
       :selected="skinType"
       ph="Skin type"
     />
     <BaseSelect
       :options="skinToneOptions"
       @change="value => skinTone = value"
       :selected="skinTone"
       ph="Skin tone"
     />
     <BaseSelect
       :options="lifeStatusOptions"
       @change="value => lifeStatus = value"
       :selected="lifeStatus"
       ph="Life status"
     />
     <BaseSelect
       :options="skinSensitiveOptions"
       @change="value => skinSensitive = value"
       :selected="skinSensitive"
       ph="Skin sensitivity"
     />
     <BaseSelect
       :options="concernsOptions"
       @change="value => concerns = value"
       :selected="concerns"
       ph="Concerns"
     />
     <BaseSelect
       :options="allergiesOptions"
       @change="value => allergies = value"
       :selected="allergies"
       ph="Allergies"
     />
   </div>
   <p class="label">* These inputs can’t be changed</p>
   <p class="txt-highlight">extended</p>
   <p class="note">Extended profile allows You to identify Your Exact SkinTwins based on skin, lifestyle, diet and environments.  The more accurate predictions how their experiences with beauty products and routines are applicable to you.</p>
 </div>
</template>

<style lang="scss" scoped>
.profile-skin {
  //padding: 60px;

  h1 {
  }
  .txt-highlight {
    font-weight: 400;
    padding: 36px 0 10px;
  }
  &__inputs {
    padding: 10px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
  }
}
</style>
