<script lang="ts" setup>
import { ref } from 'vue'
import BaseSelect from '@/baseComponents/BaseSelect.vue'

const name = ref('Name')
const email = ref('name@gmail.com')
const password = ref('● ● ● ● ● ● ● ●')
const confirmPassword = ref('● ● ● ● ● ● ● ●')
const passwordChange = ref(false)
const messenger = ref('')
const messengerId = ref('')

const resetPassword = () => {
  password.value = ''
  passwordChange.value = true
  confirmPassword.value = ''
}
const savePassword = () => {
  passwordChange.value = false
  const pass = password.value.trim()
  password.value = pass.replace(/./g, '● ')
  confirmPassword.value = pass.replace(/./g, '● ')
}
</script>

<template>
 <div class="profile-account">
   <h1 class="title-secondary">ACCOUNT DETAILS</h1>
   <p class="name">USER NAME</p>
   <input class="input-form" type="text" v-model="name">
   <p class="label">This name is displayed in your reviews and comments</p>
   <p class="name">Profile photo</p>
   <p class="label">Set profile photo</p>
   <p class="name">YOUR REGISTERED EMAIL</p>
   <input class="input-form" type="text" v-model="email">
   <p class="name">LOGIN / ACCESS password</p>
   <div class="account-grid">
     <input class="input-form" :disabled="!passwordChange" type="text" v-model="password">
     <input class="input-form" :disabled="!passwordChange" type="text" v-model="confirmPassword">
     <button class="btn btn-outline" v-if="!passwordChange" @click="resetPassword">change password</button>
     <button class="btn btn-orange" v-else @click="savePassword" :disabled="password.length < 4 || password !== confirmPassword">Save password</button>
   </div>
   <h1 class="title-secondary">PERSONAL IN-MESSENGER ASSISTANCE</h1>
   <p class="name">YOUR ai PERSONAL In-MESSENGER assistant WHEN YOU NEED COSMO.WIKI ON THE GO</p>
   <div class="account-grid">
     <BaseSelect
       :options="['telegram', 'WhatsApp']"
       ph="Messenger"
       :selected="messenger"
       @change="value => messenger = value"
     />
     <input class="input-form" type="text" placeholder="Your ID in Messenger" v-model="messengerId">
   </div>
   <button class="btn btn-orange">Save Changes</button>
 </div>
</template>

<style lang="scss" scoped>
.profile-account {
  h1:not(:first-child) {
    padding-top: 60px;
  }
  .name {
    padding: 36px 0 12px;
  }
  .account-grid {
    display: grid;
    grid-template-columns: repeat(3, 416px);
    grid-gap: 20px;
  }

  .btn {
    font-size: 20px;
    padding: 13px 40px;
  }
  > .btn-orange {
    width: 416px;
    margin-top: 60px;
  }
}
</style>
