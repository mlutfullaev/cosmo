import { createStore } from 'vuex'

export default createStore({
  state: {
    productSearch: '',
    beauty: true,
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
      benefits: {
        title: 'benefits',
        items: ['Anti-age', 'Anti-wrinkle', 'Hydration', 'brightness', 'UV-protection', 'Cleansing']
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
  },
  actions: {
  },
  modules: {
  }
})
