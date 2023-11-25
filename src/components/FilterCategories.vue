<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

interface Category {
  title: string,
  categories: {
    imgUrl: string,
    title: string
  }[]
}
defineProps<{categories: Category, categorySelected: string}>()
defineEmits<{(event: 'categorySelect', title: string): void}>()
</script>

<template>
  <div class="filterCategories">
    <button
      v-for="category in categories.categories"
      class="filterCategories-item"
      :class="{active: categorySelected === category.title}"
      @click="$emit('categorySelect', category.title)"
      :key="category.title">
      <span class="image bg-img" :style="{backgroundImage: `url('${category.imgUrl}')`}"></span>
      <span class="note t-up bold">{{ category.title }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.filterCategories {
  display: flex;
  gap: 40px;
  padding: 20px 0;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  overflow-x: auto;

  button {
    display: grid;
    gap: 10px;
    width: max-content;
    max-width: 100px;
    text-align: center;

    .image {
      border-radius: 50%;
      overflow: hidden;
      height: 120px;
      background-size: 95%;
      width: 120px;
      transition: .3s;
      border: 1px solid transparent;

      @media (max-width: 768px) {
        width: 80px;
        height: 80px;
      }
    }

    .note {
      transition: .3s;
      color: $grey-dark;
    }

    &.active {
      .image {
        border: 1px solid $black;
      }

      .note {
        color: $black;
      }
    }
  }

  @media (max-width: 1120px) {
    justify-content: left;
    padding: 20px;
  }
}
</style>
