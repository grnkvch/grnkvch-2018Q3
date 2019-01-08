import template from './Login.template.js';
import './Login.css';


export default class Login {
  static show() {
    const modal = document.querySelector('.modal-window__container');
    modal.innerHTML = template;
  }

  static hide() {
    const modal = document.querySelector('.login-dialog-screen');
    modal.outerHTML = '';
  }

  static getNewPlayerName() {
    Login.show();
    return new Promise((resolve) => {
      const modal = document.querySelector('.modal-window__container');
      modal.addEventListener('submit', (e) => {
        e.preventDefault();
        resolve(document.querySelector('.login-dialog-screen__input').value);
        Login.hide();
      });
    });
  }
}
