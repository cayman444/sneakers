import './util/nouislider';
import './util/accordion';
import './util/tooltip';
import './util/slider-cart';
import './util/send-mail';
import './index.html';
import './style.scss';
import Products from './components/products';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const products = new Products();

const connectToServe = async () => {
  try {
    const res = await fetch('http://localhost:5000/auth/users');
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
connectToServe();
