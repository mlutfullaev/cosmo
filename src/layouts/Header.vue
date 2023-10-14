<template>
  <header>
    <div class="header-items">
      <div class="menu"></div>
      <router-link to="/" class="logo">cosmo.<span>wiki</span></router-link>
    </div>
    <nav>
      <router-link to="#">SKIN ROUTINES LIBRARY<span></span></router-link>
      <router-link to="#">SKIN PRODUCT LIBRARY<span></span></router-link>
      <router-link to="#">AI PERSONAL AI ASSISTANT<span></span></router-link>
      <button class="btn-search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9.53493 19.0699C4.27909 19.0699 0 14.7908 0 9.53493C0 4.27909 4.27909 0 9.53493 0C14.7908 0 19.0699 4.27909 19.0699 9.53493C19.0699 14.7908 14.7908 19.0699 9.53493 19.0699ZM9.53493 1.39536C5.04188 1.39536 1.39536 5.05119 1.39536 9.53493C1.39536 14.0187 5.04188 17.6745 9.53493 17.6745C14.028 17.6745 17.6745 14.0187 17.6745 9.53493C17.6745 5.05119 14.028 1.39536 9.53493 1.39536Z" fill="#292D32"/>
          <path d="M19.3029 20.0001C19.1262 20.0001 18.9494 19.935 18.8099 19.7954L16.9494 17.935C16.6796 17.6652 16.6796 17.2187 16.9494 16.9489C17.2192 16.6791 17.6657 16.6791 17.9354 16.9489L19.7959 18.8094C20.0657 19.0792 20.0657 19.5257 19.7959 19.7954C19.6564 19.935 19.4796 20.0001 19.3029 20.0001Z" fill="#292D32"/>
        </svg>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
header {
  padding: 20px;
  border-bottom: 1px solid $black;
  @include display-center(space-between);

  nav {
    display: flex;
    gap: 20px;

    a {
      font-weight: 500;
      text-transform: uppercase;

      span {
        content: '';
        height: 1px;
        width: 0;
        background-color: $orange;
        display: block;
        bottom: 0;
        left: 0;
        transition: all .2s
      }
      &:hover span {
        width: 100%;
      }
    }
  }
}
</style>
