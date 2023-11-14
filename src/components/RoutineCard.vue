<script setup lang="ts">
import { defineProps, ref } from 'vue'
import BaseRate from '@/components/BaseRate.vue'

interface Routine {
  promoted: boolean,
  recommended: boolean,
  imgUrl: string,
  likes: number,
  saves: number,
  sends: number,
  title: string,
  authorName: string,
  authorPhoto: string,
  rate: number,
}

defineProps<{routine: Routine}>()

const sendAlert = ref(false)
const sendRef = ref(null)
const sendLocationLeft = ref(false)
const onSendAlert = (e) => {
  sendAlert.value = true
  if (window.screen.width - e.screenX > e.screenX) {
    sendLocationLeft.value = true
  }
}

</script>

<template>
  <div class="routineCard">
    <div class="routine-img bg-img" :style="{backgroundImage: `url('${routine.imgUrl}')`}">
      <base-rate :rates="routine.rate"/>
      <div class="activities">
        <button class="activity d-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path
              d="M10.9065 16.8385C10.6199 16.9396 10.148 16.9396 9.86152 16.8385C7.4177 16.0042 1.95703 12.5239 1.95703 6.62497C1.95703 4.02105 4.05534 1.91431 6.64242 1.91431C8.17612 1.91431 9.53286 2.65588 10.384 3.80194C11.2351 2.65588 12.6003 1.91431 14.1256 1.91431C16.7126 1.91431 18.8109 4.02105 18.8109 6.62497C18.8109 12.5239 13.3503 16.0042 10.9065 16.8385Z"
              fill="#FF8A00" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ routine.likes }}
        </button>
        <button class="activity d-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path
              d="M14.8982 4.80818V15.3788C14.8982 16.728 13.9305 17.2956 12.7487 16.6443L9.09184 14.6065C8.70103 14.3924 8.06827 14.3924 7.67745 14.6065L4.02057 16.6443C2.83882 17.2956 1.87109 16.728 1.87109 15.3788V4.80818C1.87109 3.21701 3.1738 1.91431 4.76496 1.91431H12.0043C13.5955 1.91431 14.8982 3.21701 14.8982 4.80818Z"
              fill="#FF8A00" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ routine.saves }}
        </button>
        <button :ref="sendRef" @click="onSendAlert" class="activity d-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M5.49868 4.61869L12.6671 2.22922C15.884 1.15691 17.6318 2.91313 16.5679 6.13005L14.1785 13.2984C12.5742 18.1196 9.9399 18.1196 8.33566 13.2984L7.62641 11.1707L5.49868 10.4615C0.677523 8.85723 0.677523 6.23137 5.49868 4.61869Z"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.78516 10.8078L10.8079 7.77664" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ routine.sends }}
        </button>
      </div>
      <p class="recommended" :class="{active: routine.recommended}">recommended</p>
      <p class="promoted" :class="{active: routine.promoted}">promoted</p>
    </div>
    <p class="txt-highlight">{{ routine.title }}</p>
    <div class="author">
      <img :src="routine.authorPhoto" alt="">
      <p class="note">{{ routine.authorName }}</p>
    </div>
    <div v-if="sendAlert" class="alert share" :style="sendLocationLeft ? {left: 0} : {right: 0}">
      <button class="alert-close" @click="sendAlert = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31Z"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.7559 20.2451L20.2459 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20.2459 20.2451L11.7559 11.7551" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <p class="txt-highlight">Share this routine with skintwins</p>
      <div class="d-sb">
        <button class="share-item">
          <img src="@/assets/img/product/share.png" alt="person-icon">
          <span class="note">Kate</span>
        </button>
        <button class="share-item">
          <img src="@/assets/img/product/share.png" alt="person-icon">
          <span class="note">Kate</span>
        </button>
        <button class="share-item">
          <img src="@/assets/img/product/share.png" alt="person-icon">
          <span class="note">Kate</span>
        </button>
        <button class="share-item">
          <img src="@/assets/img/product/share.png" alt="person-icon">
          <span class="note">Kate</span>
        </button>
        <button class="share-item">
          <img src="@/assets/img/product/share.png" alt="person-icon">
          <span class="note">Kate</span>
        </button>
      </div>
      <div class="d-sb" style="border-top: 1px solid #000">
        <button class="share-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z" fill="url(#paint0_linear_891_51845)"/>
            <path d="M11.2219 33.3627C14.9806 31.3087 19.1763 29.5943 23.0966 27.8712C29.8409 25.0489 36.6121 22.2755 43.4516 19.6935C44.7823 19.2535 47.1733 18.8234 47.4077 20.7798C47.2793 23.5492 46.7512 26.3024 46.389 29.0556C45.4696 35.1101 44.4069 41.1439 43.3706 47.1785C43.0136 49.1887 40.4755 50.2292 38.8515 48.9428C34.9487 46.3274 31.0158 43.7373 27.1628 41.0612C25.9007 39.7889 27.0711 37.9617 28.1983 37.0531C31.4128 33.9102 34.8218 31.2399 37.8683 27.9346C38.6901 25.9658 36.262 27.625 35.4611 28.1335C31.0604 31.1421 26.7674 34.3345 22.1277 36.9787C19.7578 38.273 16.9956 37.1669 14.6267 36.4447C12.5027 35.5722 9.39031 34.6932 11.2217 33.3629L11.2219 33.3627Z" fill="white"/>
            <defs>
              <linearGradient id="paint0_linear_891_51845" x1="23.0309" y1="-29.6273" x2="-20.7069" y2="41.0882" gradientUnits="userSpaceOnUse">
                <stop stop-color="#34B0DF"/>
                <stop offset="1" stop-color="#1E88D3"/>
              </linearGradient>
            </defs>
          </svg>
        </button>
        <button class="share-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#C31162"/>
          </svg>
        </button>
        <button class="share-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#21C004"/>
          </svg>
        </button>
        <button class="share-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
            <path d="M26.25 18.75L18.75 26.25" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30 24.375L33.75 20.625C36.3388 18.0362 36.3388 13.8388 33.75 11.25V11.25C31.1612 8.66117 26.9638 8.66116 24.375 11.25L20.625 15M15 20.625L11.25 24.375C8.66117 26.9638 8.66117 31.1612 11.25 33.75V33.75C13.8388 36.3388 18.0362 36.3388 20.625 33.75L24.375 30" stroke="black" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="share-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
            <rect x="7.5" y="11.25" width="30" height="22.5" rx="2" stroke="black"/>
            <path d="M7.5 16.875L21.6056 23.9278C22.1686 24.2093 22.8314 24.2093 23.3944 23.9278L37.5 16.875" stroke="black"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.routineCard {
  position: relative;
  .routine-img {
    position: relative;
    //height: 480px;
    padding: 20px;
    display: grid;
    align-content: space-between;
    justify-content: right;

    .activities {
      display: grid;
      gap: 10px;
      justify-content: right;

      .activity {
        font-size: 14px;
        font-weight: 700;
        flex-direction: column;
        color: #fff;
      }
    }
  }

  & > p {
    padding: 15px 0;
  }

  .author {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;

    p {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  .alert {
    z-index: 1;
    bottom: 0;

    .d-sb {
      padding: 20px 0;
      gap: 20px;
    }
  }
}
</style>
