import template from './ArithmeticTask.template.js';
import './ArithmeticTask.css';


export default class ArithmeticTask {
  static show() {
    const modal = document.querySelector('.modal-window__container');
    modal.innerHTML = template;
  }

  static hide() {
    const modal = document.querySelector('.arithmetic-task-screen');
    modal.outerHTML = '';
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  static getRandomTask() {
    const opArr = ['*', '/', '+', '-'];
    const task = `${ArithmeticTask.getRandomInt(100)} ${opArr[ArithmeticTask.getRandomInt(3)]} ${ArithmeticTask.getRandomInt(100)}`;
    const answer = Math.round(eval(task));
    return [task, answer];
  }

  static ask() {
    return new Promise((resolve) => {
      const modal = document.querySelector('.modal-window__container');
      ArithmeticTask.show();
      const content = document.querySelector('.arithmetic-task-screen__section-text');
      const task = ArithmeticTask.getRandomTask();
      content.innerHTML = `What is answer? <br>
      ${task[0]}  = . . .<br>
      (Round up the answer to integers)
      `;
      function listener (e) {
        e.preventDefault();
        if (document.querySelector('.arithmetic-task-screen__input').value == task[1]) resolve(true);
        else resolve(false);
        ArithmeticTask.hide();
        modal.removeEventListener('submit', listener);
      }
      modal.addEventListener('submit', listener);
    });
  }
}
