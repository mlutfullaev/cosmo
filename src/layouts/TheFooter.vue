<script setup lang="ts">
import store from '@/store'
import layoutsText from '@/assets/locales/layouts.json'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <footer class="footer">
    <button
      class="scrollToTop"
      :class="{active: store.state.showLater}"
      @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="25" viewBox="0 0 17 25" fill="none">
        <path d="M0 8.48657L8.43023 0L16.8605 8.48657V11.6337L9.62452 4.34936V25H7.23595V4.27864L0 11.5629V8.48657Z"
          fill="white" />
      </svg>
    </button>
    <router-link to="/" class="logo">
      <img src="@/assets/img/icons/logo.svg" alt="logo">
    </router-link>
    <p class="txt footer__subtitle">Independed Skincare Wikipedia for Beauty products and Routine.  We help You to make smart Beauty Decisions for Your Skin. </p>
    <p class="txt-highlight footer__title">get to know cosmo.wiki</p>
    <div class="footer__inner">
      <div class="footer__item">
        <p class="note">Products</p>
        <router-link to="/product-filter">Product finder</router-link>
        <router-link to="/product-filter">Skin Types</router-link>
        <router-link to="/product-filter">Alternative product finder</router-link>
        <router-link to="/product-filter">Sampling finder</router-link>
        <router-link to="/product-filter">Top 10 searched products for acne </router-link>
        <router-link to="/product-filter">Top 10 searched products for wrinkles </router-link>
        <router-link to="/product-filter">Top 10 searched products for dull skin </router-link>
      </div>
      <div class="footer__item">
        <p class="note">routines</p>
        <router-link to="/routine-filter">Routine Finder</router-link>
        <router-link to="/product-filter">Concern Targeted  routines</router-link>
        <router-link to="/product-filter">Most used routines for normal skin</router-link>
        <router-link to="/product-filter">Most used routines for combination skin</router-link>
        <router-link to="/product-filter">Most used routines for oily skin</router-link>
        <router-link to="/product-filter">Most used routines for dry skin</router-link>
      </div>
      <div class="footer__item">
        <p class="note">AI SERVICES</p>
        <router-link to="/product-filter">Beautymeter</router-link>
        <router-link to="/product-filter">Personal Beauty AI Assistant in Your messenger</router-link>
        <router-link to="/product-filter">Assistant in Your Browser</router-link>
        <router-link to="/product-filter">Products Insights and introductions</router-link>
        <router-link to="/product-filter">Routine insights recommendation</router-link>
        <router-link to="/product-filter">Special offers near you</router-link>
        <router-link to="/product-filter">Store Navigator</router-link>
      </div>
      <div class="footer__item">
        <p class="note">USER MANUALS </p>
        <router-link to="/product-filter">Create free account</router-link>
        <router-link to="/product-filter">How to find products or routines</router-link>
        <router-link to="/product-filter">How to write reviews for products</router-link>
        <router-link to="/product-filter">How to check product to match my skin</router-link>
        <router-link to="/product-filter">How to check your SkinTwin Community ID</router-link>
        <router-link to="/product-filter">How to publish You routines</router-link>
        <router-link to="/product-filter">How to find beast deal for skincare products</router-link>
      </div>
      <div class="footer__item">
        <p class="note">about us</p>
        <router-link to="/product-filter">About COSMO.WIKI</router-link>
        <router-link to="/product-filter">Our Policy</router-link>
        <router-link to="/product-filter">Dermoboard</router-link>
        <router-link to="/product-filter">Contact us</router-link>
      </div>
      <div class="footer__item">
        <p class="note">beauty advisory cooperation</p>
        <router-link to="/product-filter">Dermatologists</router-link>
        <router-link to="/product-filter">Beauty periodicals</router-link>
        <router-link to="/product-filter">Beauty consultants</router-link>
        <router-link to="/product-filter">Universities</router-link>
      </div>
      <div class="footer__item">
        <p class="note">Industry cooperation</p>
        <router-link to="/product-filter">Brands</router-link>
        <router-link to="/product-filter">Retailers</router-link>
        <router-link to="/product-filter">Technology partners</router-link>
        <router-link to="/product-filter">Consultants</router-link>
      </div>
      <div class="footer__item">
        <p class="note">INDUSTRY - MANUALS</p>
        <router-link to="/product-filter">New Products submission</router-link>
        <router-link to="/product-filter">Pricing submission</router-link>
        <router-link to="/product-filter">List on COSMO.WIK</router-link>
        <router-link to="/product-filter">on-Product page Surveys activation</router-link>
        <router-link to="/product-filter">Product reviews management</router-link>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="txt change-location">Change location and language &nbsp;&nbsp; <button class="note">PRAHA,CZ  - ENGLISH</button></p>
      <p class="txt">©2023 COSMO.WIKI. All rights reserved</p>
      <div>
        <router-link to="/">Privacy policy</router-link>
        <router-link to="/">Legals</router-link>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: $grey;
  padding: 60px;

  > a {
    width: max-content;
    display: block;
    margin: 0 auto;
    text-align: center;

    img {
      height: 40px;
    }
  }

  &__subtitle {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    font-size: 20px;
    padding: 60px 0;
  }
  &__title {
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 20px;
  }
  .note {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    transition: .3s;
  }

  &__inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    gap: 50px;

    .footer__item {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .note {
        padding-bottom: 8px;
      }
    }

    @media (max-width: 1000px) {
      gap: 20px;
    }
    @media (max-width: 550px) {
      grid-template-columns: auto;
    }
  }

  &__bottom {
    display: grid;
    grid-template-columns: auto auto;

    .change-location {
      grid-column: 1 / 3;
      border-bottom: 1px solid $black
    }
    p {
      padding: 20px 0;
    }
    div {
      padding: 20px 0;
      justify-self: right;
      font-weight: 700;
      font-size: 14px;

      a {
        padding-left: 20px
      }
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
}
</style>
