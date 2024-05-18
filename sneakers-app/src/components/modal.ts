import Swiper from 'swiper';
import { Thumbs } from 'swiper/modules';
import 'swiper/css/bundle';
import ElementCreator from '../util/element-creator';
import { ElementProduct } from '../util/interface';

const cache = new Map();

export default class Modal {
  product: ElementProduct;

  currentModal: HTMLElement | null = null;

  constructor(product: ElementProduct) {
    this.product = product;
    this.renderModal();
  }

  private renderModal() {
    if (cache.has(this.product.id)) {
      document.body.insertAdjacentHTML('beforeend', cache.get(this.product.id));
    } else {
      const modal = this.markingModal();
      document.body.insertAdjacentHTML('beforeend', modal);

      cache.set(this.product.id, modal);
    }

    this.swiperJoin();
    document.body.dataset.hidden = 'true';

    this.currentModal = <HTMLElement>document.querySelector('.modal');
    const sizes = this.currentModal.querySelector('.about-info__sizes');

    this.currentModal.addEventListener('click', this.clickField);
    sizes?.addEventListener('click', this.clickSize);
  }

  private clickField(e: MouseEvent) {
    const el = <HTMLElement>e.target;
    if (el.classList.contains('modal')) {
      el.remove();
      document.body.dataset.hidden = 'false';
    }
  }

  private clickSize(e: Event) {
    const el = <HTMLElement>e.target;
    if (el.classList.contains('about-info__size')) {
      const sizes = <HTMLCollection>el.parentElement?.children;
      Array.from(sizes).forEach((size) => size.classList.remove('active'));
      el.classList.toggle('active');
    }
  }

  private renderSlider(where: string) {
    const imgSlider = this.product.gallery.map((imgPath) => {
      const slide = new ElementCreator('div', '', [
        where === 'top' ? 'about-slider__slide' : 'slider-bottom__slide',
        'swiper-slide',
      ]);
      const slideImg = new ElementCreator('img', '', []);
      slideImg.getElement().setAttribute('src', imgPath);
      slide.addInnerElement(slideImg.getElement());

      return slide.getElement().outerHTML;
    });

    return imgSlider.join('');
  }

  private renderSizes() {
    const sizes = this.product.sizes.map((size, ind) => {
      const sizeButton = new ElementCreator('button', size.toString(), ['about-info__size']);
      if (ind === 0) {
        sizeButton.getElement().classList.add('active');
      }
      return sizeButton.getElement().outerHTML;
    });

    return sizes.join('');
  }

  private swiperJoin() {
    const swiperThumbs = new Swiper('.about-slider__bottom', {
      allowTouchMove: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiperTop = new Swiper('.about-slider__top', {
      modules: [Thumbs],
      spaceBetween: 20,
      loop: true,
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  }

  private renderDescription() {
    const { gender, color, country, compound } = this.product.chars;

    const renderGender = new ElementCreator('li', 'Пол:', []);
    const spanGender = new ElementCreator('span', ` ${gender.join(', ')}`, []);
    renderGender.addInnerElement(spanGender);

    const renderColor = new ElementCreator('li', 'Цвета:', []);
    const spanColor = new ElementCreator('span', ` ${color}`, []);
    renderColor.addInnerElement(spanColor);

    const renderCountry = new ElementCreator('li', 'Страна:', []);
    const spanCountry = new ElementCreator('span', ` ${country}`, []);
    renderCountry.addInnerElement(spanCountry);

    const renderCompound = new ElementCreator('li', 'Состав:', []);
    const spanCompound = new ElementCreator('span', ` ${compound}`, []);
    renderCompound.addInnerElement(spanCompound);

    const description = [
      renderGender.getElement().outerHTML,
      renderColor.getElement().outerHTML,
      renderCountry.getElement().outerHTML,
      renderCompound.getElement().outerHTML,
    ];

    return description.join('');
  }

  // eslint-disable-next-line max-lines-per-function
  private markingModal() {
    return `
    <div class="modal" data-active='true'>
    <div class="modal__content modal-about">
      <div class="modal-about__inner">
        <div class="modal-about__item">
          <div class="modal-about__slider about-slider">
            <div class="about-slider__content">
              <div class="about-slider__top slider-top">
                <div class="slider-top__wrapper swiper-wrapper">
                  ${this.renderSlider('top')}
                </div>
              </div>
              <div class="about-slider__info about-info">
                <div class="about-info__top">
                  <div class="about-info__code">Артикул: <span>879876</span></div>
                  <div class="about-info__stock">В наличии: <span>13 шт</span></div>
                </div>
                <div class="about-info__main">
                  <h2 class="about-info__title">${this.product.title}</h2>
                  <div class="about-info__ratting">
                    <label class="about-info__label">
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                          fill="#F14F4F" />
                      </svg>
                      <input type="radio" name="rate" id="rate-5" class="about-info__input"></input>
                    </label>
                    <label class="about-info__label">
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                          fill="#F14F4F" />
                      </svg>
                      <input type="radio" name="rate" id="rate-4" class="about-info__input"></input>
                    </label>
                    <label class="about-info__label">
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                          fill="#F14F4F" />
                      </svg>
                      <input type="radio" name="rate" id="rate-3" class="about-info__input"></input>
                    </label>
                    <label class="about-info__label">
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                          fill="#F14F4F" />
                      </svg>
                      <input type="radio" name="rate" id="rate-2" class="about-info__input"></input>
                    </label>
                    <label class="about-info__label">
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                          fill="#F14F4F" />
                      </svg>
                      <input type="radio" name="rate" id="rate-1" class="about-info__input"></input>
                    </label>
                  </div>
                  <div class="about-info__select">Выберите размер</div>
                  <div class="about-info__sizes">
                    ${this.renderSizes()}
                  </div>
                  <div class="about-info__price">${this.product.price} ₽</div>
                  <button class="about-info__btn button">Заказать</button>
                </div>
              </div>
            </div>
            <div class="about-slider__content">
              <div class="about-slider__bottom slider-bottom">
                <div class="slider-bottom__wrapper swiper-wrapper">
                  ${this.renderSlider('bottom')}
                </div>
              </div>
              <div class="about-slider__info">
                <ul class="about-info__list">
                  <li>Бесплатная доставка до двери</li>
                  <li>Оплата заказа при получении</li>
                  <li>Обмен в течении двух недель</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-about__item">
          <div class="modal-about__description about-description">
            <div class="about-description__item">
              <h3 class="about-description__title">Описание</h3>
              <p class="about-description__text">${this.product.description}</p>
            </div>
            <div class="about-description__item">
              <h3 class="about-description__title">Характеристики</h3>
              <ul class="about-description__list">
                ${this.renderDescription()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}
