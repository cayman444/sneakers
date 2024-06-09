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
        this.userAuth(userName);
      }
    } catch (e) {
      console.log(e);
    }
  }

  userAuth(name: string) {
    const loginBtn = document.querySelector('.header-profile');
    const inputForm = <HTMLInputElement>document.querySelector('.social-form__input');
    const loginBtnText = <HTMLElement>loginBtn?.querySelector('div');

    loginBtnText.textContent = name[0].toUpperCase();
    inputForm.value = name[0].toUpperCase() + name.slice(1);

    loginBtn?.classList.add('active');
  }

  async checkUser(form: HTMLFormElement) {
    const formData = new FormData(form);
    const email = formData.get('email');
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
      if (res.ok) {
        loading?.classList.remove('active');
        this.successLogin(data.token, data.userName);
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
    const email = formData.get('email');
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

      if (res.ok) {
        this.successRegister();
      }
    } catch (e) {
      console.log(e);
    }
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

  successRegister() {
    this.wrapperRegister.dataset.active = 'false';
    document.body.dataset.hidden = 'false';
  }

  successLogin(token: string, username: string) {
    localStorage.setItem('userToken', token);
    const loginBtn = document.querySelector('.header-profile');
    const loginBtnText = <HTMLElement>loginBtn?.querySelector('div');
    loginBtnText.textContent = username[0].toUpperCase();

    loginBtn?.classList.add('active');

    this.wrapperLogin.dataset.active = 'false';
    document.body.dataset.hidden = 'false';
  }

  openModalLogin(form: HTMLFormElement) {
    const inputs = <NodeListOf<HTMLInputElement>>form.querySelectorAll('.modal-login__input');
    inputs.forEach((input) => {
      const currentInput = input;
      currentInput.dataset.error = 'false';
      currentInput.value = '';
    });

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
