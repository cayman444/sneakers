class Auth {
  wrapperLogin: HTMLElement;

  wrapperRegister: HTMLElement;

  constructor() {
    this.wrapperLogin = <HTMLElement>document.querySelector('.modal-login');
    this.wrapperRegister = <HTMLElement>document.querySelector('.modal-register');
  }

  async checkAuth() {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3000/auth/user', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const userName = data.userName;

        this.successLogin(token, userName);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async loginUser(form: HTMLFormElement) {
    const formData = new FormData(form);
    const email = <string>formData.get('email');
    const password = formData.get('password');
    const userObj = { email, password };
    const loading = document.querySelector('.modal-login__loading');

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
      });

      loading?.classList.add('active');

      const data = await res.json();
      const userName = data.userName;

      if (res.ok) {
        loading?.classList.remove('active');
        this.wrapperLogin.dataset.active = 'false';
        document.body.dataset.hidden = 'false';
        this.successLogin(data.token, data.userName);
        this.fillField(userName, email);
      } else {
        loading?.classList.remove('active');
        this.validateLogin(form, data.message);
      }
    } catch (e) {
      loading?.classList.remove('active');
      console.log(e);
    }
  }

  async registerUser(form: HTMLFormElement) {
    const formData = new FormData(form);
    const username = formData.get('username');
    const email = <string>formData.get('email');
    const password = formData.get('password');
    const userObj = { username, email, password };

    try {
      const res = await fetch('http://localhost:3000/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
      });

      const data = await res.json();

      if (res.ok) {
        this.wrapperRegister.dataset.active = 'false';
        document.body.dataset.hidden = 'false';
        this.successLogin(data.token, data.username);
        this.fillField(data.username, email);
      }
    } catch (e) {
      console.log(e);
    }
  }

  fillField(username: string, email: string) {
    const usernameInput = <HTMLInputElement>document.querySelector('.order-form__input-name');
    const emailInput = <HTMLInputElement>document.querySelector('.order-form__input-email');

    console.log(username, email);

    usernameInput.value = username;
    emailInput.value = email;
  }

  validateLogin(form: HTMLFormElement, error: string) {
    const password = <HTMLInputElement>form.querySelector('.modal-login__password');
    const username = <HTMLInputElement>form.querySelector('.modal-login__username');

    if (error === 'Пароль не совпадает') {
      password.dataset.error = 'true';
    } else {
      password.dataset.error = 'false';
    }

    if (error === 'Пользователь не найден') {
      username.dataset.error = 'true';
    } else {
      username.dataset.error = 'false';
    }
  }

  successLogin(token: string, username: string) {
    localStorage.setItem('userToken', token);
    const loginBtn = document.querySelector('.header-profile');
    const loginBtnText = <HTMLElement>loginBtn?.querySelector('div');

    loginBtnText.textContent = username[0].toUpperCase();

    loginBtn?.classList.add('active');
  }

  logout() {
    localStorage.clear();
    const userInfo = <HTMLElement>document.querySelector('.modal-info');
    const inputForm = <HTMLInputElement>document.querySelector('.social-form__input');
    const loginBtn = document.querySelector('.header-profile');
    const loginBtnText = <HTMLElement>loginBtn?.querySelector('div');
    const countCart = document.querySelector('.header__card-decor');
    const productInCart = document.querySelector('.cart-product__items');
    const productCart = document.querySelectorAll('.shop-cart');
    loginBtnText.textContent = '';
    inputForm.value = '';
    loginBtn?.classList.remove('active');
    userInfo.dataset.active = 'false';
    countCart!.textContent = '0';
    productInCart!.innerHTML = '';

    const inputs = document.querySelectorAll('input');

    inputs.forEach((input) => {
      const currentInput = input;
      currentInput.value = '';
    });

    productCart.forEach((shopCart) => shopCart.classList.remove('active'));
  }

  openModalLogin() {
    document.body.dataset.hidden = 'true';
    this.wrapperLogin.dataset.active = 'true';
  }

  checkAuthClick(e: Event, wrapper: HTMLElement) {
    const target = <HTMLElement>e.target;
    const modal = <HTMLElement>wrapper;

    if (target.classList.contains('modal-authorization') || target.closest('.modal-authorization__exit')) {
      document.body.dataset.hidden = 'false';
      modal.dataset.active = 'false';
    } else if (target.classList.contains('modal-login__register')) {
      modal.dataset.active = 'false';
      this.switchModal('register');
    } else if (target.classList.contains('modal-register__login')) {
      modal.dataset.active = 'false';
      this.switchModal('login');
    }
  }

  switchModal(where: string) {
    if (where === 'register') {
      this.wrapperRegister.dataset.active = 'true';
    } else if (where === 'login') {
      this.wrapperLogin.dataset.active = 'true';
    }
  }
}
export default new Auth();
