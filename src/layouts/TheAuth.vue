<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import { useHelpers } from '@/useHelpers'
import axios from 'axios'
import { API_URL } from '@/assets/constants'
import store from '@/store'
import { Login } from '@/assets/interfaces'
import authText from '@/assets/locales/auth.json'

const { setCookie, validateEmail } = useHelpers()
const props = defineProps<{type?: string}>()
const emits = defineEmits<{(event: 'close'): void }>()

const type = ref(props.type || 'login')
const emailValidate = ref(false)
const errorMessage = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const confPassword = ref('')
const showConfPassword = ref(false)

const login = () => {
  axios.post(`${API_URL}auth/login`, {
    username: name.value,
    password: password.value
  })
    .then((res: {data: Login}) => {
      const data = res.data
      setCookie('login', data, data.expiresIn)
      store.commit('login', data.username)
      console.log(emits('close'))
    })
    .catch(err => {
      if (err.response.status === 401) {
        errorMessage.value = authText.usernameOrPasswordIncorrect[store.state.lang]
      }
    })
}

const register = () => {
  if (!validateEmail(email.value)) {
    emailValidate.value = true
    return
  }

  axios.post(`${API_URL}auth/register`, {
    username: name.value,
    password: password.value,
    email: email.value
  })
    .then(() => {
      errorMessage.value = ''
      login()
    })
    .catch(err => {
      console.log(err.response.status)
      if (err.response.status === 400) {
        errorMessage.value = authText.usernameOrEmailExists[store.state.lang]
      }
    })
}

const resetPassword = () => {
  if (!validateEmail(email.value)) {
    emailValidate.value = true
  }
}

const newPassword = () => {
  console.log(true)
}

watch(email, () => {
  if (emailValidate.value) emailValidate.value = false
})

watch([type, name, email, password], () => {
  errorMessage.value = ''
})
</script>

<template>
 <div class="auth">
   <form action="" class="auth__content form" v-if="type === 'login'">
     <h3 class="txt-highlight">{{ authText.authLogin[store.state.lang] }}</h3>
     <div class="form-input">
       <input type="text" id="name" v-model="name">
       <label for="name" :class="{active: name.length}">{{authText.username[store.state.lang]}}</label>
       <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
         <path d="M0 11.4994H8V9.53516C7.99915 8.80607 7.70388 8.10708 7.17896 7.59153C6.65405 7.07599 5.94235 6.78599 5.2 6.78516H2.8C2.05765 6.78599 1.34595 7.07599 0.821037 7.59153C0.296118 8.10708 0.000846945 8.80607 0 9.53516V11.4994Z" fill="#666666"/>
         <path d="M1.19922 3.25C1.19922 3.7939 1.36344 4.32559 1.6711 4.77782C1.97877 5.23006 2.41607 5.58253 2.9277 5.79068C3.43934 5.99882 4.00233 6.05328 4.54547 5.94717C5.08862 5.84106 5.58753 5.57914 5.97912 5.19455C6.3707 4.80995 6.63738 4.31995 6.74542 3.7865C6.85346 3.25305 6.79801 2.70012 6.58608 2.19762C6.37416 1.69513 6.01527 1.26563 5.55482 0.963459C5.09436 0.661285 4.55301 0.5 3.99922 0.5C3.25661 0.5 2.54442 0.789732 2.01932 1.30546C1.49422 1.82118 1.19922 2.52066 1.19922 3.25Z" fill="#666666"/>
       </svg>
     </div>
     <div class="form-input">
       <input v-if="!showPassword" type="password" id="password" v-model="password">
       <input v-else type="text" id="password" v-model="password">
       <label for="password" :class="{active: password.length}">{{authText.password[store.state.lang]}}</label>
       <button class="icon" @click.prevent="showPassword = !showPassword">
         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
           <path d="M11.9655 4.1621C11.9479 4.2016 11.5245 5.1409 10.5828 6.0826C9.32864 7.33695 7.74385 8 6 8C4.25615 8 2.67135 7.337 1.41716 6.08265C0.475458 5.1409 0.0520088 4.20155 0.0344588 4.16205C0.011739 4.11091 0 4.05556 0 3.9996C0 3.94364 0.011739 3.8883 0.0344588 3.83715C0.0520588 3.79765 0.475458 2.85855 1.41721 1.91695C2.6714 0.6629 4.2561 0 6 0C7.7439 0 9.3286 0.6629 10.5828 1.91695C11.5245 2.85855 11.9479 3.7976 11.9655 3.83715C11.9883 3.8883 12 3.94364 12 3.9996C12 4.05556 11.9882 4.11096 11.9655 4.1621ZM6 5.7996C6.35601 5.7996 6.70402 5.69403 7.00002 5.49625C7.29603 5.29846 7.52674 5.01734 7.66298 4.68843C7.79922 4.35952 7.83486 3.9976 7.76541 3.64844C7.69596 3.29927 7.52452 2.97854 7.27279 2.72681C7.02106 2.47507 6.70033 2.30364 6.35116 2.23419C6.002 2.16473 5.64008 2.20038 5.31117 2.33662C4.98226 2.47285 4.70114 2.70356 4.50336 2.99957C4.30557 3.29558 4.2 3.64359 4.2 3.9996C4.20053 4.47683 4.39034 4.93436 4.72779 5.27181C5.06524 5.60926 5.52277 5.79907 6 5.7996Z" fill="#666666"/>
         </svg>
       </button>
     </div>
     <div class="checkbox-label">
       <input type="checkbox" name="stayLogged" id="stayLogged">
       <label for="stayLogged">{{authText.stayLoggedIn[store.state.lang]}}</label>
     </div>
     <button @click.prevent="login" :disabled="!name.length || password.length < 4" class="btn btn-orange">LOG IN</button>
     <button @click.prevent="type = 'forgot'">{{authText.forgotPassword[store.state.lang]}}</button>
     <p>
       {{ authText.dontHavAccount[store.state.lang] }}
       <button class="t-up bold" @click.prevent="type = 'reg'">{{ authText.signUp[store.state.lang] }}</button>
     </p>
   </form>
   <form action="" class="auth__content form" v-if="type === 'reg'">
     <h3 class="txt-highlight">{{ authText.createAccount[store.state.lang] }}</h3>
     <div class="form-input">
       <input type="text" id="name" v-model="name">
       <label for="name" :class="{active: name.length}">{{ authText.name[store.state.lang] }}</label>
     </div>
     <div class="form-input" :class="{error: emailValidate}">
       <input type="text" id="email" v-model="email">
       <label for="email" :class="{active: email.length}">{{ authText.eMail[store.state.lang] }}</label>
       <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
         <path d="M0 11.4994H8V9.53516C7.99915 8.80607 7.70388 8.10708 7.17896 7.59153C6.65405 7.07599 5.94235 6.78599 5.2 6.78516H2.8C2.05765 6.78599 1.34595 7.07599 0.821037 7.59153C0.296118 8.10708 0.000846945 8.80607 0 9.53516V11.4994Z" fill="#666666"/>
         <path d="M1.19922 3.25C1.19922 3.7939 1.36344 4.32559 1.6711 4.77782C1.97877 5.23006 2.41607 5.58253 2.9277 5.79068C3.43934 5.99882 4.00233 6.05328 4.54547 5.94717C5.08862 5.84106 5.58753 5.57914 5.97912 5.19455C6.3707 4.80995 6.63738 4.31995 6.74542 3.7865C6.85346 3.25305 6.79801 2.70012 6.58608 2.19762C6.37416 1.69513 6.01527 1.26563 5.55482 0.963459C5.09436 0.661285 4.55301 0.5 3.99922 0.5C3.25661 0.5 2.54442 0.789732 2.01932 1.30546C1.49422 1.82118 1.19922 2.52066 1.19922 3.25Z" fill="#666666"/>
       </svg>
     </div>
     <div class="form-input">
       <input v-if="!showPassword" type="password" id="password" v-model="password">
       <input v-else type="text" id="password" v-model="password">
       <label for="password" :class="{active: password.length}">{{ authText.password[store.state.lang] }}</label>
       <button class="icon" @click.prevent="showPassword = !showPassword">
         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
           <path d="M11.9655 4.1621C11.9479 4.2016 11.5245 5.1409 10.5828 6.0826C9.32864 7.33695 7.74385 8 6 8C4.25615 8 2.67135 7.337 1.41716 6.08265C0.475458 5.1409 0.0520088 4.20155 0.0344588 4.16205C0.011739 4.11091 0 4.05556 0 3.9996C0 3.94364 0.011739 3.8883 0.0344588 3.83715C0.0520588 3.79765 0.475458 2.85855 1.41721 1.91695C2.6714 0.6629 4.2561 0 6 0C7.7439 0 9.3286 0.6629 10.5828 1.91695C11.5245 2.85855 11.9479 3.7976 11.9655 3.83715C11.9883 3.8883 12 3.94364 12 3.9996C12 4.05556 11.9882 4.11096 11.9655 4.1621ZM6 5.7996C6.35601 5.7996 6.70402 5.69403 7.00002 5.49625C7.29603 5.29846 7.52674 5.01734 7.66298 4.68843C7.79922 4.35952 7.83486 3.9976 7.76541 3.64844C7.69596 3.29927 7.52452 2.97854 7.27279 2.72681C7.02106 2.47507 6.70033 2.30364 6.35116 2.23419C6.002 2.16473 5.64008 2.20038 5.31117 2.33662C4.98226 2.47285 4.70114 2.70356 4.50336 2.99957C4.30557 3.29558 4.2 3.64359 4.2 3.9996C4.20053 4.47683 4.39034 4.93436 4.72779 5.27181C5.06524 5.60926 5.52277 5.79907 6 5.7996Z" fill="#666666"/>
         </svg>
       </button>
     </div>
     <div class="form-input">
       <input v-if="!showConfPassword" type="password" id="confirm-password" v-model="confPassword">
       <input v-else type="text" id="confirm-password" v-model="confPassword">
       <label for="confirm-password" :class="{active: confPassword.length}">{{ authText.confPassword[store.state.lang] }}</label>
       <button class="icon" @click.prevent="showConfPassword = !showConfPassword">
         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
           <path d="M11.9655 4.1621C11.9479 4.2016 11.5245 5.1409 10.5828 6.0826C9.32864 7.33695 7.74385 8 6 8C4.25615 8 2.67135 7.337 1.41716 6.08265C0.475458 5.1409 0.0520088 4.20155 0.0344588 4.16205C0.011739 4.11091 0 4.05556 0 3.9996C0 3.94364 0.011739 3.8883 0.0344588 3.83715C0.0520588 3.79765 0.475458 2.85855 1.41721 1.91695C2.6714 0.6629 4.2561 0 6 0C7.7439 0 9.3286 0.6629 10.5828 1.91695C11.5245 2.85855 11.9479 3.7976 11.9655 3.83715C11.9883 3.8883 12 3.94364 12 3.9996C12 4.05556 11.9882 4.11096 11.9655 4.1621ZM6 5.7996C6.35601 5.7996 6.70402 5.69403 7.00002 5.49625C7.29603 5.29846 7.52674 5.01734 7.66298 4.68843C7.79922 4.35952 7.83486 3.9976 7.76541 3.64844C7.69596 3.29927 7.52452 2.97854 7.27279 2.72681C7.02106 2.47507 6.70033 2.30364 6.35116 2.23419C6.002 2.16473 5.64008 2.20038 5.31117 2.33662C4.98226 2.47285 4.70114 2.70356 4.50336 2.99957C4.30557 3.29558 4.2 3.64359 4.2 3.9996C4.20053 4.47683 4.39034 4.93436 4.72779 5.27181C5.06524 5.60926 5.52277 5.79907 6 5.7996Z" fill="#666666"/>
         </svg>
       </button>
     </div>
     <button
         @click.prevent="register"
         :disabled="!email.length || password.length < 4 || confPassword !== password"
         class="btn btn-orange">{{ authText.signUp[store.state.lang] }}</button>
     <p class="grey">
       {{ authText.byContinuingYouAgree[store.state.lang] }} <a href="#">{{authText.termsOfUse[store.state.lang]}}</a> {{authText.and[store.state.lang]}} <a href="#">{{authText.privacyAndPolicy[store.state.lang]}}.</a>
     </p>
     <p>
       {{authText.alreadyHaveAccount[store.state.lang]}}
       <button class="t-up bold" @click.prevent="type = 'login'">{{authText.authLogin[store.state.lang]}}</button>
     </p>
   </form>
   <form action="" class="auth__content form" v-if="type === 'forgot'">
     <h3 class="txt-highlight">{{authText.recoveryYourPassword[store.state.lang]}}</h3>
     <div class="form-input" :class="{error: emailValidate}">
       <input type="text" id="email" v-model="email">
       <label for="email" :class="{active: email.length}">{{authText.eMail[store.state.lang]}}</label>
       <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
         <path d="M0 11.4994H8V9.53516C7.99915 8.80607 7.70388 8.10708 7.17896 7.59153C6.65405 7.07599 5.94235 6.78599 5.2 6.78516H2.8C2.05765 6.78599 1.34595 7.07599 0.821037 7.59153C0.296118 8.10708 0.000846945 8.80607 0 9.53516V11.4994Z" fill="#666666"/>
         <path d="M1.19922 3.25C1.19922 3.7939 1.36344 4.32559 1.6711 4.77782C1.97877 5.23006 2.41607 5.58253 2.9277 5.79068C3.43934 5.99882 4.00233 6.05328 4.54547 5.94717C5.08862 5.84106 5.58753 5.57914 5.97912 5.19455C6.3707 4.80995 6.63738 4.31995 6.74542 3.7865C6.85346 3.25305 6.79801 2.70012 6.58608 2.19762C6.37416 1.69513 6.01527 1.26563 5.55482 0.963459C5.09436 0.661285 4.55301 0.5 3.99922 0.5C3.25661 0.5 2.54442 0.789732 2.01932 1.30546C1.49422 1.82118 1.19922 2.52066 1.19922 3.25Z" fill="#666666"/>
       </svg>
     </div>
     <button @click="resetPassword" :disabled="!email.length" class="btn btn-orange">{{authText.sendLink[store.state.lang]}}</button>
   </form>
   <form action="" class="auth__content form" v-if="type === 'password-reset'">
     <h3 class="txt-highlight">{{authText.passwordReset[store.state.lang]}}</h3>
     <div class="form-input">
       <input v-if="!showPassword" type="password" id="password" v-model="password">
       <input v-else type="text" id="password" v-model="password">
       <label for="password" :class="{active: password.length}">{{authText.password[store.state.lang]}}</label>
       <button class="icon" @click.prevent="showPassword = !showPassword">
         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
           <path d="M11.9655 4.1621C11.9479 4.2016 11.5245 5.1409 10.5828 6.0826C9.32864 7.33695 7.74385 8 6 8C4.25615 8 2.67135 7.337 1.41716 6.08265C0.475458 5.1409 0.0520088 4.20155 0.0344588 4.16205C0.011739 4.11091 0 4.05556 0 3.9996C0 3.94364 0.011739 3.8883 0.0344588 3.83715C0.0520588 3.79765 0.475458 2.85855 1.41721 1.91695C2.6714 0.6629 4.2561 0 6 0C7.7439 0 9.3286 0.6629 10.5828 1.91695C11.5245 2.85855 11.9479 3.7976 11.9655 3.83715C11.9883 3.8883 12 3.94364 12 3.9996C12 4.05556 11.9882 4.11096 11.9655 4.1621ZM6 5.7996C6.35601 5.7996 6.70402 5.69403 7.00002 5.49625C7.29603 5.29846 7.52674 5.01734 7.66298 4.68843C7.79922 4.35952 7.83486 3.9976 7.76541 3.64844C7.69596 3.29927 7.52452 2.97854 7.27279 2.72681C7.02106 2.47507 6.70033 2.30364 6.35116 2.23419C6.002 2.16473 5.64008 2.20038 5.31117 2.33662C4.98226 2.47285 4.70114 2.70356 4.50336 2.99957C4.30557 3.29558 4.2 3.64359 4.2 3.9996C4.20053 4.47683 4.39034 4.93436 4.72779 5.27181C5.06524 5.60926 5.52277 5.79907 6 5.7996Z" fill="#666666"/>
         </svg>
       </button>
     </div>
     <div class="form-input">
       <input v-if="!showConfPassword" type="password" id="confirm-password" v-model="confPassword">
       <input v-else type="text" id="confirm-password" v-model="confPassword">
       <label for="confirm-password" :class="{active: confPassword.length}">{{authText.confPassword[store.state.lang]}}</label>
       <button class="icon" @click.prevent="showConfPassword = !showConfPassword">
         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
           <path d="M11.9655 4.1621C11.9479 4.2016 11.5245 5.1409 10.5828 6.0826C9.32864 7.33695 7.74385 8 6 8C4.25615 8 2.67135 7.337 1.41716 6.08265C0.475458 5.1409 0.0520088 4.20155 0.0344588 4.16205C0.011739 4.11091 0 4.05556 0 3.9996C0 3.94364 0.011739 3.8883 0.0344588 3.83715C0.0520588 3.79765 0.475458 2.85855 1.41721 1.91695C2.6714 0.6629 4.2561 0 6 0C7.7439 0 9.3286 0.6629 10.5828 1.91695C11.5245 2.85855 11.9479 3.7976 11.9655 3.83715C11.9883 3.8883 12 3.94364 12 3.9996C12 4.05556 11.9882 4.11096 11.9655 4.1621ZM6 5.7996C6.35601 5.7996 6.70402 5.69403 7.00002 5.49625C7.29603 5.29846 7.52674 5.01734 7.66298 4.68843C7.79922 4.35952 7.83486 3.9976 7.76541 3.64844C7.69596 3.29927 7.52452 2.97854 7.27279 2.72681C7.02106 2.47507 6.70033 2.30364 6.35116 2.23419C6.002 2.16473 5.64008 2.20038 5.31117 2.33662C4.98226 2.47285 4.70114 2.70356 4.50336 2.99957C4.30557 3.29558 4.2 3.64359 4.2 3.9996C4.20053 4.47683 4.39034 4.93436 4.72779 5.27181C5.06524 5.60926 5.52277 5.79907 6 5.7996Z" fill="#666666"/>
         </svg>
       </button>
     </div>
     <button
       @click.prevent="newPassword"
       :disabled="password.length < 4 || confPassword !== password"
       class="btn btn-orange">reset password</button>
     <p>
       {{authText.dontHavAccount[store.state.lang]}}
       <button class="t-up bold" @click.prevent="type = 'reg'">{{authText.signUp[store.state.lang]}}</button>
     </p>
   </form>
   <p class="error" v-if="errorMessage">{{errorMessage}}</p>
 </div>
</template>

<style lang="scss">
.auth {
  padding: 60px;
  text-align: center;

  p {
    padding: 10px 0;
    font-size: 14px;

    &.error {
      color: #dc0606;
    }
  }

  @media (max-width: 500px) {
    padding: 60px 20px;
  }
}
</style>
