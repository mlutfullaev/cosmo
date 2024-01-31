<template>
  <div class="dropdown" ref="dropdown" @click="toggleDropdown">
    <div class="dropdown-select" :class="{opened: isOpen, noLabel: !ph}">
      <label v-if="ph" class="label">{{label ? label : ph}}</label>
      <span>{{ selected ? selected : ph }}</span>
      <svg :class="{opened: isOpen}" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="#FF8A00">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 7.69922L0 6.29922L6 0.299219L12 6.29922L10.6 7.69922L6 3.09922L1.4 7.69922Z" fill="inherit"/>
      </svg>
    </div>
    <transition name="fade">
      <div class="dropdown-list" v-if="isOpen">
        <div v-for="option in options" :key="option" @click.stop="selectOption(option)" class="dropdown-item">
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'

defineProps<{selected: string, options: string[], ph?: string, label?: string}>()
const emit = defineEmits<{(event: 'change', value: string): void}>()

const isOpen = ref(false)
const dropdown = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: string) => {
  emit('change', option)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  width: 100%;
  font-size: 20px;
}

.dropdown-select {
  border: 1px solid $black;
  padding: 28px 15px 8px 8px;
  cursor: pointer;
  position: relative;

  svg {
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    fill: $grey-dark;
    right: 5px;
    position: absolute;
    transition: .3s;

    &.opened {
      transform: translateY(-35%) rotate(180deg);
      fill: $orange;
    }
  }
  label {
    position: absolute;
    top: 8px;
    left: 8px;
  }
  &.opened {
    border-bottom: none;
  }
  &.noLabel {
    padding: 8px 15px 8px 8px;
  }
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid $black;
  border-top: none;
  background-color: white;
  z-index: 1000;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  color: $orange
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  max-height: 0;
}
.fade-enter-to, .fade-leave-from {
  max-height: 400px;
  opacity: 1;
}
</style>
