import CharacterConfig from './CharacterConfig';

export default class Character {
  constructor() {
    this.model = Object.create(null);
    this.sounds = Object.create(null);
    this.state = {
      limbsPos: Object.create(null),
      drawOrder: Object.create(null),
    };
    this.timing = null;
  }

  static getConfig(configSet, dstObj, superObj, ...restricted) {
    const keys = Object.keys(configSet);
    keys.forEach((key) => {
      if (restricted.includes(key)) return;
      if (typeof configSet[key] === 'object') {
        Character.getConfig(configSet[key],
          dstObj[key] ? dstObj[key] : dstObj[key] = Object.create(null), superObj);
      } else if (typeof configSet[key] === 'function') configSet[key].call(superObj);
      else dstObj[key] = configSet[key];
    });
  }

  static create(type, resourceChache, timingObj) {
    const charInstance = new Character();
    const srcLimbs = resourceChache.images.characterLimbs;
    const configSet = CharacterConfig[type];
    const characterLimbs = Object.keys(configSet.model);
    characterLimbs.forEach((limb) => {
      charInstance.model[limb] = srcLimbs[limb][Character.getRandomInt(srcLimbs[limb].length)];
      charInstance.state.limbsPos[limb] = {
        x: configSet.model[limb].x,
        y: configSet.model[limb].y,
      };
    });
    if (configSet.sounds) {
      const characterSounds = Object.keys(configSet.sounds);
      characterSounds.forEach((sound) => {
        charInstance.sounds[sound] = resourceChache.sounds[sound];
      });
    }
    Character.getConfig(configSet, charInstance, charInstance, 'model', 'sounds');
    charInstance.state.currHealth = charInstance.state.health;
    charInstance.stateStorage();
    charInstance.timing = timingObj;
    return charInstance;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  render(scale) {
    const sizeX = this.modelSize.x;
    const sizeY = this.modelSize.y;
    const canvas = document.createElement('canvas');
    canvas.width = sizeX * scale;
    canvas.height = sizeY * scale;
    const context = canvas.getContext('2d');
    context.scale(this.state.facingDirection * scale, scale);
    const keys = Object.keys(this.state.drawOrder);
    keys.sort((a, b) => this.state.drawOrder[a] - this.state.drawOrder[b]);
    keys.forEach((key) => {
      const drawParamArr = [
        this.state.limbsPos[key].x,
        this.state.limbsPos[key].y,
        sizeX,
        sizeY,
        0, 0,
        this.state.facingDirection * sizeX,
        sizeY,
      ];
      context.drawImage(this.model[key], ...drawParamArr);
    });
    return canvas;
  }

  stateStorage() {
    let savedState = null;
    const initState = JSON.parse(JSON.stringify(this.state));
    this.save = () => {
      const temp = JSON.stringify(this.state);
      savedState = JSON.parse(temp);
      return JSON.parse(temp);
    };
    this.restore = (stateObj) => {
      if (typeof stateObj === 'object') this.state = JSON.parse(JSON.stringify(stateObj));
      else if (savedState) this.state = JSON.parse(JSON.stringify(savedState));
    };
    this.restoreInit = () => {
      this.state = JSON.parse(JSON.stringify(initState));
    };
  }
}
