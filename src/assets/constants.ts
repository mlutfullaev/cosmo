export const productFilters = {
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
}
export const routineFilters = {
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
export const samples = [
  {
    title: 'SEPHORA',
    text: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now. In the Store or at home. Anything You wanted to know about this product now.',
  },
  {
    title: 'DOUGLAS',
    text: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now. In the Store or at home. Anything You wanted to know about this product now.',
  },
  {
    title: 'BRUNI',
    text: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now. In the Store or at home. Anything You wanted to know about this product now.',
  },
  {
    title: 'LOOKFANTASTIC',
    text: 'Your AI Beauty Assistant is always here for Your needs to make quick search or fetch details of the specific product you have in hand now. In the Store or at home. Anything You wanted to know about this product now.',
  },
]

export const API_URL = 'https://api-www.beautyid.app/'

export const emptyRes = {
  data: [],
  meta: {
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  }
}
