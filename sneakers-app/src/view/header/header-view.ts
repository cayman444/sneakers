import View from '../view';

export default class HeaderView extends View {
  constructor() {
    const params = {
      tag: 'header',
      classNames: ['header'],
      textContent: '',
    };
    super(params);

    this.configureView();
  }

  private configureView() {
    const container = this.createElement('div', '', ['container']);
    const headerContainer = this.createElement('div', '', ['header__container']);

    container.addInnerElement(headerContainer);

    this.viewElementCreator.addInnerElement(container);
  }
}
