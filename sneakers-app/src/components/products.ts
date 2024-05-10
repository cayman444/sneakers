import { ElementProduct, Options } from '../util/interface';

export default class Products {
  private products: ElementProduct[] | null = null;

  private container: HTMLElement | null = null;

  private filterItem: HTMLElement | null = null;

  private currentOptions: Options | null = null;

  constructor() {
    this.getProducts();
  }

  private async getProducts() {
    try {
      const res = await fetch('./data/data.json');
      const data: ElementProduct[] = await res.json();

      this.renderProduct(data);
    } catch (err) {
      console.error(err);
    }
  }

  private renderProduct(products: ElementProduct[]) {
    this.products = products;
    const container = <HTMLElement>document.querySelector('.products-item__cards');
    const filterItem = <HTMLElement>document.querySelector('.filter-item');
    const filterBtn = filterItem.querySelector('.filter-item__btn');
    const resetBtn = filterItem.querySelector('.filter-item__reset');
    const filterSizes = filterItem.querySelector('.filter-item__table');
    const button = document.querySelector('.products-item__btn');

    // eslint-disable-next-line no-magic-numbers
    products.slice(0, 6).forEach((product) => {
      const currentProduct = this.createProduct(product);
      container?.insertAdjacentHTML('beforeend', currentProduct);
    });

    this.filterItem = filterItem;
    this.container = container;

    button?.addEventListener('click', (e) => this.showMore(e));

    filterSizes?.addEventListener('click', (e) => {
      const currentEl = <HTMLElement>e.target;
      currentEl.classList.toggle('active');
    });

    filterBtn?.addEventListener('click', () => this.filter());

    resetBtn?.addEventListener('click', () => this.resetFilter());
  }

  private createProduct(product: ElementProduct) {
    return `
      <div id="${product.id}" class="products-item__card item-card">
        <div class="item-card__img card-img">
          <div class="card-img__background">
            <div class="card-img__decor">
              <img src="assets/show.svg" alt="">
            </div>
            <div class="card-img__decor">
              <img src="assets/card.svg" alt="">
            </div>
          </div>
          <img class="card-img__main" src="${product.mainImage}" alt="">
        </div>
        <div class="item-card__title">${product.title}</div>
        <div class="item-card__price">${product.price} <span>₽</span></div>
      </div>
    `;
  }

  private showMore(e: Event) {
    const currentBtn = <HTMLElement>e.target;
    this.products?.forEach((product, ind) => {
      const element = document.getElementById(`${ind + 1}`);
      if (element === null) {
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

    this.currentOptions = options;
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
        sizeOption = sizes.some((el) => options.sizes.includes(el));
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
}
