export interface Product {
  name: string;
  brand: string;
  mainPicture: string;
  description: string;
  id: number,
  pictures: string;
  manual: string;
  ingredients: string;
  benefits: string;
  goodRating: number;
}


export type StringObject = {
  [key: string]: string;
}