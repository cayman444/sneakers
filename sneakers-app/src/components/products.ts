/* eslint-disable no-underscore-dangle */
import BrowserDetector from 'browser-dtector';
import { ElementProduct, Options } from '../util/interface';
import ModalProduct from './modal-product';
import ModalCartRender from './modalCartRender';
import ModalCartInner from './modalCartInner';
import ModalOrder from './modal-order';
import auth from './modal-auth';
import question from './question-send';

export default class Products {
  private products: ElementProduct[] | null = null;

  private container: HTMLElement | null = null;

  private filterItem: HTMLElement | null = null;

  private wrapperModal: HTMLElement | null = null;

  constructor() {
    this.getProducts();
    this.cartCounter();
  }

  private async getProducts() {
    try {
      const res = await fetch('http://localhost:3000/product/render');
      const data: ElementProduct[] = await res.json();
      this.renderProduct(data);
    } catch (err) {
      console.error(err);
    }
  }

  private renderProduct(products: ElementProduct[]) {
    this.products = products;
    this.auth();
    this.wrapperModal = <HTMLElement>document.querySelector('.modal');
    const wrapperOrder = document.querySelector('.modal-end');
    const cart = document.querySelector('.header__card');
    const modalCart = document.querySelector('.modal-cart');
    const container = <HTMLElement>document.querySelector('.products-item__cards');
    const filterItem = <HTMLElement>document.querySelector('.filter-item');
    const filterBtn = filterItem.querySelector('.filter-item__btn');
    const resetBtn = filterItem.querySelector('.filter-item__reset');
    const filterSizes = filterItem.querySelector('.filter-item__table');
    const button = document.querySelector('.products-item__btn');
    const orderBtn = document.querySelector('.cart-total__btn');
    const questionForm = <HTMLFormElement>document.querySelector('.social-form');

    // eslint-disable-next-line no-magic-numbers
    products.slice(0, 6).forEach((product) => {
      const currentProduct = this.createProduct(product);
      container?.insertAdjacentHTML('beforeend', currentProduct);
    });

    this.cartItems();

    this.filterItem = filterItem;
    this.container = container;

    button?.addEventListener('click', (e) => this.showMore(e));

    filterSizes?.addEventListener('click', (e) => {
      const currentEl = <HTMLElement>e.target;
      currentEl.classList.toggle('active');
    });

    filterBtn?.addEventListener('click', () => this.filter());

    resetBtn?.addEventListener('click', () => this.resetFilter());

    container.addEventListener('click', (e) => this.transitionTo(e));

    cart?.addEventListener('click', () => this.openCart());

    orderBtn?.addEventListener('click', this.openOrder.bind(this));

    wrapperOrder?.addEventListener('click', (e) => ModalOrder.checkClickOrder(e));

    this.wrapperModal.addEventListener('click', (e) => ModalCartInner.checkClick(e, this.products));

    modalCart?.addEventListener('click', (e) => ModalCartInner.checkClick(e, this.products));

    questionForm?.addEventListener('submit', (e) => question.questionSend(e));
  }

  private userProfile(userProfile: HTMLElement) {
    const currentUser = userProfile;

    if (currentUser.getAttribute('data-active') === 'false') {
      currentUser.dataset.active = 'true';
    } else {
      currentUser.dataset.active = 'false';
    }
  }

  private async auth() {
    await auth.checkAuth();

    const loginBtn = <HTMLElement>document.querySelector('.header-profile');
    const userInfo = <HTMLElement>document.querySelector('.modal-info');
    const wrapperLogin = <HTMLElement>document.querySelector('.modal-login');
    const wrapperRegister = <HTMLElement>document.querySelector('.modal-register');
    const loginForm = <HTMLFormElement>wrapperLogin.querySelector('.modal-login__form');
    const registerForm = <HTMLFormElement>wrapperRegister.querySelector('.modal-register__form');

    loginBtn?.addEventListener('click', () => {
      if (!loginBtn?.classList.contains('active')) {
        auth.openModalLogin();
      } else {
        this.userProfile(userInfo);
      }
    });

    wrapperLogin?.addEventListener('click', (e) => auth.checkAuthClick(e, wrapperLogin));
    loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      auth.loginUser(loginForm);
    });

    wrapperRegister?.addEventListener('click', (e) => auth.checkAuthClick(e, wrapperRegister));
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      auth.registerUser(registerForm);
    });

    document.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = <HTMLElement>e.target;
      if (!target.closest('.modal-info') && !target.closest('.header-profile')) {
        userInfo.dataset.active = 'false';
      } else if (target.classList.contains('modal-info__orders')) {
        console.log('сделать');
      } else if (target.classList.contains('modal-info__exit')) {
        auth.logout();
      }
    });
  }

  private openCart() {
    if (!localStorage.getItem('userToken')) {
      return auth.openModalLogin();
    }

    const modalCartInner = <HTMLElement>document.querySelector('.modal-cart');
    this.wrapperModal!.dataset.active = 'true';
    modalCartInner.dataset.active = 'true';
    document.body.dataset.hidden = 'true';
    ModalCartInner.renderTotal();
    ModalCartInner.checkField();
  }

  private openOrder() {
    const products = document.querySelector('.cart-product__items');
    if (!products?.querySelector('.cart-product__item')) return;
    const modalOrder = <HTMLElement>document.querySelector('.modal-end');
    document.body.dataset.hidden = 'true';
    modalOrder.dataset.active = 'true';
    ModalOrder.renderProducts(this.products);
    ModalOrder.infoAboutProduct();
  }

  private createProduct(product: ElementProduct) {
    return `
      <div id="${product._id}" class="products-item__card item-card">
        <div class="item-card__img card-img">
          <div class="card-img__background">
            <div class="card-img__decor about-card">
              <img src="assets/show.svg" alt="">
            </div>
            <div class="card-img__decor shop-cart ${this.checkProductInCart(Number(product._id))}">
              <img src="assets/card.svg" alt="">
            </div>
          </div>
          <img class="card-img__main" src="${product.mainImage}" alt="">
        </div>
        <div class="item-card__content">
          <div class="item-card__title">${product.title}</div>
          <div class="item-card__price">${product.price} <span>₽</span></div>
        </div>
      </div>
    `;
  }

  private checkProductInCart(id: number): string {
    const productsInCar = localStorage.getItem('productInCart');
    if (productsInCar) {
      const products = JSON.parse(productsInCar);
      return products.some((product: { id: string }) => product.id === id.toString()) ? 'active' : '';
    }
    return '';
  }

  private showMore(e: Event) {
    const currentBtn = <HTMLElement>e.target;
    this.products?.forEach((product, ind) => {
      if (ind >= 6) {
        this.container?.insertAdjacentHTML('beforeend', this.createProduct(product));
      }
    });

    currentBtn.remove();
  }

  private filter() {
    const inputsPrice = <NodeListOf<HTMLInputElement>>this.filterItem?.querySelectorAll('.filter-item__input');
    const [min, max]: HTMLInputElement[] = Array.from(inputsPrice);
    const inputsGender = <NodeListOf<HTMLInputElement>>this.filterItem?.querySelectorAll('.item-checkbox__input');
    const buttonMore = document.querySelector('.products-item__btn');
    buttonMore?.remove();
    const totalGender = Array.from(inputsGender).reduce((acc: string[], input) => {
      const inputGender = <string>input.getAttribute('data-gender');
      if (input.checked) {
        acc.push(inputGender);
      }
      return acc;
    }, []);

    const sizes = <NodeListOf<HTMLTableCellElement>>this.filterItem?.querySelectorAll('td');
    const selectedSize = Array.from(sizes).reduce((acc: number[], size) => {
      if (size.classList.contains('active')) {
        const sizeContent = size.textContent;
        if (sizeContent) {
          acc.push(+sizeContent);
        }
      }
      return acc;
    }, []);

    const options = { min: min.value, max: max.value, gender: totalGender, sizes: selectedSize };

    this.renderFilterProduct(options);
  }

  private renderFilterProduct(options: Options) {
    this.container!.innerHTML = '';

    this.products?.forEach((product) => {
      const { sizes, chars } = product;
      const { gender } = chars;
      const price = +product.price.replace(/\s+/g, '');

      const priceOption = price >= +options.min && price <= +options.max;

      let genderOption;

      if (options.gender.length === 0) {
        genderOption = true;
      } else {
        const [male = '', female = ''] = options.gender;
        genderOption = gender.some((el) => el === male || female);
      }

      let sizeOption;
      if (options.sizes.length === 0) {
        sizeOption = true;
      } else {
        sizeOption = sizes.some((el) => options.sizes.includes(+Object.keys(el)[0]));
      }

      if (priceOption && genderOption && sizeOption) {
        const currentProduct = this.createProduct(product);
        this.container?.insertAdjacentHTML('beforeend', currentProduct);
      }
    });

    if (this.container?.children.length === 0) {
      this.container.textContent = 'Нет товаров по заданным характеристикам';
    }
  }

  private resetFilter() {
    this.container!.innerHTML = '';
    const genderCheckbox = <NodeListOf<HTMLInputElement>>this.filterItem?.querySelectorAll('.item-checkbox__input');
    const sizes = <NodeListOf<HTMLInputElement>>this.filterItem?.querySelectorAll('.filter-item__table td');
    const buttonMore = document?.querySelector('.products-item__container');

    genderCheckbox?.forEach((el) => {
      const currentEl = el;
      currentEl.checked = false;
    });

    sizes.forEach((el) => el.classList.remove('active'));

    // eslint-disable-next-line no-magic-numbers
    this.products!.slice(0, 6).forEach((product) => {
      const currentProduct = this.createProduct(product);
      this.container?.insertAdjacentHTML('beforeend', currentProduct);
    });

    if (buttonMore?.children.length === 0) {
      const button = document.createElement('button');
      button.classList.add('products-item__btn', 'button');
      button.textContent = 'Показать еще';

      button.addEventListener('click', (e) => this.showMore(e));
      buttonMore.append(button);
    }
  }

  private transitionTo(e: MouseEvent) {
    const browser = new BrowserDetector(window.navigator.userAgent);
    const el = <HTMLElement>e.target;
    const currentId = el.closest('.item-card')?.id;

    if (el.closest('.item-card') && browser.parseUserAgent().isMobile) {
      this.renderInModal(currentId || '', 'product');
    } else if (el.closest('.about-card') || el.closest('.item-card__content')) {
      this.renderInModal(currentId || '', 'product');
    } else if (el.closest('.shop-cart') && !el.closest('.shop-cart')!.classList.contains('active')) {
      if (localStorage.getItem('userToken')) {
        el.closest('.shop-cart')?.classList.add('active');
        this.renderInModal(currentId || '', 'cart');
      } else {
        auth.openModalLogin();
      }
    }
  }

  private renderInModal(id: string, where: string) {
    if (id) {
      const currentProduct = <ElementProduct>this.products?.find((product) => product._id.toString() === id);
      if (where === 'product') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const modal = new ModalProduct(currentProduct);
      } else if (where === 'cart') {
        const productInCart = localStorage.getItem('productInCart');
        let product;
        if (productInCart) {
          product = JSON.parse(productInCart);
          product.push({ id });
        } else {
          product = [{ id }];
        }

        localStorage.setItem('productInCart', JSON.stringify(product));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const modal = new ModalCartRender(currentProduct);
      }
    }
  }

  private cartCounter() {
    const totalInCart = localStorage.getItem('totalInCart');
    const cartCounter = <HTMLElement>document.querySelector('.header__card-decor');
    if (totalInCart) {
      cartCounter.textContent = totalInCart;
    }
  }

  private cartItems() {
    const productCart = localStorage.getItem('productInCart');
    const modalCartItems = document?.querySelector('.cart-product__items');
    const productsCatalog = document.querySelector('.products-item__cards');

    if (!productCart) return;

    const products = <ElementProduct[]>this.products;

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
}
