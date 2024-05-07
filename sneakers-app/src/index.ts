import './util/nouislider';
import './index.html';
import './style.scss';
import HeaderView from './view/header/header-view';

export default class App {
  constructor() {
    this.createView();
  }

  createView() {
    const headerView = new HeaderView();

    document.body.append(headerView.getHtmlElement());
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const app = new App();
