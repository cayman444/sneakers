import { ElementProduct } from '../util/interface';

export default class ModalCartInner {
  private products: ElementProduct[] | null = null;

  private modalCart: HTMLElement | null = null;

  constructor(products: ElementProduct[] | null, modalCart: HTMLElement) {
    this.products = products;
    this.modalCart = modalCart;
    this.renderProduct();
  }

  private renderProduct() {
    document.addEventListener('click', (e) => this.checkClick(e));
  }

  private checkClick(e: MouseEvent) {
    const currentEl = <HTMLElement>e.target;
    if (currentEl.classList.contains('modal')) {
      currentEl.dataset.active = 'false';
      this.modalCart!.dataset.active = 'false';
      document.body.dataset.hidden = 'false';
    }
  }
}
