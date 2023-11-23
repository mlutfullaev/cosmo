<script setup lang="ts">
import { ref } from 'vue'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const buttonActive = ref(false)
window.onscroll = () => {
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    buttonActive.value = true
  } else {
    buttonActive.value = false
  }
}
</script>

<template>
  <footer>
    <button
      class="scrollToTop"
      :class="{active: buttonActive}"
      @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="25" viewBox="0 0 17 25" fill="none">
        <path d="M0 8.48657L8.43023 0L16.8605 8.48657V11.6337L9.62452 4.34936V25H7.23595V4.27864L0 11.5629V8.48657Z"
          fill="white" />
      </svg>
    </button>
    <div class="footer">
      <div class="footer-item">
        <router-link to="/" class="logo">cosmo<span>.wiki</span></router-link>
        <p>Make smart Beauty decisions with Independed Skincare Wikipedia for Beauty products and Routine
          references.</p>
        <div class="d-center">
          <router-link to="#" class="note">Contact us</router-link>
          <a href="#" class="note-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 448 512">
              <path
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
            </svg>
          </a>
        </div>
        <p class="note-2">©2023 COSMO.WIKI. All rights reserved</p>
        <router-link to="#" class="note-2">Legals</router-link>
      </div>
      <div class="footer-item">
        <router-link to="/product-intro" class="note">Skincare Products Library</router-link>
        <router-link to="/routine-intro" class="note">Routines Library</router-link>
        <router-link to="/registration" class="note">your Beauty ID</router-link>
      </div>
      <div class="footer-item">
        <p class="note">Connect with LUX AI Personal Beauty Assistant</p>
        <router-link to="/" class="note-2">Telegram</router-link>
        <router-link to="/" class="note-2">Whatsapp</router-link>
        <router-link to="/" class="note-2">Android</router-link>
        <router-link to="/" class="note-2">IOS</router-link>
      </div>
      <div class="footer-item">
        <p class="note">Our Story</p>
        <router-link to="#" class="note-2">For Retailers</router-link>
        <router-link to="#" class="note-2">For Brands</router-link>
        <router-link to="#" class="note-2">Our DermoBoard</router-link>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background: $grey;
  padding: 60px;

  .note {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    transition: .3s;
  }

  .note-2 {
    font-size: 14px;
    transition: .3s;

    svg {
      transition: .3s;
    }
  }

  a.note:hover {
    color: $orange;
  }

  a.note-2:hover {
    color: $orange;

    svg {
      fill: $orange;
    }
  }

  .footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    gap: 50px;

    &-item {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .logo {
        font-size: 24px;
        padding-bottom: 20px;
      }

      .d-center {
        justify-content: space-between;
      }
    }

    @media (max-width: 1000px) {
      gap: 20px;
    }
    @media (max-width: 550px) {
      grid-template-columns: auto;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
}
</style>
