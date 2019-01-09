import template from './Login.template';
import './Login.css';


export default class Login {
  static show() {
    const modal = document.querySelector('.modal-window__container');
    modal.innerHTML = template;
  }

  static hide() {
    document.querySelector('.modal-window__container').innerHTML = '';
  }

  static getNewPlayerName() {
    Login.show();
    return new Promise((resolve) => {
      const modal = document.querySelector('.modal-window__container');
      if (localStorage.getItem('lastName')) {
        document.querySelector('.login-dialog-screen__input').value = localStorage.getItem('lastName');
      }
      function listener(e) {
        e.preventDefault();
        resolve(document.querySelector('.login-dialog-screen__input').value);
        Login.hide();
        modal.removeEventListener('submit', listener);
      }
      modal.addEventListener('submit', listener);
    });
  }
}
