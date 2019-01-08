import './ModalWindow.css';

export default class ModalWindow {
  constructor() {
    this.coverElement = null;
    this.containerElement = null;
    this.modalWindowToggle =  this.modalWindowToggle.bind(this);
  }

  static initilize() {
    const modalWindow = new ModalWindow();
    modalWindow.coverElement = document.createElement('div');
    modalWindow.coverElement.classList.add('modal-window__cover-element');
    modalWindow.containerElement = document.createElement('div');
    modalWindow.containerElement.classList.add('modal-window__container');
    modalWindow.coverElement.appendChild(modalWindow.containerElement);
    document.body.appendChild(modalWindow.coverElement);
    return modalWindow;
  }

  modalWindowToggle() {
    if (this.containerElement.childElementCount) {
      this.coverElement.style.display = 'block';
    } else {
      this.coverElement.style.display = 'none';
    }
  }
}

const modalWindow = ModalWindow.initilize();
const observer = new MutationObserver(modalWindow.modalWindowToggle);
observer.observe(modalWindow.containerElement,
  { attributes: true, childList: true, subtree: true });
