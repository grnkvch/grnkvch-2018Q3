import ActionDialogTemplate from './ActionDialog.template.js';
import './ActionDialog.css';


export default class ActionDialog {
  constructor() {
    this.content = null;
  }

  static initialize(actionObj) {
    const actionDialog = new ActionDialog();
    actionDialog.content = document.createElement('div');
    actionDialog.content.classList.add('.action-dialog-screen__wrapper')
    actionDialog.content.innerHTML = ActionDialogTemplate;
    const keys = Object.keys(actionObj);
    keys.forEach((key) => {
      actionDialog.content.querySelector('.action-dialog-screen__section').innerHTML += `
      <button actionkey="${key}" class="action-dialog-screen__button">
      ${actionObj[key].caption}
      </button>
      `;
    });
    return actionDialog;
  }

  show() {
    const modal = document.querySelector('.modal-window__container');
    modal.appendChild(this.content);
  }

  static hide() {
    document.querySelector('.modal-window__container').innerHTML = '';
  }

  pickAction() {
    this.show();
    return new Promise((resolve) => {
      this.content.addEventListener('click', (e) => {
        const actionkey = e.target.getAttribute('actionkey');
        if (actionkey) {
          resolve(actionkey);
          ActionDialog.hide();
        } 
      });
    });
  }
}
