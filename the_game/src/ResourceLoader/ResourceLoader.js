
export default class ResourceLoader {
  constructor() {
    this.resourcesCache = {};
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
    let promises = [];
    const keys = Object.keys(src);
    keys.forEach((key) => {
      dst[key] = [];
      promises = promises.concat(src[key].map(
        url => ResourceLoader.loadImage(url)
          .then(data => dst[key].push(data), missingUrl => window.console.log(`Cannot find file: ${missingUrl}`)),
      ));
    });
    return promises;
  }

  load(src) {
    let promises = [];
    if (src.sounds) {
      this.resourcesCache.sounds = Object.create(null);
      const keys = Object.keys(src.sounds);
      keys.forEach((key) => {
        let audio = new Promise((resolve) => {
          resolve(this.resourcesCache.sounds[key] = new Audio(src.sounds[key]))
        });
        promises = promises.concat(audio);
      });
    }
    if (src.images) {
      this.resourcesCache.images = Object.create(null);
      const keys = Object.keys(src.images);
      keys.forEach((key) => {
        this.resourcesCache.images[key] = Object.create(null);
        promises = promises.concat(ResourceLoader.loadSection(src.images[key],
          this.resourcesCache.images[key]));
      });
    }
    
    return Promise.all(promises).then(() => this.resourcesCache);
  }
}
