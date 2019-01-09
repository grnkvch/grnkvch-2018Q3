import KeyCode from 'keycode-js';
import template from './ScoreBoard.template';
import './ScoreBoard.css';


export default class ScoreBoard {
  static show() {
    const modal = document.querySelector('.modal-window__container');
    modal.innerHTML = template;
  }

  static hide() {
    document.querySelector('.modal-window__container').innerHTML = '';
  }

  static score(isGameOver) {
    return new Promise((resolve) => {
      ScoreBoard.show();
      if (isGameOver) document.querySelector('.scoreboard-screen__button').innerHTML = 'AGAIN';
      else document.querySelector('.scoreboard-screen__button').innerHTML = 'BACK';
      let scoreObj = null;
      const table = document.querySelector('.scoreboard-screen__table');
      if (localStorage.getItem('scoreboard')) {
        scoreObj = JSON.parse(localStorage.getItem('scoreboard'));
        scoreObj.forEach((element) => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td class="scoreboard-screen__table-header scoreboard-screen__table-header__name">${element.name}</td>
          <td class="scoreboard-screen__table-header scoreboard-screen__table-header__name">${element.score}</td>`;
          table.appendChild(row);
        });
      } else table.outerHTML = '<p>There\'re no HEROs yet<p>';

      document.querySelector('.scoreboard-screen').addEventListener('click', (e) => {
        if (e.target.classList.contains('scoreboard-screen__button')) {
          resolve(isGameOver);
          ScoreBoard.hide();
        }
      });

      function listener(e) {
        if (e.keyCode === KeyCode.KEY_ESCAPE || e.keyCode === KeyCode.KEY_SPACE
          || e.keyCode === KeyCode.KEY_RETURN || e.keyCode === KeyCode.ENTER) {
          resolve(isGameOver);
          ScoreBoard.hide();
          document.removeEventListener('keyup', listener);
        }
      }
      document.addEventListener('keyup', listener);
    });
  }
}
