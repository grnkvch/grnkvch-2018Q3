import KeyCode from 'keycode-js';
import template from './PauseDialog.template.js';
import './PauseDialog.css';


export default class PauseDialog {
  static show() {
    const modal = document.querySelector('.modal-window__container');
    modal.innerHTML = template;
  }

  static hide() {
    document.querySelector('.modal-window__container').innerHTML = '';
  }

  static toggleActive(prev, next) {
    prev.classList.toggle('active');
    next.classList.toggle('active');
  }

  static btnSwither(e) {
    const activeBtn = document.querySelector('.pause-dialog-screen__button.active');
    if (e.keyCode === KeyCode.KEY_DOWN) {
      if (activeBtn.nextElementSibling) {
        PauseDialog.toggleActive(activeBtn, activeBtn.nextElementSibling);
      } else PauseDialog.toggleActive(activeBtn, activeBtn.parentElement.firstElementChild);
    }
    if (e.keyCode === KeyCode.KEY_UP) {
      if (activeBtn.previousElementSibling) {
        PauseDialog.toggleActive(activeBtn, activeBtn.previousElementSibling);
      } else PauseDialog.toggleActive(activeBtn, activeBtn.parentElement.lastElementChild);
    }
  }

  static pause() {
    return new Promise((resolve, reject) => {
      function listener(e) {
        const activeBtn = document.querySelector('.pause-dialog-screen__button.active');
        if (e.keyCode === KeyCode.KEY_ESCAPE) {
          PauseDialog.hide();
          reject();
          document.removeEventListener('keyup', listener);
          document.removeEventListener('keyup', PauseDialog.btnSwither);
        }
        if (e.keyCode === KeyCode.KEY_SPACE
          || e.keyCode === KeyCode.KEY_RETURN || e.keyCode === KeyCode.ENTER) {
          const actionkey = activeBtn.getAttribute('actionkey');
          if (actionkey) {
            if (actionkey === 'resume') reject();
            else resolve(actionkey);
          }
          PauseDialog.hide();
          document.removeEventListener('keyup', listener);
          document.removeEventListener('keyup', PauseDialog.btnSwither);
        }
      }

      PauseDialog.show();
      document.querySelector('.pause-dialog-screen').addEventListener('click', (e) => {
        if (e.target.classList.contains('pause-dialog-screen__button')) {
          const actionkey = e.target.getAttribute('actionkey');
          if (actionkey) {
            if (actionkey === 'resume') reject();
            else resolve(actionkey);
          }
          PauseDialog.hide();
          document.removeEventListener('keyup', listener);
          document.removeEventListener('keyup', PauseDialog.btnSwither);
        }
      });

      document.addEventListener('keyup', listener);
      document.addEventListener('keyup', PauseDialog.btnSwither);
    });
  }
}
