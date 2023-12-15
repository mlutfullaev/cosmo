import { createStore } from 'vuex'
import auth from './auth'

export default createStore({
  state: {
    productSearch: '',
    beauty: false,
    productFilters: {
      productCategory: {
        title: 'product category',
        items: ['Cleanser', 'Toners', 'Serums', 'Creams', 'Oils', 'Scrubs', 'Masks', 'Body Care']
      },
      steps: {
        title: 'steps',
        items: ['Remove makeup', 'Cleansing', 'Treat', 'Moisture', 'Protect']
      },
      occasion: {
        title: 'OCCASION OF USE',
        items: ['Morning (AM)', 'Evening ( PM)', 'Special']
      },
      season: {
        title: 'SEASON OF USE',
        items: ['Summer', 'Winter', 'Spring - Summer', 'Aughtom - Winter', 'All Year Around']
      },
      rangePrice: {
        title: 'price range',
        items: ['']
      },
      benefits: {
        title: 'benefits',
        items: ['Anti-age', 'Anti-wrinkle', 'Hydration', 'brightness', 'UV-protection', 'Cleansing']
      },
      ingredients: {
        title: 'Ingredients',
        items: ['AHA-acid', 'BHA-acid', 'PHA-acid', 'Ceramides', 'Hyaluronic Acid', 'Retinol', 'Vitamin C', 'Peptides', 'Niacinamide']
      },
    },
    routineFilters: {
      allConcerns: {
        title: 'ALL CONCERNS',
        items: ['Acne', 'Wrinckles', 'Dark Spots', 'Dull skin']
      },
      occasion: {
        title: 'OCCASION OF USE',
        items: ['Morning (AM)', 'Evening ( PM)', 'Special']
      },
      season: {
        title: 'SEASON OF USE',
        items: ['Summer', 'Winter', 'Spring - Summer', 'Aughtom - Winter', 'All Year Around']
      },
      routineBudget: {
        title: 'routine budget',
        items: []
      },
      stepsNumber: {
        title: 'number of steps',
        items: ['3-step routine', '5-step routine', '7-step routine', '9-step routine', '10-step routine', '12-step routine']
      },
      ingredients: {
        title: 'Ingredients',
        items: ['AHA-acid', 'BHA-acid', 'PHA-acid', 'Ceramides', 'Hyaluronic Acid', 'Retinol', 'Vitamin C', 'Peptides', 'Niacinamide']
      },
    }
  },
  getters: {
  },
  mutations: {
    updatingProductSearch (state, value) {
      state.productSearch = value
    },
    checkBeauty (state) {
      state.beauty = true
    }
  },
  actions: {
  },
  modules: {
    auth,
  }
})
