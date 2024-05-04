import ElementCreator from '../util/element-creator';
import { ElementParams } from '../util/interface';

export default class View {
  viewElementCreator: ElementCreator;

  constructor(params: ElementParams) {
    this.viewElementCreator = this.createView(params);
  }

  getHtmlElement() {
    return this.viewElementCreator.getElement();
  }

  createView(params: ElementParams): ElementCreator {
    const elementParams = {
      tag: params.tag,
      classNames: params.classNames,
      textContent: params.textContent,
    };

    this.viewElementCreator = new ElementCreator(elementParams);

    return this.viewElementCreator;
  }

  createElement(tag: string, text: string, classNames: string[]) {
    return new ElementCreator({
      tag,
      classNames,
      textContent: text,
    });
  }
}
