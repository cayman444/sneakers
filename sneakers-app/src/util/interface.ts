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
  _id: string;
  title: string;
  price: string;
  mainImage: string;
  gallery: string[];
  video?: string;
  sizes: [{ string: number }];
  description: string;
  rating: number;
  chars: Chars;
}

export interface Options {
  min: string;
  max: string;
  gender: string[];
  sizes: number[];
}

export interface OrderInterface {
  date: string;
  orderId: string;
  orderProducts: [{ productId: string; productName: string; productPrice: string }];
  totalSum: string;
}
