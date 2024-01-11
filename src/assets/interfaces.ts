export interface Product {
  id: number;
  name: string;
  brand: string;
  mainPicture: string;
  description: string;
  skinTypes?: string;
  pictures: string;
  manual?: string;
  storage?: string;
  warning?: string;
  concerns?: string;
  certificates?: string;
  religionDietsIds?: string;
  ingredients: string;
  benefits: string;
  goodRating: number;
  SEOmainImageAlt: string;
  SEOpageKeywords: string;
  SEOpageDescription: string;
  SEOpageTitle: string;
}

export interface Routine {
  genderName: string,
  skinTypeName: string,
  sensitivityName: string,
  routineName: string,
  routineDescription: string,
  idRoutineAuthor: 0,
  authorImage: string,
  authorName: string,
  authorRank: string,
  routineAge: string,
  routineAgeAvoid: string,
  raceName: string,
  seasonName: string,
  routineUseRcommendations: string,
  routineMelanin: string,
  routineAllergy: string,
  routineSkinDisorders: string,
  routineLifeStates: string,
  routineTargetedConcerns: string,
  routineBenefits: string,
  routineWarnings: string,
  forSearch: string,
  uploadTag: string,
  id: number,
  SEOimageAlt: string,
  SEOhoverText: string,
}

export type StringObject = {
  [key: string]: string;
}

export interface Review {
  id: number;
  reviewUser: string;
  reviewText: string;
  reviewRating: number;
}

export interface Variant {
  text: string,
  param: string,
  id: number,
}

export interface Filter {
  [key: string]: {
    title: string,
    subtitle: string,
    variants: Variant[],
    selectedVariant: string | number
  }
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface BasicResponse<T> {
  meta: Meta,
  data: T[]
}

export interface Login {
  username: string,
  expiresIn: string,
  accessToken: string
}
