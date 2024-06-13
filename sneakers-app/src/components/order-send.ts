import CountProducts from './count-products';

import { OrderInterface } from '../util/interface';

class Order {
  wrapperOrder = <HTMLElement>document.querySelector('.modal-end');

  async orderSend(e: SubmitEvent) {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    const form = <HTMLFormElement>e.target;
    const order = new FormData(form);
    const userName = order.get('name');
    const phone = order.get('tel');
    const email = order.get('email');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const productOrder = document.querySelector('.order-content__products');
    let totalSum = <string>document.querySelector('.order-content__sum span')?.textContent?.replace(/\W/g, '');

    const totalProducts: (object | string)[] = Array.from(productOrder!.children).reduce((acc: object[], product) => {
      const productId = product.getAttribute('data-id');
      const productName = product.querySelector('.cart-product__title')?.textContent;
      const productPrice = <string>product.querySelector('.cart-product__price')?.textContent;

      const infoProduct = { productId, productName, productPrice };
      acc.push(infoProduct);

      return acc;
    }, []);

    totalSum = `${totalSum} ₽`;

    try {
      const res = await fetch('http://localhost:3000/order/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ userName, phone, email, products: totalProducts, totalSum, date: formattedDate }),
      });

      if (res.ok) {
        // eslint-disable-next-line no-alert
        alert('Отправлено');
        form.reset();

        this.successOrder();
      }
    } catch (err) {
      console.log(err);
    }
  }

  successOrder() {
    if (!localStorage.getItem('oneProduct')) {
      localStorage.removeItem('productInCart');
      localStorage.removeItem('totalInCart');
      CountProducts.UpdateCountProducts([]);
    } else {
      localStorage.removeItem('oneProduct');
    }

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  async getOrders() {
    const token = localStorage.getItem('userToken');
    try {
      const res = await fetch('http://localhost:3000/order/get', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        this.markingWrapperModal(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  markingWrapperModal(orders: OrderInterface[]) {
    document.body.dataset.hidden = 'true';
    const modalWrapper = document.querySelector('.modal');
    modalWrapper?.insertAdjacentHTML(
      'beforeend',
      `
      <div class="order-list">
      <div class="order-list__inner">
        <div class="order-list__title">Мои заказы</div>
        <div class="order-list__items">
          ${this.openModalOrders(orders)}
        </div>
      </div>
    </div>
    `
    );
  }

  openModalOrders(orders: OrderInterface[]) {
    const htmlOrders = orders.map((order) => this.markingOrderModal(order));
    return htmlOrders.join(' ');
  }

  markingOrderModal(order: OrderInterface) {
    return `
      <div class="modal-order__content order-content">
        <div class="order-content__inner">
          <div class="order-content__top">
            <div class="order-content__total">Номер заказа: <span>${order.orderId}</span></div>
            <div class="order-content__total">дата заказа: <span>${order.date}</span></div>
            <div class="order-content__total">Товаров в заказе: <span>${order.orderProducts.length} шт</span></div>
            <div class="order-content__sum">Общая сумма заказа: <span>${order.totalSum}</span></div>
          </div>
          <div class="order-content__about">
            <div class="order-content__compound">Состав заказа</div>
            <div class="order-content__products" style="max-height: 201px;">
              ${this.createModalOrderItem(order.orderProducts)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createModalOrderItem(orderProducts: object[]) {
    // console.log(orderProducts);
  }
}

export default new Order();
