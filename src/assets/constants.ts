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
export const services: {title: string, text: string, backgroundUrl: string, link: string, qrCode?: boolean}[] = [
  {
    title: 'Your review matters',
    text: 'Let Your SkinTwins know Your Experience with this product.',
    backgroundUrl: 'product/sample-banner-1.png',
    link: '',
  },
  {
    title: 'SAMPLES FOR HONEST REVIEW',
    text: 'Get involved into New Product Review as qualified Tester',
    backgroundUrl: 'product/sample-banner-3.png',
    link: '',
  },
  {
    title: 'SPEAK OUT DIRECTLY TO THE BRAND',
    text: 'Direct line to pass Your Suggestions about this product to Brand.  We connect you with benefits Brand is ready to give in exchange to valuable suggestions.',
    backgroundUrl: 'product/sample-banner-5.png',
    link: '',
  },
  {
    title: 'BEAUTYMETER',
    text: 'Track Your Skin developments to evaluate efficiency of this product.',
    backgroundUrl: 'product/sample-banner-7.png',
    link: '',
  },
  {
    title: 'QUICK TRY WITH TESTERS',
    text: 'Testing Samples for You are available in your area',
    backgroundUrl: 'product/sample-banner-2.png',
    link: '',
  },
  {
    title: 'EXPIRY DATE CHECK',
    text: 'Scan Barcode and check expiry date',
    backgroundUrl: 'product/sample-banner-4.jpg',
    link: '',
  },
  {
    title: 'VIRTUAL DERMATOLOGIST SUPPORT',
    text: 'Video call support by DermoTeam is available related to this product.',
    backgroundUrl: 'product/sample-banner-6.png',
    link: '',
  },
  {
    title: 'SAVE IT TO YOUR LIBRARY',
    text: 'Scan QR code and safe this product for future into Your Personal Library',
    qrCode: true,
    backgroundUrl: 'product/sample-banner-8.png',
    link: '',
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
