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
    <div class="routine-card__img bg-img" :style="{backgroundImage: `url('${require('@/assets/img/routine/routine1.png')}')`}">
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
    <p class="txt-highlight" @click="$router.push(`/single-routine/${routine.id}`)">{{ routine.routineName }}</p>
    <div class="author" @click="$router.push(`/single-routine/${routine.id}`)">
      <!-- <img :src="routine.authorPhoto" alt=""> -->
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
    cursor: pointer;
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
