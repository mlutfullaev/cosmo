<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Category {
  title: string,
  categories: {
    imgUrl: string,
    title: string
  }[]
}

export default defineComponent({
  props: {
    categories: {
      type: [] as PropType<Category[]>,
      required: true,
    },
    categorySelected: {
      type: String,
      required: true,
    }
  },
  emits: ['categorySelect']
})
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
  flex-wrap: wrap;

  button {
    display: grid;
    gap: 10px;

    .image {
      border-radius: 50%;
      overflow: hidden;
      height: 100px;
      background-size: 95%;
      width: 100px;
      transition: .3s;
      border: 1px solid transparent;
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
}
</style>
