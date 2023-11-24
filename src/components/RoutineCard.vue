<script setup lang="ts">
import { VNodeRef, defineProps, ref } from 'vue'
import { Routine } from '@/interfaces'
import BaseRate from '@/components/BaseRate.vue'
import ShareWindow from './ShareWindow.vue'

defineProps<{routine: Routine}>()

const sendAlert = ref(false)
const sendRef = ref<VNodeRef | undefined>(undefined)
// const sendLocationLeft = ref(false)
// const onSendAlert = (e) => {
//   sendAlert.value = true
//   if (window.screen.width - e.screenX > e.screenX) {
//     sendLocationLeft.value = true
//   }
// }

</script>

<template>
  <div class="routine-card">
    <div
      class="routine-card__img bg-img"
      @click="$router.push(`/single-routine/${routine.id}`)"
      :style="routine.authorImage ? {backgroundImage: `url('https://api-www.beautyid.app/images/getimage/${routine.authorImage}')`} : {backgroundImage: `url('${require('@/assets/img/global/placeholder.png')}')`}">
      <base-rate :rates="3.5"/>
      <div class="activities">
        <button class="activity d-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path
              d="M10.9065 16.8385C10.6199 16.9396 10.148 16.9396 9.86152 16.8385C7.4177 16.0042 1.95703 12.5239 1.95703 6.62497C1.95703 4.02105 4.05534 1.91431 6.64242 1.91431C8.17612 1.91431 9.53286 2.65588 10.384 3.80194C11.2351 2.65588 12.6003 1.91431 14.1256 1.91431C16.7126 1.91431 18.8109 4.02105 18.8109 6.62497C18.8109 12.5239 13.3503 16.0042 10.9065 16.8385Z"
              fill="#FF8A00" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- {{ routine.likes }} -->
          623
        </button>
        <button class="activity d-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path
              d="M14.8982 4.80818V15.3788C14.8982 16.728 13.9305 17.2956 12.7487 16.6443L9.09184 14.6065C8.70103 14.3924 8.06827 14.3924 7.67745 14.6065L4.02057 16.6443C2.83882 17.2956 1.87109 16.728 1.87109 15.3788V4.80818C1.87109 3.21701 3.1738 1.91431 4.76496 1.91431H12.0043C13.5955 1.91431 14.8982 3.21701 14.8982 4.80818Z"
              fill="#FF8A00" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- {{ routine.saves }} -->
          123
        </button>
        <button :ref="sendRef" @click.stop="sendAlert = true" class="activity d-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M5.49868 4.61869L12.6671 2.22922C15.884 1.15691 17.6318 2.91313 16.5679 6.13005L14.1785 13.2984C12.5742 18.1196 9.9399 18.1196 8.33566 13.2984L7.62641 11.1707L5.49868 10.4615C0.677523 8.85723 0.677523 6.23137 5.49868 4.61869Z"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.78516 10.8078L10.8079 7.77664" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- {{ routine.sends }} -->
          123
        </button>
      </div>
      <!-- <p class="recommended" :class="{active: routine.recommended}">recommended</p>
      <p class="promoted" :class="{active: routine.promoted}">promoted</p> -->
    </div>
    <p class="txt-highlight">{{ routine.routineName }}</p>
    <div class="author">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M32 16C32 7.184 24.816 0 16 0C7.184 0 0 7.184 0 16C0 20.64 2 24.816 5.168 27.744C5.168 27.76 5.168 27.76 5.152 27.776C5.312 27.936 5.504 28.064 5.664 28.208C5.76 28.288 5.84 28.368 5.936 28.432C6.224 28.672 6.544 28.896 6.848 29.12C6.96 29.2 7.056 29.264 7.168 29.344C7.472 29.552 7.792 29.744 8.128 29.92C8.24 29.984 8.368 30.064 8.48 30.128C8.8 30.304 9.136 30.464 9.488 30.608C9.616 30.672 9.744 30.736 9.872 30.784C10.224 30.928 10.576 31.056 10.928 31.168C11.056 31.216 11.184 31.264 11.312 31.296C11.696 31.408 12.08 31.504 12.464 31.6C12.576 31.632 12.688 31.664 12.816 31.68C13.264 31.776 13.712 31.84 14.176 31.888C14.24 31.888 14.304 31.904 14.368 31.92C14.912 31.968 15.456 32 16 32C16.544 32 17.088 31.968 17.616 31.92C17.68 31.92 17.744 31.904 17.808 31.888C18.272 31.84 18.72 31.776 19.168 31.68C19.28 31.664 19.392 31.616 19.52 31.6C19.904 31.504 20.304 31.424 20.672 31.296C20.8 31.248 20.928 31.2 21.056 31.168C21.408 31.04 21.776 30.928 22.112 30.784C22.24 30.736 22.368 30.672 22.496 30.608C22.832 30.464 23.168 30.304 23.504 30.128C23.632 30.064 23.744 29.984 23.856 29.92C24.176 29.728 24.496 29.552 24.816 29.344C24.928 29.28 25.024 29.2 25.136 29.12C25.456 28.896 25.76 28.672 26.048 28.432C26.144 28.352 26.224 28.272 26.32 28.208C26.496 28.064 26.672 27.92 26.832 27.776C26.832 27.76 26.832 27.76 26.816 27.744C30 24.816 32 20.64 32 16ZM23.904 23.952C19.568 21.04 12.464 21.04 8.096 23.952C7.392 24.416 6.816 24.96 6.336 25.552C3.904 23.088 2.4 19.712 2.4 16C2.4 8.496 8.496 2.4 16 2.4C23.504 2.4 29.6 8.496 29.6 16C29.6 19.712 28.096 23.088 25.664 25.552C25.2 24.96 24.608 24.416 23.904 23.952Z" fill="black"/>
        <path d="M16 7.88672C12.688 7.88672 10 10.5747 10 13.8867C10 17.1347 12.544 19.7747 15.92 19.8707H16.064H16.176H16.208C19.44 19.7587 21.984 17.1347 22 13.8867C22 10.5747 19.312 7.88672 16 7.88672Z" fill="black"/>
      </svg>
      <p class="note">{{ routine.authorName }}</p>
    </div>
    <ShareWindow :send-alert="sendAlert" @close-alert="sendAlert = false" />
  </div>
</template>

<style lang="scss" scoped>
.routine-card {
  position: relative;
  .routine-card__img {
    position: relative;
    cursor: pointer;
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
    cursor: pointer;
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
}
</style>
