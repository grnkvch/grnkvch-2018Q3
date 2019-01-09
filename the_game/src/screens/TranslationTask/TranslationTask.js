import dictinory from './TranslationTaskConfig';
import template from './TranslationTask.template';
import './TranslationTask.css';


export default class TranslationTask {
  static show() {
    const modal = document.querySelector('.modal-window__container');
    modal.innerHTML = template;
  }

  static hide() {
    const modal = document.querySelector('.translation-task-screen');
    modal.outerHTML = '';
  }

  static getRandomArrItem(arr) {
    const length = arr.length;
    return arr[Math.floor(Math.random() * length)];
  }

  static getRandomTask() {
    const key = TranslationTask.getRandomArrItem(Object.keys(dictinory)); 
    const task = `Can you translate it to ${dictinory[key][0]}?<br>
    <span class="highlighted"> ${key} </span>`;
    const answer = dictinory[key];
    return [task, answer];
  }

  static ask() {
    return new Promise((resolve) => {
      const modal = document.querySelector('.modal-window__container');
      TranslationTask.show();
      const content = document.querySelector('.translation-task-screen__section-text');
      const task = TranslationTask.getRandomTask();
      content.innerHTML = task[0];
      function listener(e) {
        e.preventDefault();
        if (task[1].includes(document.querySelector('.translation-task-screen__input').value.toLowerCase())) resolve(true);
        else resolve(false);
        TranslationTask.hide();
        modal.removeEventListener('submit', listener);
      }
      modal.addEventListener('submit', listener);
      modal.querySelector('.translation-task-screen__input').focus();
    });
  }
}
