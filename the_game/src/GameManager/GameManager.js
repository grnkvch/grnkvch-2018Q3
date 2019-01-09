import KeyCode from 'keycode-js';
import Preloader from '../screens/preloader/preloader';
import ModalWindow from '../ModalWindow/ModalWindow';
import ResourceConfig from '../ResourceLoader/ResourceConfig';
import ResourceLoader from '../ResourceLoader/ResourceLoader';
import Character from '../Character/Character';
import Environment from '../Environment/Environment';
import HUD from '../HUD/HUD';
import GameManagerConfig from './GameManagerConfig';
import homeTemplate from '../screens/home/home.template';
import Login from '../screens/Login/Login';
import ActionDialog from '../screens/ActionDialog/ActionDialog';
import PauseDialog from '../screens/PauseDialog/PauseDialog';
import ScoreBoard from '../screens/ScoreBoard/ScoreBoard';

export default class GameManager {
  constructor() {
    this.tasks = {
    };
  }

  async start() {
    this.homeScreen = document.querySelectorAll('body>*:first-child');
    this.homeScreen.forEach(key => key.style.display = 'none');
    this.resource = new ResourceLoader();
    this.playerName = await Login.getNewPlayerName();
    localStorage.setItem('lastName', this.playerName);
    Preloader.on();
    await this.resource.load(ResourceConfig);
    Preloader.off();
    this.initialize();
    this.gameLoop();
  }

  initialize() {
    this.canvas = document.createElement('canvas');
    this.scale = document.documentElement.clientWidth / GameManagerConfig.defaultScreenSize.x;
    this.canvas.width = document.body.offsetWidth;
    this.canvas.height = GameManagerConfig.defaultScreenSize.y * this.scale;
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.timing = { dt: 0, then: null };
    this.player = Character.create('player', this.resource.resourcesCache, this.timing);
    this.player.name = this.playerName ? this.playerName : 'Secret Warrior';
    this.playerHUD = new HUD(this.player);
    this.round = 0;
    this.score = 0;
    Object.keys(GameManagerConfig.taskCollection)
      .forEach((key) => { this.tasks[key] = GameManagerConfig.taskCollection[key]; });
    this.roundInitialize();
    this.gameLoop = this.gameLoop.bind(this);
    this.actionDialog = ActionDialog.initialize(this.player.abilities);
    if ((localStorage.getItem('mute') === 'true')) this.mute = true;
    else this.mute = false;
    this.musicToggle();
    this.addListeners();
  }

  musicToggle() {
    this.resource.resourcesCache.sounds.bgmusic.loop = true;
    this.resource.resourcesCache.sounds.bgmusic.volume = 0.05;
    if (!this.mute) this.resource.resourcesCache.sounds.bgmusic.play();
    else this.resource.resourcesCache.sounds.bgmusic.pause();
  }

  static getEnemyName() {
    const adjective = GameManager
      .getRandomArrItem(GameManagerConfig.enemyNameCollection.adjectives);
    const type = GameManager.getRandomArrItem(GameManagerConfig.enemyNameCollection.types);
    const name = GameManager.getRandomArrItem(GameManagerConfig.enemyNameCollection.names);
    return `${adjective} ${type} ${name}`;
  }

  static getRandomArrItem(arr) {
    const length = arr.length;
    return arr[Math.floor(Math.random() * length)];
  }

  addListeners() {
    window.addEventListener('resize', () => {
      this.scale = document.documentElement.clientWidth / GameManagerConfig.defaultScreenSize.x;
      this.canvas.width = document.body.offsetWidth;
      this.canvas.height = GameManagerConfig.defaultScreenSize.y * this.scale;
      this.backgroundImg = this.environment.render(this.scale);
    });
    this.keyUpListener = this.keyUpListener.bind(this);
    document.addEventListener('keyup', this.keyUpListener);
  }

  keyUpListener(e) {
    if (e.keyCode === KeyCode.KEY_SPACE && !this.modalOpen) {
      if (!this.inputLock) {
        this.getTask();
      }
    }
    if (e.keyCode === KeyCode.KEY_ESCAPE && !this.modalOpen) {
      this.setPause();
    }
  }

  gameOver() {
    this.addToScoreBoard();
    ScoreBoard.score(true)
      .then(() => {
        document.body.removeChild(this.canvas);
        this.resource.resourcesCache.sounds.bgmusic.pause();
        document.removeEventListener('keyup', this.keyUpListener);
        this.start();
      });
  }

  setPause() {
    this.pause = true;
    this.modalOpen = true;
    PauseDialog.pause()
      .then(async (data) => {
        if (data === 'home') {
          cancelAnimationFrame(this.requestID);
          this.addToScoreBoard();
          document.body.removeChild(this.canvas);
          this.canvas.style.display = 'none';
          this.homeScreen.forEach(key => key.style.display = 'block');
          document.removeEventListener('keyup', this.keyUpListener);
          this.resource.resourcesCache.sounds.bgmusic.pause();
        }
        if (data === 'score') {
          if (!await ScoreBoard.score()) this.setPause();
        }
        if (data === 'mute') {
          this.mute = !this.mute;
          localStorage.setItem('mute', this.mute);
          this.musicToggle();
          this.setPause();
        }
      })
      .catch(() => {
        this.pause = false;
        if (!this.currAction) this.inputLock = false;
        this.modalOpen = false;
      });
  }

  getTask() {
    this.modalOpen = true;
    this.pause = true;
    this.inputLock = true;
    this.actionDialog.pickAction()
      .then(
        async (action) => {
          const task = GameManager.getRandomArrItem(Object.keys(this.tasks));
          if (task) {
            const result = await this.tasks[task].ask();
            if (result) return action;
            return false;
          } return action;
        },
      )
      .then((result) => {
        this.pause = false;
        if (result) {
          this.action(this.player.abilities[result], this.enemy);
          this.score += 1;
        } else {
          const key = GameManager.getRandomArrItem(Object.keys(this.enemy.abilities));
          this.action(this.enemy.abilities[key], this.player);
        }
        this.modalOpen = false;
      })
      .catch(() => {
        this.pause = false;
        if (!this.currAction) this.inputLock = false;
        this.modalOpen = false;
      });
  }

  gameLoop() {
    const now = Date.now();
    this.timing.dt = (now - this.timing.then) / 1000;
    if (!this.pause) {
      this.player.actions.standByAnimation();
      this.enemy.actions.standByAnimation();
      this.action();
      if (this.player.state.currHealth <= 0 && !this.currAction) {
        this.inputLock = true;
        this.player.actions.lose();
        this.enemy.actions.win();
        if (this.enemy.actions.win()) this.serviceCounter++;
        if (this.serviceCounter > 5) {
          this.pause = true;
          this.gameOver();
        }
      }
      if (this.enemy.state.currHealth <= 0 && !this.currAction) {
        this.inputLock = true;
        this.enemy.actions.lose();
        if (this.player.actions.win()) this.serviceCounter++;
        if (this.serviceCounter > 5) {
          this.pause = true;
          this.roundInitialize();
        }
      }
    }
    this.render();
    this.timing.then = now;
    this.requestID = requestAnimationFrame(this.gameLoop);
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const player = this.player.render(this.scale);
    const enemy = this.enemy.render(this.scale);
    const playerHUD = this.playerHUD.render(this.scale);
    const enemyHUD = this.enemyHUD.render(this.scale);
    this.context.drawImage(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height,
      0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(playerHUD, 0, 0, this.canvas.width, this.canvas.height,
      0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(enemyHUD, 0, 0, this.canvas.width, this.canvas.height,
      this.canvas.width - enemyHUD.width, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(player, 0, 0, player.width, player.height,
      Math.round(this.player.state.posX * this.scale),
      Math.round(this.player.state.posY * this.scale), player.width, player.height);
    this.context.drawImage(enemy, 0, 0, enemy.width, enemy.height,
      Math.round(this.enemy.state.posX * this.scale),
      Math.round(this.enemy.state.posY * this.scale), enemy.width, enemy.height);
    this.context.fillStyle = 'rgb(212,75,56)';
    this.context.font = `${20 * this.scale}px Russo One`;
    this.context.textAlign = 'center';
    this.context.fillText(`Round: ${this.round}  Score: ${this.score}`, this.canvas.width / 2, 50 * this.scale);
  }

  addToScoreBoard() {
    let scoreObj = null;
    if (localStorage.getItem('scoreboard')) {
      scoreObj = JSON.parse(localStorage.getItem('scoreboard'));
      if (!(this.score < scoreObj[9])) {
        const newScoreObj = scoreObj.concat([{ name: this.player.name, score: this.score }]);
        newScoreObj.sort((a, b) => b.score - a.score);
        if (newScoreObj.length > 10) newScoreObj.length = 10;
        localStorage.setItem('scoreboard', JSON.stringify(newScoreObj));
      }
    } else {
      scoreObj = [{ name: this.player.name, score: this.score }];
      localStorage.setItem('scoreboard', JSON.stringify(scoreObj));
    }
  }

  roundInitialize() {
    this.serviceCounter = 0;
    this.player.restore();
    this.round += 1;
    const healtOld = this.player.state.health;
    this.player.state.health = ((this.round - 1) * 10 + 100);
    this.player.state.currHealth *= this.player.state.health / healtOld;
    this.enemy = Character.create('enemy', this.resource.resourcesCache, this.timing);
    this.enemy.name = GameManager.getEnemyName();
    this.enemy.state.health = ((this.round - 1) * 20 + 100);
    this.enemy.state.currHealth = this.enemy.state.health;
    this.enemyHUD = new HUD(this.enemy, 'right');
    this.environment = Environment.create(this.resource.resourcesCache,
      GameManagerConfig.groundLvl,
      GameManagerConfig.defaultScreenSize.x,
      GameManagerConfig.defaultScreenSize.y);
    this.backgroundImg = this.environment.render(this.scale);
    this.pause = false;
    this.inputLock = false;
    this.modalOpen = false;
  }

  action(action, ...arg) {
    if (arguments.length) {
      this.currAction = action.bind(null, ...arg);
    } else if (this.currAction) {
      if (this.currAction()) {
        this.inputLock = false;
        this.currAction = null;
      }
    }
  }
}
