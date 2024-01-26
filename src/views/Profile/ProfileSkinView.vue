<script lang="ts" setup>
import { computed, ref } from 'vue'
import BaseSelect from '@/baseComponents/BaseSelect.vue'
import BaseModal from '@/baseComponents/BaseModal.vue'

const sex = ref('')
const sexOptions = ['woman', 'man']
const age = ref('')
const ageOptions = ['0-6', '6-14', '14-18', '18-25', '25-35', '35-55', '55+']
const skinType = ref('')

const skinTypeOptions = ['Oily', 'Oily-Normal']
const skinToneOptions = ref<{title: string, background: string, selected?: boolean}[]>([{ title: 'Oily', background: '#ff0' }, { title: 'Light, Pale White', background: '#F6D0B1' }])
const skinTone = computed(() => skinToneOptions.value.filter(item => item.selected).map(item => item.title))
const skinToneModal = ref(false)

const lifeStatus = ref('')
const lifeStatusOptions = ['Pregnant', 'Oily-Normal']
const skinSensitive = ref('')
const skinSensitiveOptions = ['Sensitive', 'Oily-Normal']

const concerns = ref([])
const concernsModal = ref(false)
const concernsOptions = ['Sensitive', 'Oily-Normal']

const allergiesModal = ref(false)
const allergies = ref([])
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
     <div class="input-form with-label" @click="skinToneModal = true">
       <label class="label">Skin tone</label>
       <span>{{ skinTone.length ? skinTone.join(', ') : 'Skin tone' }}</span>
       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 7.69922L0 6.29922L6 0.299219L12 6.29922L10.6 7.69922L6 3.09922L1.4 7.69922Z" fill="inherit"/>
       </svg>
     </div>
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
     <div class="input-form with-label" @click="concernsModal = true">
       <label class="label">Skin concerns</label>
       <span>{{ concerns.length ? concerns.join(', ') : 'Skin concerns' }}</span>
       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 7.69922L0 6.29922L6 0.299219L12 6.29922L10.6 7.69922L6 3.09922L1.4 7.69922Z" fill="inherit"/>
       </svg>
     </div>
     <div class="input-form with-label" @click="allergiesModal = true">
       <label class="label">Allergies</label>
       <span>{{ allergies.length ? allergies.join(', ') : 'Allergies' }}</span>
       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 7.69922L0 6.29922L6 0.299219L12 6.29922L10.6 7.69922L6 3.09922L1.4 7.69922Z" fill="inherit"/>
       </svg>
     </div>
   </div>
   <p class="label">* These inputs can’t be changed</p>
   <p class="txt-highlight">extended</p>
   <p class="note">Extended profile allows You to identify Your Exact SkinTwins based on skin, lifestyle, diet and environments.  The more accurate predictions how their experiences with beauty products and routines are applicable to you.</p>
    <button class="btn-quiz">
      RUN EXTENDED SKIN PROFILE QUIZ
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.300781 1.9L1.70078 0.5L7.70078 6.5L1.70078 12.5L0.300781 11.1L4.90078 6.5L0.300781 1.9Z" fill="#777777"/>
      </svg>
    </button>
   <button class="btn btn-orange">Save changes</button>
   <BaseModal :active="skinToneModal" @close="skinToneModal = false">
     <div class="profile-skin__modal">
       <p class="txt">Skin tone</p>
       <div class="profile-skin__modal__content">
         <div
           v-for="item in skinToneOptions"
           :key="item.title"
           @click="item.selected = !item.selected"
           class="rectangle-block"
           :class="{active: item.selected}">
           <div class="rectangle" :style="{background: item.background}"></div>
           <p class="txt">{{item.title}}</p>
           <p class="note">Always burns, Never tans</p>
         </div>
       </div>
     </div>
   </BaseModal>
   <BaseModal :active="concernsModal" @close="concernsModal = false">
     <div class="profile-skin__modal">
       <p class="txt">Skin concerns</p>
       <div class="profile-skin__modal__content">
         <button
           v-for="item in concernsOptions"
           :key="item"
           @click="concerns.includes(item) ? concerns = concerns.filter(el => el != item) : concerns = [...concerns, item]"
           class="btn btn-outline"
           :class="{'btn-orange': concerns.includes(item)}">
           {{item}}
         </button>
       </div>
     </div>
   </BaseModal>
   <BaseModal :active="allergiesModal" @close="allergiesModal = false">
     <div class="profile-skin__modal">
       <p class="txt">Allergies</p>
       <div class="profile-skin__modal__content">
         <button
           v-for="item in allergiesOptions"
           :key="item"
           @click="allergies.includes(item) ? allergies = allergies.filter(el => el != item) : allergies = [...allergies, item]"
           class="btn btn-outline"
           :class="{'btn-orange': allergies.includes(item)}">
           {{item}}
         </button>
       </div>
     </div>
   </BaseModal>
 </div>
</template>

<style lang="scss" scoped>
.profile-skin {
  .btn {
    padding: 8px;
    font-size: 20px;
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

    .input-form {
      max-width: 100%;
    }
  }
  &__modal {
    > .txt {
      padding-bottom: 20px;
    }
    &__content {
      display: flex;
      flex-wrap: wrap;
      width: 312px;
      grid-gap: 24px;
    }
    .rectangle-block {
      width: calc(50% - 12px);
      cursor: pointer;

      .txt {
        transition: .3s;
      }
      .rectangle {
        width: 100%;
        height: 50px;
        margin-bottom: 5px;
      }
      &:hover, &.active {
        .txt {
          color: $orange;
        }
      }
    }
  }
  .btn-quiz {
    padding: 16px 8px;
    background: $grey;
    display: flex;
    width: 416px;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    color: $black;
  }
  > .btn-orange {
    margin-top: 60px;
    width: 416px;
  }
}
</style>
