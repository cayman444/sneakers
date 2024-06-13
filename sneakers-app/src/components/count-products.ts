import { ElementProduct } from '../util/interface';
import ModalCartRender from './modalCartRender';

class CountProducts {
  static products: ElementProduct[] | undefined;

  constructor(products?: ElementProduct[]) {
    CountProducts.products = products;
    CountProducts.cartCounter();
    CountProducts.cartItems();
  }

  static cartCounter() {
    const totalInCart = localStorage.getItem('totalInCart');
    const cartCounter = <HTMLElement>document.querySelector('.header__card-decor');
    if (totalInCart) {
      cartCounter.textContent = totalInCart;
    }
  }

  static cartItems() {
    const productCart = localStorage.getItem('productInCart');
    const modalCartItems = document?.querySelector('.cart-product__items');
    const productsCatalog = document.querySelector('.products-item__cards');

    if (!productCart) return;

    const products = <ElementProduct[]>CountProducts.products;

    const totalProducts: ElementProduct[] = JSON.parse(productCart).reduce(
      (acc: ElementProduct[], product: { key: string }) => {
        const currentAcc = acc;
        for (let i = 0; i < products!.length; i += 1) {
          if (products[i]._id === Object.values(product)[0]) {
            currentAcc.push(products[i]);
          }
        }
        return currentAcc;
      },
      []
    );

    const total: string[] = [];
    const productId: string[] = [];

    totalProducts?.forEach((el) => {
      total.push(ModalCartRender.createModalCartItem(el));
      productId.push(el._id);
    });
    modalCartItems?.insertAdjacentHTML('beforeend', total.join(''));

    Array.from(productsCatalog!.children).forEach((product) => {
      if (productId.includes(product.id)) {
        const shopCart = product.querySelector('.shop-cart');
        shopCart?.classList.add('active');
      }
    });
  }

  static async UpdateCountProducts(products: object[]) {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    try {
      await fetch('http://localhost:3000/auth/updateCountProducts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(products),
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getCountProducts() {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3000/auth/countProducts', {
        method: 'GET',
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();

        const { productInCart } = data;

        localStorage.setItem('productInCart', JSON.stringify(productInCart));
        localStorage.setItem('totalInCart', `${productInCart.length}`);
        this.cartCounter();
        this.cartItems();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
export default CountProducts;
