import EnvironmentConfig from './EnvironmentConfig';

export default class Environment {
  constructor() {
    this.paltformImg = null;
    this.envCollection = Object.create(null);
    this.resourceChache = null;
    this.sizeX = null;
    this.sizeY = null;
    this.maintaince = Object.create(null);
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  static create(resourceChache, groundLvl, sizeX, sizeY) {
    const envInstance = new Environment();
    envInstance.groundLvl = groundLvl;
    envInstance.resourceChache = resourceChache.images;
    envInstance.sizeX = sizeX;
    envInstance.sizeY = sizeY;
    const keys = Object.keys(EnvironmentConfig.combinations);
    const theme = keys[Environment.getRandomInt(keys.length)];
    envInstance.paltformImg = resourceChache.images.themes[theme][0];
    EnvironmentConfig.combinations[theme]
      .sort((a, b) => {
        let src = EnvironmentConfig.itemsPos;
        if (src[a].overlay > src[b].overlay) return -1;
        else return 1;
      })
      .forEach((item) => {
        envInstance.itemGenerator(item);
      });
    return envInstance;
  }

  itemGenerator(envItem) {
    const elemConfig = EnvironmentConfig.itemsPos[envItem];
    const repeatCount = Environment
      .getRandomInt(elemConfig.countMax - elemConfig.countMin) + elemConfig.countMin;
    const posOptions = {};
    Object.keys(elemConfig.pos).forEach((key) => {
      if (key[0] === '_') {
        posOptions[key.slice(1)] = key[key.length - 1].toLowerCase() === 'x' ? elemConfig.pos[key] / 100 * this.sizeX : elemConfig.pos[key] / 100 * this.sizeY;
      } else posOptions[key] = elemConfig.pos[key];
    });
    const {
      x, y, minX = x || 0, minY = y || 0, maxX = x ? minX : this.sizeX, maxY = y ? minY : this.sizeY,
    } = posOptions;
    for (let i = 0; i < repeatCount; i += 1) {
      const elem = {};
      elem.img = this.resourceChache
        .envElements[envItem][Environment.getRandomInt(this.resourceChache.envElements[envItem]
          .length)];
      let intersect = true;
      let n = 0;
      while (intersect) {
        elem.x = (Environment.getRandomInt(maxX - minX) + minX);
        if (elemConfig.grounded) elem.y = this.groundLvl - elem.img.height;
        else elem.y = (Environment.getRandomInt(maxY - minY) + minY);
        if (elemConfig.overlay) intersect = false;
        else {
          intersect = !Object.keys(this.envCollection)
            .every(item => !Environment.isElemIntersect(elem, this.envCollection[item]));
        }
        n++;
        if (n > 10000) {
          console.log('abort mission');
          intersect = false;
        } 
      }
      this.envCollection[`${envItem}${i}`] = Object.assign(elem, { drawOrder: elemConfig.drawOrder }, { grounded: elemConfig.grounded });
    }
  }

  static isElemIntersect(elem1, elem2) {
    const x = elem1.x;
    const y = elem1.y;
    const r = elem1.x + elem1.img.width;
    const b = elem1.y + elem1.img.height;
    const x2 = elem2.x;
    const y2 = elem2.y;
    const r2 = elem2.x + elem2.img.width;
    const b2 = elem2.y + elem2.img.height;
    return !(r < x2 || x > r2 || b < y2 || y > b2);
  }

  render(scale) {
    const sizeX = this.sizeX;
    const sizeY = this.sizeY;
    const canvas = document.createElement('canvas');
    canvas.width = sizeX * scale;
    canvas.height = sizeY * scale;
    const context = canvas.getContext('2d');
    const keys = Object.keys(this.envCollection);
    context.scale(scale, scale);
    keys.sort((a, b) => this.envCollection[a].drawOrder - this.envCollection[b].drawOrder);
    keys.forEach((key) => {
      const drawParamArr = [
        this.envCollection[key].img.width,
        this.envCollection[key].img.height,
        this.envCollection[key].x,
        this.envCollection[key].y,
        this.envCollection[key].img.width,
        this.envCollection[key].img.height,
      ];
      context.drawImage(this.envCollection[key].img, 0, 0, ...drawParamArr);
    });
    context.fillStyle = context.createPattern(this.paltformImg, 'repeat');
    context.fillRect(0, this.groundLvl, sizeX, this.paltformImg.height);
    return canvas;
  }
}
