import KeyCode from 'keycode-js';
import ActionDialogTemplate from './ActionDialog.template.js';
import './ActionDialog.css';

export default class ActionDialog {
  constructor() {
    this.content = null;
  }

  static initialize(actionObj) {
    const actionDialog = new ActionDialog();
    actionDialog.content = document.createElement('div');
    actionDialog.content.classList.add('.action-dialog-screen__wrapper');
    actionDialog.content.innerHTML = ActionDialogTemplate;
    const keys = Object.keys(actionObj);
    keys.forEach((key) => {
      actionDialog.content.querySelector('.action-dialog-screen__section').innerHTML += `
      <button actionkey="${key}" class="action-dialog-screen__button">
      ${actionObj[key].caption}
      </button>
      `;
    });
    actionDialog.content.querySelector('.action-dialog-screen__section')
      .firstElementChild.classList.toggle('active');
    return actionDialog;
  }

  show() {
    const modal = document.querySelector('.modal-window__container');
    modal.appendChild(this.content);
  }

  static hide() {
    document.querySelector('.modal-window__container').innerHTML = '';
  }

  static toggleActive(prev, next) {
    prev.classList.toggle('active');
    next.classList.toggle('active');
  }

  pickAction() {
    this.show();
    return new Promise((resolve, reject) => {
      function keyBoardListener(e) {
        const activeBtn = document.querySelector('.action-dialog-screen__button.active');
        if (e.keyCode === KeyCode.KEY_ESCAPE) {
          ActionDialog.hide();
          reject();
          document.removeEventListener('keyup', listener);
        }
        if (e.keyCode === KeyCode.KEY_DOWN) {
          if (activeBtn.nextElementSibling) {
            ActionDialog.toggleActive(activeBtn, activeBtn.nextElementSibling);
          } else ActionDialog.toggleActive(activeBtn, activeBtn.parentElement.firstElementChild);
        }
        if (e.keyCode === KeyCode.KEY_UP) {
          if (activeBtn.previousElementSibling) {
            ActionDialog.toggleActive(activeBtn, activeBtn.previousElementSibling);
          } else ActionDialog.toggleActive(activeBtn, activeBtn.parentElement.lastElementChild);
        }
        if (e.keyCode === KeyCode.KEY_SPACE
          || e.keyCode === KeyCode.KEY_RETURN || e.keyCode === KeyCode.ENTER) {
          const actionkey = activeBtn.getAttribute('actionkey');
          this.resolve(actionkey);
          ActionDialog.hide();
          document.removeEventListener('keyup', listener);
        }
      }
      this.content.addEventListener('click', (e) => {
        const actionkey = e.target.getAttribute('actionkey');
        if (actionkey) {
          resolve(actionkey);
          ActionDialog.hide();
        }
        document.removeEventListener('keyup', ActionDialog.keyBoardListener);
      });
      document.addEventListener('keyup', ActionDialog.keyBoardListener);
    });
  }
}
