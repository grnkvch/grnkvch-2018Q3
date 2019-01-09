import { } from './screens/home/home';
import GameManager from './GameManager/GameManager';

const gameManager = new GameManager;

document.querySelector('.home-screen__start-button').addEventListener('click', () => {
  gameManager.start();
});
