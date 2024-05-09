import { ElementProduct } from '../util/interface';

export default class Products {
  private products: ElementProduct[] | null = null;

  private container: HTMLElement | null = null;

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
    const button = document.querySelector('.products-item__btn');
    // eslint-disable-next-line no-magic-numbers
    products.slice(0, 6).forEach((product) => {
      const currentProduct = this.createProduct(product);
      container?.insertAdjacentHTML('beforeend', currentProduct);
    });

    this.container = container;

    button?.addEventListener('click', () => {
      this.showMore();
      button.remove();
    });
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

  private showMore() {
    this.products?.forEach((product, ind) => {
      const element = document.getElementById(`${ind + 1}`);
      if (element === null) {
        this.container?.insertAdjacentHTML('beforeend', this.createProduct(product));
      }
    });
  }
}
