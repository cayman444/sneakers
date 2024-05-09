export interface ElementParams {
  tag: string;
  classNames: string[];
  textContent: string;
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
  chars: { [key: string]: string };
}
