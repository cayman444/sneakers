/* eslint-disable no-underscore-dangle */
import { ElementProduct } from '../util/interface';
import CountProducts from './count-products';
import ModalProduct from './modal-product';

export default class ModalCartInner {
  private products: ElementProduct[] | null = null;

  private modalCart: HTMLElement | null = null;

  private wrapper: HTMLElement;

  constructor(products: ElementProduct[] | null, modalCart: HTMLElement, wrapper: HTMLElement) {
    this.products = products;
    this.wrapper = wrapper;
    this.modalCart = modalCart;
    this.renderProduct();
    ModalCartInner.renderTotal();
  }

  private renderProduct() {
    ModalCartInner.checkField();
  }

  static checkField() {
    const productsCart = document.querySelector('.cart-product__items');
    const span = productsCart?.querySelector('.no-product');

    if (!productsCart!.children.length) {
      const textNoProduct = document.createElement('span');
      textNoProduct.classList.add('no-product');
      textNoProduct.textContent = 'Нет товаров';
      productsCart!.innerHTML = '';
      productsCart!.insertAdjacentElement('beforeend', textNoProduct);
    } else if (span) {
      span!.textContent = 'Нет товаров';
    }
  }

  static checkClick(e: Event, products: ElementProduct[] | null) {
    const currentEl = <HTMLElement>e.target;
    const modalCart = <HTMLElement>document.querySelector('.modal-cart');
    const wrapper = <HTMLElement>document.querySelector('.modal');
    if (currentEl.classList.contains('modal')) {
      wrapper.innerHTML = '';
      wrapper.dataset.active = 'false';
      modalCart.dataset.active = 'false';
      document.body.dataset.hidden = 'false';
    } else if (currentEl.closest('.cart-product__delete')) {
      this.deleteProduct(currentEl);
      this.checkField();
    } else if (currentEl.closest('.cart-product__item')) {
      const productInCart = <HTMLElement>currentEl.closest('.cart-product__item');
      const productId = productInCart.getAttribute('data-id');
      const currentProduct = <ElementProduct>products?.find((product) => product._id.toString() === productId);
      modalCart.setAttribute('data-active', 'false');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const productModal = new ModalProduct(currentProduct);
    } else if (currentEl.classList.contains('cart-total__btn')) {
      const noProduct = <HTMLElement>document.querySelector('.no-product');
      if (noProduct) {
        noProduct.textContent = 'Добавьте товар';
      } else {
        wrapper.dataset.active = 'false';
        modalCart.dataset.active = 'false';
      }
    }
  }

  static renderTotal() {
    const priceText = document.querySelector('.cart-total__info span');
    const productsPriceInCart = <NodeListOf<Element>>document.querySelectorAll('.priceIn-Cart');
    const total: number = Array.from(productsPriceInCart).reduce((acc, el) => {
      const price = <string>el.textContent?.replace(/\W/gi, '');
      // eslint-disable-next-line no-param-reassign
      acc += +price;

      return acc;
    }, 0);

    priceText!.textContent = `${total.toString()} ₽`;
  }

  static deleteProduct(currentEl: HTMLElement) {
    const deleteProduct = currentEl.closest('.cart-product__delete')!.parentElement;
    const idDeleteProduct = <string>deleteProduct?.getAttribute('data-id');
    const productInCart = localStorage.getItem('productInCart');
    const productInCartObj = JSON.parse(productInCart as string);
    const currentProducts = productInCartObj.filter((product: { id: string }) => product.id !== idDeleteProduct);
    localStorage.setItem('productInCart', JSON.stringify(currentProducts));

    const totalInCart = <string>localStorage.getItem('totalInCart');
    const currentTotalInCart = +totalInCart - 1;
    localStorage.setItem('totalInCart', currentTotalInCart.toString());
    CountProducts.UpdateCountProducts(currentProducts);

    const counter = <HTMLElement>document.querySelector('.header__card-decor');
    counter.textContent = currentTotalInCart.toString();

    deleteProduct?.remove();

    const productInCatalog = document.querySelectorAll('.item-card');
    const currentProduct = Array.from(productInCatalog).find((product) => product.id === idDeleteProduct);
    const decorToCart = currentProduct?.querySelector('.shop-cart');
    decorToCart?.classList.remove('active');
    ModalCartInner.renderTotal();
  }
}
