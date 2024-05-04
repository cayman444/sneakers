import { ElementParams } from './interface';

export default class ElementCreator {
  element: HTMLElement | null = null;

  constructor(param: ElementParams) {
    this.element = null;
    this.createElement(param);
  }

  private createElement(param: ElementParams) {
    this.element = document.createElement(param.tag);
    this.setCssClasses(param.classNames);
    this.setTextContent(param.textContent);
  }

  public getElement(): HTMLElement {
    return <HTMLElement>this.element;
  }

  public addInnerElement(element: HTMLElement | ElementCreator) {
    if (element instanceof ElementCreator) {
      this.element!.append(element.getElement());
    } else {
      this.element!.append(element);
    }
  }

  private setCssClasses(CssClasses: string[]) {
    CssClasses.forEach((className) => this.element?.classList.add(className));
  }

  private setTextContent(text: string) {
    this.element!.textContent = text;
  }
}
