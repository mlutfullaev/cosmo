<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderSearch',
  data: () => ({
    searchActive: false,
    searchModel: '',
  }),
  methods: {
    onSearch () {
      if (!this.searchActive) {
        this.searchActive = true
        return null
      } else {
        if (!this.searchModel) {
          (this.$refs.searchRef as HTMLInputElement).focus()
        } else {
          this.$router.push(`/search-results/${this.searchModel}`)
        }
      }
    }
  }
})
</script>

<template>
  <div class="d-center search" :class="{active: searchActive}">
    <button class="btn-search" @keyup.enter="onSearch" @click="onSearch">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <path
          d="M9.53493 19.0699C4.27909 19.0699 0 14.7908 0 9.53493C0 4.27909 4.27909 0 9.53493 0C14.7908 0 19.0699 4.27909 19.0699 9.53493C19.0699 14.7908 14.7908 19.0699 9.53493 19.0699ZM9.53493 1.39536C5.04188 1.39536 1.39536 5.05119 1.39536 9.53493C1.39536 14.0187 5.04188 17.6745 9.53493 17.6745C14.028 17.6745 17.6745 14.0187 17.6745 9.53493C17.6745 5.05119 14.028 1.39536 9.53493 1.39536Z"/>
        <path
          d="M19.3029 20.0001C19.1262 20.0001 18.9494 19.935 18.8099 19.7954L16.9494 17.935C16.6796 17.6652 16.6796 17.2187 16.9494 16.9489C17.2192 16.6791 17.6657 16.6791 17.9354 16.9489L19.7959 18.8094C20.0657 19.0792 20.0657 19.5257 19.7959 19.7954C19.6564 19.935 19.4796 20.0001 19.3029 20.0001Z"/>
      </svg>
    </button>
    <div class="search-content">
      <input class="input-search" type="text" v-model="searchModel" ref="searchRef">
      <button @click="searchActive = false; searchModel = ''" class="d-center">&times;</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  .btn-search {
    fill: #292D32;
    transition: .3s;

    &:hover {
      fill: $orange;
    }
  }

  .search-content {
    position: relative;
    overflow: hidden;
    transition: .3s;
    margin-left: 10px;
    width: 0;

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      font-size: 20px;
      width: 20px;
      height: 20px;
      transition: .3s;

      &:hover {
        color: $orange;
      }
    }
  }

  &.active {
    .search-content {
      width: 450px;

      @media (max-width: 1440px) {
        width: 300px;
      }
      @media (max-width: 1200px) {
        width: 200px;
      }
      @media (max-width: 420px) {
        width: 100%;
      }
    }

    @media (max-width: 420px) {
      position: absolute;
      right: 40px;
      left: 0;
      background: $white;
      padding: 0 20px;
    }
  }
}
</style>
