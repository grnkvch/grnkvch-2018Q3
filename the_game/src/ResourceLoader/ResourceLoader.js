
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
    const items = src;
    const keys = Object.keys(items);
    const length = keys.length;
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

  loaderManager(src) {
    let promises = [];
    if (src.images) {
      this.resoursesCache.images = Object.create(null);
      const keys = Object.keys(src.images);
      const length = keys.length;
      for (let i = 0; i < length; i += 1) {
        this.resoursesCache.images[keys[i]] = Object.create(null);
        promises = promises.concat(ResourceLoader.loadSection(src.images.characterLimbs,
          this.resoursesCache.images.characterLimbs));
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