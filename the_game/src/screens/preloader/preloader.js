import template from './preloader.template.js';
import './preloader.css';


export default class Preloader {
  static on() {
    const preloader = document.getElementById('loader');
    preloader.classList.remove('done');
    document.body.style.overflow = 'hidden';
  }

  static off() {
    const preloader = document.getElementById('loader');
    // setTimeout(() => {
      preloader.classList.add('done');
      document.body.style.overflow = '';
    // }, 1000);
  }
}

const preloader = document.createElement('div');
document.body.appendChild(preloader);
preloader.outerHTML = template;
Preloader.on();
window.addEventListener('load', () => Preloader.off());
