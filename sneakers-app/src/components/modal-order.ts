/* eslint-disable no-underscore-dangle */
import { ElementProduct } from '../util/interface';

export default class ModalOrder {
  static totalOrderProducts: ElementProduct[];

  static renderProducts(products: ElementProduct[] | null) {
    const containerOrderProducts = document.querySelector('.order-content__products');
    containerOrderProducts!.innerHTML = '';
    let totalProducts = <string>localStorage.getItem('productInCart');
    totalProducts = JSON.parse(totalProducts).map((product: { [key: string]: string }) => product.id);
    const productsOrderToRend = products?.filter((product) => {
      if (totalProducts.includes(product._id.toString())) {
        return product;
      }
      return null;
    });

    this.totalOrderProducts = <ElementProduct[]>productsOrderToRend;

    productsOrderToRend?.forEach((product) => {
      const htmlProduct = this.createModalOrderItem(product);
      containerOrderProducts?.insertAdjacentHTML('beforeend', htmlProduct);
    });
  }

  static renderCurrentProduct(product: ElementProduct) {
    const containerOrderProducts = document.querySelector('.order-content__products');
    const modalOrder = <HTMLElement>document.querySelector('.modal-end');
    containerOrderProducts!.innerHTML = '';
    document.body.dataset.hidden = 'true';
    modalOrder.dataset.active = 'true';

    const htmlProduct = this.createModalOrderItem(product);
    containerOrderProducts?.insertAdjacentHTML('beforeend', htmlProduct);
    this.infoAboutProduct(product);
  }

  static createModalOrderItem(product: ElementProduct) {
    return `
    <div class="order-content__product" data-id="${product._id}">
      <div class="cart-product__img">
        <img src="${product.mainImage}" alt="">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${product.title}</div>
        <div class="cart-product__price">${product.price} ₽</div>
      </div>
    </div>
    `;
  }

  static checkClickOrder(e: Event) {
    const currentEl = <HTMLElement>e.target;
    const orderModal = <HTMLElement>document.querySelector('.modal-order');
    const wrapper = <HTMLElement>document.querySelector('.modal-end');
    if (currentEl.classList.contains('modal-end')) {
      wrapper.dataset.active = 'false';
      orderModal.dataset.active = 'false';
      document.body.dataset.hidden = 'false';
    }
  }

  static infoAboutProduct(product?: ElementProduct) {
    const totalOrderCount = document.querySelector('.order-content__total span');
    const totalOrderSum = document.querySelector('.order-content__sum span');

    if (!product) {
      const totalSum = ModalOrder.totalOrderProducts.reduce((acc, el) => acc + +el.price.replace(' ', ''), 0);
      totalOrderCount!.textContent = `${ModalOrder.totalOrderProducts.length.toString()} шт`;
      totalOrderSum!.textContent = `${totalSum.toString()} ₽`;
    } else {
      totalOrderCount!.textContent = `1 шт`;
      totalOrderSum!.textContent = `${product.price.toString().replace(' ', '')} ₽`;
    }
  }
}
