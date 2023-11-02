<script lang="ts">
import { defineComponent } from 'vue'
import AiAssistance from '@/components/AiAssistance.vue'
import BaseRate from '@/components/BaseRate.vue'
import ProductCard from '@/components/ProductCard.vue'
import BaseReviews from '@/components/BaseReviews.vue'
import { Carousel, Slide } from 'vue3-carousel'
import BeforeAfter from '@/components/BeforeAfter.vue'

export default defineComponent({
  components: { BeforeAfter, Carousel, Slide, BaseReviews, ProductCard, BaseRate, AiAssistance },
  data: () => ({
    beauty: true,
    steps: [
      {
        title: 'Cleansing',
        text: 'Gently massage the cleanser onto '
      },
      {
        title: 'Cleansing',
        text: 'Gently massage the cleanser onto '
      },
      {
        title: 'Cleansing',
        text: 'Gently massage the cleanser onto '
      },
      {
        title: 'Cleansing',
        text: 'Gently massage the cleanser onto '
      },
      {
        title: 'Cleansing',
        text: 'Gently massage the cleanser onto '
      },
      {
        title: 'Cleansing',
        text: 'Gently massage the cleanser onto '
      },
      {
        title: 'Cleansing',
        text: 'Gently massage the cleanser onto '
      },
      {
        title: 'Cleansing',
        text: 'Gently massage the cleanser onto '
      },
    ],
    currentStep: 2,
    routineItems: [
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: false,
        rate: 4.5,
        id: 1,
      },
      {
        title: 'GlowBotanica Beauty Serum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: false,
        recommended: true,
        rate: 3.5,
        id: 2,
      },
      {
        title: 'LunaDew Moisturizing Night Cream',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 3,
        id: 3,
      },
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 2.5,
        id: 4,
      },
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: false,
        recommended: true,
        rate: 2,
        id: 5,
      },
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 4,
        id: 6,
      },
      {
        title: 'GlowBotanica Beauty Serum',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 3.5,
        id: 7,
      },
      {
        title: 'LunaDew Moisturizing Night Cream',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 3,
        id: 8,
      },
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 2.5,
        id: 9,
      },
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 5,
        id: 10,
      },
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 2.5,
        id: 11,
      },
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'product/product.png',
        promoted: true,
        recommended: true,
        rate: 5,
        id: 12,
      },
    ],
    activeRoutineItem: 0,
    alternativeItems: [
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'routine/alternative-1.png',
        promoted: true,
        recommended: false,
        rate: 4.5,
        id: 1,
      },
      {
        title: 'GlowBotanica Beauty Serum',
        price: 'from $ 180',
        imgUrl: 'routine/alternative-2.png',
        promoted: false,
        recommended: true,
        rate: 3.5,
        id: 2,
      },
      {
        title: 'LunaDew Moisturizing Night Cream',
        price: 'from $ 180',
        imgUrl: 'routine/alternative-3.png',
        promoted: true,
        recommended: true,
        rate: 3,
        id: 3,
      },
      {
        title: 'PureRadiance Cleansing Oil',
        price: 'from $ 180',
        imgUrl: 'routine/alternative-4.png',
        promoted: true,
        recommended: true,
        rate: 2.5,
        id: 4,
      },
    ]
  }),
  methods: {
    prev () {
      this.currentStep = this.currentStep < 3 ? this.steps.length - 1 : this.currentStep - 1
    },
    next () {
      this.currentStep = this.currentStep < this.steps.length - 3 ? this.currentStep + 1 : 0
    },
  }
})
</script>

<template>
  <TheHeader />
  <main class="main">
    <div class="main-image bg-img">
      <div class="product-author">
        <img src="@/assets/img/global/author.png" alt="author">
        <p>author</p>
        <button>YOUR SKINTWIN</button>
      </div>
      <BaseRate :rates="4.5" :text="true"/>
      <div class="product-icons">
        <div class="product-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
            <path d="M13.9326 21.8989C13.5505 22.0337 12.9213 22.0337 12.5393 21.8989C9.28089 20.7865 2 16.1461 2 8.28089C2 4.80898 4.79775 2 8.24718 2C10.2921 2 12.1011 2.98876 13.2359 4.51685C14.3708 2.98876 16.191 2 18.2247 2C21.6741 2 24.4719 4.80898 24.4719 8.28089C24.4719 16.1461 17.191 20.7865 13.9326 21.8989Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>623 beauties</p>
        </div>
        <div class="product-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
            <path d="M19.8412 5.85849V19.9526C19.8412 21.7516 18.5509 22.5084 16.9752 21.6399L12.0993 18.9229C11.5783 18.6375 10.7346 18.6375 10.2135 18.9229L5.33764 21.6399C3.76198 22.5084 2.47168 21.7516 2.47168 19.9526V5.85849C2.47168 3.73694 4.20862 2 6.33017 2H15.9827C18.1042 2 19.8412 3.73694 19.8412 5.85849Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>143 added</p>
        </div>
      </div>
      <p class="recommended" :class="{active: false}">recommended</p>
      <p class="promoted" :class="{active: true}">promoted</p>
    </div>
    <div class="main-content">
      <h2 class="title">Spring Revitalising Routine</h2>
      <p class="txt">Personalized Beauty Routine for Individuals for scandic people with oily problematic skin</p>
      <div class="main-icons">
        <div class="main-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="53" viewBox="0 0 52 53" fill="none">
            <g clip-path="url(#clip0_605_3390)">
              <path d="M25.9938 11.8589C34.1019 11.8501 40.7755 18.6527 40.7521 26.9C40.7288 35.1587 34.1068 41.896 26.0061 41.9036C17.8968 41.9111 11.2257 35.1123 11.2491 26.8624C11.2724 18.6025 17.8919 11.8677 25.9938 11.8589Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M30.5969 44.2852C29.0443 47.0657 27.5459 49.7509 25.9995 52.5213C24.4519 49.7496 22.951 47.0632 21.3984 44.2827C24.4949 45.1092 27.5016 45.108 30.5969 44.2852Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M43.0752 31.5505C43.8914 28.4239 43.9 25.3938 43.0789 22.2446C45.8029 23.8148 48.4322 25.3311 51.1464 26.8963C48.4384 28.4577 45.8053 29.9765 43.0752 31.5505Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M0.854492 26.8825C3.57112 25.3135 6.19923 23.796 8.91094 22.2296C8.10579 25.3537 8.0935 28.3988 8.91832 31.5379C6.20415 29.9702 3.57726 28.4552 0.855721 26.8825H0.854492Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M30.5404 9.48101C27.4832 8.65703 24.522 8.65327 21.46 9.48101C22.9891 6.7043 24.4704 4.01789 25.9996 1.24243C27.525 4.00911 29.0038 6.69176 30.5404 9.47976V9.48101Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M10.686 35.8961C12.3184 38.7042 14.4389 40.8337 17.1776 42.5055C14.1685 43.3308 11.2773 44.1247 8.29883 44.9424C9.09783 41.9123 9.87594 38.9663 10.686 35.8961Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M41.3124 35.8961C42.1225 38.9575 42.8994 41.8985 43.7033 44.9399C40.7359 44.1272 37.8324 43.3308 34.8232 42.5068C37.5558 40.835 39.6849 38.7105 41.3124 35.8961Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M43.7123 8.85645C42.9047 11.8903 42.1217 14.83 41.3129 17.8688C39.6915 15.1172 37.5969 12.9588 34.8643 11.3033C37.8611 10.4743 40.74 9.67917 43.7123 8.85645Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M10.6885 17.8738C9.8784 14.8162 9.10029 11.8815 8.29883 8.85516C11.2453 9.66786 14.1205 10.4605 17.1113 11.2857C14.4192 12.94 12.3025 15.057 10.6885 17.8751V17.8738Z" stroke="black" stroke-miterlimit="10"/>
            </g>
            <defs>
              <clipPath id="clip0_605_3390">
                <rect width="51" height="52" fill="white" transform="translate(0.5 0.880005)"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="main-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="53" viewBox="0 0 52 53" fill="none">
            <g clip-path="url(#clip0_605_3390)">
              <path d="M25.9938 11.8589C34.1019 11.8501 40.7755 18.6527 40.7521 26.9C40.7288 35.1587 34.1068 41.896 26.0061 41.9036C17.8968 41.9111 11.2257 35.1123 11.2491 26.8624C11.2724 18.6025 17.8919 11.8677 25.9938 11.8589Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M30.5969 44.2852C29.0443 47.0657 27.5459 49.7509 25.9995 52.5213C24.4519 49.7496 22.951 47.0632 21.3984 44.2827C24.4949 45.1092 27.5016 45.108 30.5969 44.2852Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M43.0752 31.5505C43.8914 28.4239 43.9 25.3938 43.0789 22.2446C45.8029 23.8148 48.4322 25.3311 51.1464 26.8963C48.4384 28.4577 45.8053 29.9765 43.0752 31.5505Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M0.854492 26.8825C3.57112 25.3135 6.19923 23.796 8.91094 22.2296C8.10579 25.3537 8.0935 28.3988 8.91832 31.5379C6.20415 29.9702 3.57726 28.4552 0.855721 26.8825H0.854492Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M30.5404 9.48101C27.4832 8.65703 24.522 8.65327 21.46 9.48101C22.9891 6.7043 24.4704 4.01789 25.9996 1.24243C27.525 4.00911 29.0038 6.69176 30.5404 9.47976V9.48101Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M10.686 35.8961C12.3184 38.7042 14.4389 40.8337 17.1776 42.5055C14.1685 43.3308 11.2773 44.1247 8.29883 44.9424C9.09783 41.9123 9.87594 38.9663 10.686 35.8961Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M41.3124 35.8961C42.1225 38.9575 42.8994 41.8985 43.7033 44.9399C40.7359 44.1272 37.8324 43.3308 34.8232 42.5068C37.5558 40.835 39.6849 38.7105 41.3124 35.8961Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M43.7123 8.85645C42.9047 11.8903 42.1217 14.83 41.3129 17.8688C39.6915 15.1172 37.5969 12.9588 34.8643 11.3033C37.8611 10.4743 40.74 9.67917 43.7123 8.85645Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M10.6885 17.8738C9.8784 14.8162 9.10029 11.8815 8.29883 8.85516C11.2453 9.66786 14.1205 10.4605 17.1113 11.2857C14.4192 12.94 12.3025 15.057 10.6885 17.8751V17.8738Z" stroke="black" stroke-miterlimit="10"/>
            </g>
            <defs>
              <clipPath id="clip0_605_3390">
                <rect width="51" height="52" fill="white" transform="translate(0.5 0.880005)"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="main-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="53" viewBox="0 0 52 53" fill="none">
            <g clip-path="url(#clip0_605_3390)">
              <path d="M25.9938 11.8589C34.1019 11.8501 40.7755 18.6527 40.7521 26.9C40.7288 35.1587 34.1068 41.896 26.0061 41.9036C17.8968 41.9111 11.2257 35.1123 11.2491 26.8624C11.2724 18.6025 17.8919 11.8677 25.9938 11.8589Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M30.5969 44.2852C29.0443 47.0657 27.5459 49.7509 25.9995 52.5213C24.4519 49.7496 22.951 47.0632 21.3984 44.2827C24.4949 45.1092 27.5016 45.108 30.5969 44.2852Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M43.0752 31.5505C43.8914 28.4239 43.9 25.3938 43.0789 22.2446C45.8029 23.8148 48.4322 25.3311 51.1464 26.8963C48.4384 28.4577 45.8053 29.9765 43.0752 31.5505Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M0.854492 26.8825C3.57112 25.3135 6.19923 23.796 8.91094 22.2296C8.10579 25.3537 8.0935 28.3988 8.91832 31.5379C6.20415 29.9702 3.57726 28.4552 0.855721 26.8825H0.854492Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M30.5404 9.48101C27.4832 8.65703 24.522 8.65327 21.46 9.48101C22.9891 6.7043 24.4704 4.01789 25.9996 1.24243C27.525 4.00911 29.0038 6.69176 30.5404 9.47976V9.48101Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M10.686 35.8961C12.3184 38.7042 14.4389 40.8337 17.1776 42.5055C14.1685 43.3308 11.2773 44.1247 8.29883 44.9424C9.09783 41.9123 9.87594 38.9663 10.686 35.8961Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M41.3124 35.8961C42.1225 38.9575 42.8994 41.8985 43.7033 44.9399C40.7359 44.1272 37.8324 43.3308 34.8232 42.5068C37.5558 40.835 39.6849 38.7105 41.3124 35.8961Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M43.7123 8.85645C42.9047 11.8903 42.1217 14.83 41.3129 17.8688C39.6915 15.1172 37.5969 12.9588 34.8643 11.3033C37.8611 10.4743 40.74 9.67917 43.7123 8.85645Z" stroke="black" stroke-miterlimit="10"/>
              <path d="M10.6885 17.8738C9.8784 14.8162 9.10029 11.8815 8.29883 8.85516C11.2453 9.66786 14.1205 10.4605 17.1113 11.2857C14.4192 12.94 12.3025 15.057 10.6885 17.8751V17.8738Z" stroke="black" stroke-miterlimit="10"/>
            </g>
            <defs>
              <clipPath id="clip0_605_3390">
                <rect width="51" height="52" fill="white" transform="translate(0.5 0.880005)"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <p class="txt">Estimate budget in your area:</p>
      <p class="txt bold">130 EURO</p>
      <div class="main-verified">
        <div class="main-verified-item bg-orange">
          <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
            <path d="M58.6957 33.0003L53.0105 26.48L53.8135 17.8397L45.3659 15.9125L40.9655 8.46066L32.9997 11.8975L25.0661 8.46066L20.6335 15.9125L12.2181 17.8397L13.0211 26.48L7.30371 33.0003L12.989 39.5207L12.186 48.161L20.6335 50.0882L25.034 57.54L32.9997 54.0711L40.9333 57.5079L45.3338 50.0561L53.7813 48.1289L52.9783 39.4886L58.6957 33.0003ZM28.4708 42.8612L21.6614 36.0517L23.9419 33.7712L28.4708 38.3001L42.0897 24.6813L44.3702 26.9618L28.4708 42.8612Z" fill="white"/>
          </svg>
          <h3>LUX</h3>
          <h4>Verified</h4>
        </div>
        <div class="main-verified-item">
          <h2 class="title-secondary">15%</h2>
          <p>less wrinkles AFTER 3 MONTHS</p>
        </div>
        <div class="main-verified-item">
          <h2 class="title-secondary">34%</h2>
          <p>Enhances skin radiance</p>
        </div>
      </div>
    </div>
  </main>
  <section v-if="!beauty" class="steps">
    <div class="steps-inner">
      <div
        class="steps-inner-item"
        v-for="(step, index) in steps.slice(0, 4)"
        :key="step.title">
        <div class="step-content">
          <h2>{{step.title}}</h2>
          <p>{{step.text}}</p>
        </div>
        <h1 class="step">0{{index + 1}}</h1>
      </div>
      <div class="steps-inner-item">
        <div class="step-content qr">
          <img src="@/assets/img/global/qr.png" alt="qr-code">
          <p class="txt-highlight">scan qr code to get the full description of this routine</p>
        </div>
        <h1>05</h1>
      </div>
    </div>
    <div class="steps-bg"></div>
    <div class="steps-alert">
      <p class="txt-highlight">Share this Routine with Friends</p>
      <p class="txt">Make Routine. Share Signup to be the first to hear about exclusive deals,special offers and upcoming collections</p>
    </div>
  </section>
  <section v-else class="steps">
    <Carousel
      id="carousel"
      :items-to-show="5"
      :wrap-around="false"
      v-model="currentStep">
      <Slide class="steps-inner-item" v-for="(step, idx) in steps" :key="step.title">
        <div class="step-content">
          <h2>{{step.title}}</h2>
          <p>{{step.text}}</p>
        </div>
        <h1 class="step">0{{idx + 1}}</h1>
      </Slide>
    </Carousel>
    <div class="navigation">
      <button @click="prev" class="prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="23" viewBox="0 0 102 23" fill="none">
          <path d="M0.939339 10.2427C0.353554 10.8285 0.353554 11.7782 0.939339 12.364L10.4853 21.9099C11.0711 22.4957 12.0208 22.4957 12.6066 21.9099C13.1924 21.3242 13.1924 20.3744 12.6066 19.7886L4.12132 11.3033L12.6066 2.81806C13.1924 2.23227 13.1924 1.28252 12.6066 0.696735C12.0208 0.110948 11.0711 0.110948 10.4853 0.696735L0.939339 10.2427ZM102 9.80334L2 9.80334L2 12.8033L102 12.8033L102 9.80334Z" fill="black"/>
        </svg>
      </button>
      <button @click="next" class="next">
        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="23" viewBox="0 0 102 23" fill="none">
          <path
            d="M101.061 12.364C101.646 11.7782 101.646 10.8285 101.061 10.2427L91.5147 0.696743C90.9289 0.110956 89.9792 0.110956 89.3934 0.696743C88.8076 1.28253 88.8076 2.23228 89.3934 2.81806L97.8787 11.3033L89.3934 19.7886C88.8076 20.3744 88.8076 21.3242 89.3934 21.9099C89.9792 22.4957 90.9289 22.4957 91.5147 21.9099L101.061 12.364ZM0 12.8033H100V9.80334H0V12.8033Z"
            fill="black"/>
        </svg>
      </button>
    </div>
    <div class="steps-alert">
      <p class="note">add to your library</p>
      <div class="d-center">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M56.6667 31H3.33333C1.51111 31 0 30.32 0 29.5C0 28.68 1.51111 28 3.33333 28H56.6667C58.4889 28 60 28.68 60 29.5C60 30.32 58.4889 31 56.6667 31Z" fill="black"/>
            <path d="M30.5 60C29.68 60 29 58.4889 29 56.6667V3.33333C29 1.51111 29.68 0 30.5 0C31.32 0 32 1.51111 32 3.33333V56.6667C32 58.4889 31.32 60 30.5 60Z" fill="black"/>
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M16.4635 12.8175L45.1372 3.25964C58.0049 -1.02959 64.996 5.99529 60.7405 18.863L51.1826 47.5365C44.7657 66.8212 34.2283 66.8212 27.8114 47.5365L24.9744 39.0256L16.4635 36.1886C-2.82116 29.7717 -2.82116 19.2683 16.4635 12.8175Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25.6172 37.5739L37.7081 25.4493" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
  <section class="items">
    <div class="items-content">
      <h2 class="title">Beauty Products Used in This Routine</h2>
      <div
        class="items-content-element"
        :class="{active: activeRoutineItem === idx}"
        v-for="(item, idx) in routineItems"
        :key="item.id">
        <button
          class="txt-highlight"
          @click="activeRoutineItem = idx"
        >0{{idx + 1}} {{item.title}}</button>
        <router-link :to="`/single-product/${item.id}`" class="link bold">FIND ALTERNATIVE <span>→</span></router-link>
      </div>
    </div>
    <div class="items-product">
      <ProductCard :card="routineItems[activeRoutineItem]" />
<!--      <div v-else>-->
<!--        -->
<!--      </div>-->
    </div>
  </section>
  <section class="reviews">
    <div v-if="!beauty" class="reviews-item d-center bg-orange">
      <div class="scan">
        <img src="@/assets/img/global/qr.png" alt="">
        <div class="scan-content">
          <p class="title-secondary bold">scan qr code to Make most from routine Page</p>
          <p class="txt">People with the same age group, ethnicity origin, skin conditions and concerns are your SkinTwins and you to see their experiences with {ROUTINE NAME}.</p>
        </div>
      </div>
    </div>
    <div v-else class="reviews-img bg-img"></div>
    <BaseReviews />
  </section>
  <div v-if="beauty" class="progress">
    <div class="progress-text">
      <h1 class="title">Check Your Progress</h1>
      <p class="txt">People with the same age group, ethnicity origin, skin conditions and concerns are your SkinTwins .  Use their experiences to make smart beauty decisions.</p>
    </div>
    <BeforeAfter />
  </div>
  <section class="alternative">
    <h2 class="title">Alternative Routines based on targets and applications</h2>
    <div class="alternative-inner">
      <div class="alternative-inner-item bg-img" :style="{backgroundImage: `url('${require(`@/assets/img/${alternativeItems[0].imgUrl}`)}`}">
        <div class="product-author">
          <img src="@/assets/img/global/author.png" alt="author">
          <p>author</p>
          <button>YOUR SKINTWIN</button>
        </div>
        <BaseRate :rates="alternativeItems[0].rate" :text="true"/>
        <div class="product-content">
            <p class="txt bold">Spring Nordinc Routine</p>
            <p class="txt">Estimated Budget from $ 180</p>
      </div>
        <div class="product-icons">
          <div class="product-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
              <path d="M13.9326 21.8989C13.5505 22.0337 12.9213 22.0337 12.5393 21.8989C9.28089 20.7865 2 16.1461 2 8.28089C2 4.80898 4.79775 2 8.24718 2C10.2921 2 12.1011 2.98876 13.2359 4.51685C14.3708 2.98876 16.191 2 18.2247 2C21.6741 2 24.4719 4.80898 24.4719 8.28089C24.4719 16.1461 17.191 20.7865 13.9326 21.8989Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>623 beauties</p>
          </div>
          <div class="product-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
              <path d="M19.8412 5.85849V19.9526C19.8412 21.7516 18.5509 22.5084 16.9752 21.6399L12.0993 18.9229C11.5783 18.6375 10.7346 18.6375 10.2135 18.9229L5.33764 21.6399C3.76198 22.5084 2.47168 21.7516 2.47168 19.9526V5.85849C2.47168 3.73694 4.20862 2 6.33017 2H15.9827C18.1042 2 19.8412 3.73694 19.8412 5.85849Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>143 added</p>
          </div>
        </div>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="34" viewBox="0 0 36 34" fill="none">
            <path d="M33.8351 22.2065L24.4531 31.6073" stroke="#fff" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 22.2065H33.8352" stroke="#fff" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 11.0082L11.382 1.60742" stroke="#fff" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M33.8352 11.0083H2" stroke="#fff" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <p class="recommended" :class="{active: alternativeItems[0].recommended}">recommended</p>
        <p class="promoted" :class="{active: alternativeItems[0].promoted}">promoted</p>
      </div>
      <ProductCard
        v-for="alternativeItem in alternativeItems.slice(1)"
        :card="alternativeItem"
        :key="alternativeItem.id"
        :bg-img="true" />
      <div class="alternative-inner-item d-center">
        <RouterLink to="/" class="link bold">See more Routines <span>→</span></RouterLink>
      </div>
    </div>
  </section>
  <AiAssistance v-if="!beauty" />
  <TheFooter />
</template>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 62px);

  &-image {
    background-image: url("@/assets/img/routine/main-img.png");
    position: relative;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-content: space-between;
    padding: 30px;
  }
  &-content {
    display: grid;
    align-content: center;
    justify-content: center;
    gap: 20px;
    text-align: center;

    .main-icons {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: center;
    }
    .main-verified {
      width: max-content;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(3, auto);
      border: 1px solid $black;

      &-item {
        width: 100%;
        padding: 20px;

        .title-secondary {
          padding-bottom: 10px;
          border-bottom: 1px solid $black
        }
        h3 {
          color: #fff;
          font-size: 32px;
          font-weight: 700;
          text-transform: uppercase;
        }
        h4 {
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
        }
        p {
          padding-top: 10px;
          text-transform: uppercase;
          font-size: 14px;
          max-width: 120px;
          font-weight: 700;
          line-height: 20px;
        }
      }
    }
  }
}
.steps {
  position: relative;
  display: grid;
  padding: 60px;
  align-content: center;
  justify-content: center;

  &-inner {
    display: grid;
    align-items: center;
    text-align: center;
    grid-template-columns: repeat(5, 200px);
    gap: 40px;
  }
  #carousel {
    max-width: calc(100% - 120px);
    margin: 100px auto;
    position: relative;
  }
  .navigation button {
    position: absolute;
    top: 50%;
    &.prev {
      left: 20px;
    }
    &.next {
      right: 20px;
    }
  }
  .steps-inner-item {
    display: grid;
    gap: 10px;
    grid-template-rows: 1fr auto 1fr;

    &:nth-child(even) {
      h1 {
        grid-row: 2
      }
      .step-content {
        grid-row: 3;
      }
    }
    .step-content.qr {
      position: relative;
      z-index: 1;
    }
  }
  &-alert {
    max-width: 500px;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 20px;

    p:first-child {
      padding-bottom: 10px;
    }
    .note {
      font-size: 14px;
      text-transform: uppercase;
      text-align: left;
    }
    .d-center {
      gap: 20px;
      padding: 10px;
    }
  }
  &-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 50%;
    backdrop-filter: blur(5px);
    content: '';
    height: 100%;
  }
}
.items {
  display: grid;
  border-top: 1px solid $black;
  grid-template-columns: 1fr 1fr;

  &-content {
    padding: 40px;

    &-element {
      display: grid;
      justify-content: left;
      justify-items: left;
      padding: 20px 0;
      overflow: hidden;
      height: 20px;
      transition: .3s;

      .txt-highlight {
        color: $grey-dark;
        transition: .3s;
        padding-bottom: 10px;
      }
      &:first-child {
        padding-top: 50px;
      }
      &.active {
        height: max-content;
        padding: 50px 0;

        button {
          color: $orange;
        }
      }
    }
  }
  &-product {
    padding: 60px;
    background: $orange;

    .product-card {
      background: $white;
    }
  }
}
.reviews {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 700px;

  &-item {
    padding: 60px;
    .scan {
      grid-template-columns: auto;
    }
  }
  .base-reviews {
    gap: 50px;
  }
  &-img {
    background-image: url('@/assets/img/global/girls-smiling.png');
  }
}
.alternative {
  padding-top: 120px;

  .title {
    text-align: center;
    padding-bottom: 20px;
  }
  &-inner {
    padding-top: 20px;
    display: grid;
    grid-template-rows: 300px 300px;
    grid-template-columns: repeat(4, 1fr);

    &-item {
      display: grid;
      padding: 30px;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: auto auto;

      p {
        color: #fff;
      }
      .product-content {
        grid-column: 1 / 3;
        display: grid;
        align-content: end;
        padding: 20px 0;
      }
      button {
        justify-self: end;
      }
      &:first-child {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
      }
      &:last-child {
        display: flex;
        a {
          width: max-content;
          max-width: 150px;
        }
      }
    }
  }
}
.progress {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &-text {
    display: grid;
    align-content: end;
    padding: 30px;
    border-bottom: 1px solid $black;

    h1 {
      padding-bottom: 20px;
    }
  }
}
</style>
