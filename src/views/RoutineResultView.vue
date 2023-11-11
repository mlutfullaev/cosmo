<script lang="ts">
import { defineComponent } from 'vue'
import RoutineCard from '@/components/RoutineCard.vue'

export default defineComponent({
  components: { RoutineCard },
  data: () => ({
    routines: [
      {
        promoted: true,
        recommended: true,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: true,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: true,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: true,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: false,
        recommended: false,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 323,
        saves: 332,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: false,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: true,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: true,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: false,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: true,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
      {
        promoted: true,
        recommended: true,
        imgUrl: require('@/assets/img/routine/routine1.png'),
        likes: 423,
        saves: 232,
        sends: 14,
        title: 'Spring Nordinc Routine',
        authorName: 'Author',
        authorPhoto: require('@/assets/img/routine/authorIcon.svg'),
        rate: 3.5,
      },
    ]
  })
})
</script>

<template>
  <TheHeader/>
  <div class="routineResult">
    <div class="bg-img"></div>
    <div class="routineResult-top">
      <h1 class="title">Search Results for:</h1>
      <p class="txt-highlight">Oily skin person within 25-45 age range looking for hydration and cleansing acne
        products.</p>
      <p class="txt">Search Results for Oily skin person within 25-45 age range looking for hydration and cleansing acne
        products. Search Results for Oily skin person within 25-45 age range looking for hydration and cleansing acne
        products. Search Results for Oily skin person within 25-45 age range looking for hydration and cleansing acne
        products. Search Results for Oily skin person within 25-45 age range looking for hydration and cleansing acne
        products.</p>
    </div>
    <div class="routine-list">
      <RoutineCard
        v-for="routine in routines"
        :routine="routine"
        :key="routine.title"
      />
      <div class="routineResult-item bg-orange">
        <img src="@/assets/img/global/qr.png" class="min-tablet" alt="">
        <p class="txt">Your search shows more than 25 products which makes it difficult to make efficient research. We
          recommend you to narrow your search by using our AI Supported Beauty Product Search.</p>
        <p class="txt-highlight min-tablet">To start AI search please scan QR code</p>
        <RouterLink to="/" class="tablet link bold">start AI search <span>→</span></RouterLink>
      </div>
    </div>
    <div class="routineResult-steps">
      <div class="steps-text">
        <h1 class="title">Lorem ipsum dolor sit amet consectetur. Et lobortis pharetra</h1>
        <p class="txt">Lorem ipsum dolor sit amet consectetur. Sit mi tristique pulvinar porttitor. At sem lacus euismod
          non nibh nisi arcu sociis. Enim venenatis fermentum aliquam dolor. Eu cras tellus congue in id dignissim
          tortor sed donec. Tellus malesuada tortor nunc neque at. Ut in enim est aliquam ut id. Diam convallis erat
          eget elit volutpat eros. Elit mi pharetra nunc blandit lacinia nulla. Tempus arcu faucibus arcu justo libero
          aliquam lobortis. Praesent vel enim aenean id vel quis.</p>
      </div>
      <div class="steps-inner">
        <div class="steps-item">
          <h1 class="step">03</h1>
          <h3 class="title-secondary">STEPS</h3>
          <p class="txt">Achieve radiant skin with a simple 3-step beauty routine</p>
        </div>
        <div class="steps-item">
          <h1 class="step">05</h1>
          <h3 class="title-secondary">STEPS</h3>
          <p class="txt">Achieve radiant skin with a simple 5-step beauty routine</p>
        </div>
        <div class="steps-item">
          <h1 class="step">07</h1>
          <h3 class="title-secondary">STEPS</h3>
          <p class="txt">Achieve radiant skin with a simple 7-step beauty routine</p>
        </div>
        <div class="steps-item">
          <h1 class="step">10</h1>
          <h3 class="title-secondary">STEPS</h3>
          <p class="txt">Achieve radiant skin with a simple 10-step beauty routine</p>
        </div>
        <div class="steps-item">
          <h1 class="step">12</h1>
          <h3 class="title-secondary">STEPS</h3>
          <p class="txt">Achieve radiant skin with a simple 12-step beauty routine</p>
        </div>
      </div>
    </div>
    <div class="routineResult-bottom">
      <div class="bg-img d-center">
        <h1 class="title">We know more than 100 people with same skin as yours</h1>
      </div>
      <div class="content d-center">
        <img src="@/assets/img/global/qr.png" class="min-tablet" alt="">
        <p class="title-secondary bold min-phone">scan qr code to know their experience</p>
        <p class="txt">We collect Beauty Products details from Brands, Retailers and other users for You to receive
          maximum details about products and experiences Your SkinTwins had with this product.</p>
        <RouterLink class="link tablet bold" to="/">explore their experience <span>→</span></RouterLink>
      </div>
    </div>
  </div>
  <TheFooter/>
</template>

<style lang="scss" scoped>
.routineResult {
  .bg-img {
    width: 100%;
    height: 400px;
    background-image: url(@/assets/img/routine/filterbg.jpeg);
  }

  &-top {
    padding: 60px;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
    color: $dark-blue;

    .txt-highlight {
      padding-bottom: 20px;
      max-width: 500px;
      margin: 0 auto;
    }

    @media screen and (max-width: 480px) {
      padding: 40px 20px;
    }
  }

  &-inner {
    //display: grid;
    //grid-template-columns: repeat(4, 1fr);
    //border-top: 1px solid $black;
    //grid-gap: 60px 20px;
    //padding: 0 60px 60px;

    .routineResult-item {
      height: 480px;
      padding: 60px;

      p.txt {
        padding: 10px 0;
      }

      @media screen and (max-width: 1440px) {
        height: 350px;
        padding: 20px
      }
      @media screen and (max-width: 1240px) {
        height: 300px;

        img {
          width: 60px;
        }
      }
      @media screen and (max-width: 1000px) {
        height: 400px;
      }
      @media screen and (max-width: 768px) {
        height: 350px;
      }
      @media screen and (max-width: 480px) {
        height: max-content;
      }
    }

    @media screen and (max-width: 1440px) {
      padding: 0 20px 40px;
    }
    @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @media screen and (max-width: 786px) {
      .routineCard:nth-child(8), .routineCard:nth-child(9), .routineCard:nth-child(10), .routineCard:nth-child(11) {
        display: none;
      }
    }
    @media screen and (max-width: 480px) {
      padding: 0;
      grid-template-columns: 1fr;

      .routineCard {
        padding: 0 20px;
      }
    }
  }

  &-steps {
    max-width: 1500px;
    margin: 0 auto;
    padding: 120px 60px;

    .steps-text {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .steps-inner {
      display: grid;
      grid-template-columns: repeat(5, auto);
      justify-content: space-between;
      gap: 30px;
      padding: 30px 0;

      .steps-item {
        text-align: center;
        max-width: 210px;
      }

      @media screen and (max-width: 1340px) {
        gap: 20px;
      }
      @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
        justify-items: center;
      }
    }

    @media screen and (min-width: 1850px) {
      max-width: 1800px;
    }
    @media screen and (max-width: 1340px) {
      padding: 100px 30px;
    }
    @media screen and (max-width: 480px) {
      padding: 50px 30px;
    }
  }

  &-bottom {
    display: grid;
    height: 600px;
    grid-template-columns: 1fr 1fr;
    text-align: center;

    .bg-img {
      padding: 60px;
      background-image: url('@/assets/img/global/girls-smiling.png');
      color: #fff;

      @media screen and (max-width: 900px) {
        padding: 20px;
      }
    }

    .content {
      flex-direction: column;
      gap: 20px;
      padding: 60px;

      @media screen and (max-width: 900px) {
        padding: 20px;
      }
    }

    @media screen and (max-width: 100px) {
      height: 500px;
    }
    @media screen and (max-width: 768px) {
      height: 400px;
    }
    @media screen and (max-width: 480px) {
      height: max-content;
      grid-template-columns: 1fr;

      .content {
        align-items: start;
        text-align: left;
      }
    }
  }
}
</style>
