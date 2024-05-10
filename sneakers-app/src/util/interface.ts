export interface ElementParams {
  tag: string;
  classNames: string[];
  textContent: string;
}
interface Chars {
  gender: string[];
  color: string;
  country: string;
  compound: string;
}
export interface ElementProduct {
  id: number;
  title: string;
  price: string;
  mainImage: string;
  gallery: string[];
  video: string;
  sizes: number[];
  description: string;
  chars: Chars;
}

export interface Options {
  min: string;
  max: string;
  gender: string[];
  sizes: number[];
}
