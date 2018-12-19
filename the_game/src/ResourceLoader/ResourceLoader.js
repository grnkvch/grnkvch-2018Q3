
export default class ResourceLoader {
  constructor() {
    this.resoursesCache = {};
  }

  static loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => reject(url);
    });
  }

  static loadSection(src, dst) {
    const [keys, length] = [Object.keys(src), Object.keys(src).length];
    let promises = [];
    for (let i = 0; i < length; i += 1) {
      dst[keys[i]] = [];
      promises = promises.concat(src[keys[i]].map(
        url => ResourceLoader.loadImage(url)
          .then(data => dst[keys[i]].push(data), missingUrl => window.console.log(`Cannot find file: ${missingUrl}`)),
      ));
    }
    return promises;
  }

  load(src) {
    let promises = [];
    if (src.images) {
      this.resoursesCache.images = Object.create(null);
      const [keys, length] = [Object.keys(src.images), Object.keys(src.images).length];
      for (let i = 0; i < length; i += 1) {
        this.resoursesCache.images[keys[i]] = Object.create(null);
        promises = promises.concat(ResourceLoader.loadSection(src.images[keys[i]],
          this.resoursesCache.images[keys[i]]));
      }
    }
    return Promise.all(promises).then(() => this.resoursesCache);
  }

  loadThemes(src) {
    if (src.themes) {
      const themes = src.themes;
      const keys = Object.keys(themes);
      const length = keys.length;
      for (let i = 0; i < length; i += 1) {
        if (src.themes[keys[i]].length !== 0) {
          this.resoursesCache.themes[keys[i]] = themes.keys[i].slice();
        }
      }
    }
  }
}
