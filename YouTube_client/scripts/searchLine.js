/* eslint-disable linebreak-style */
export default class searchLine {
  constructor() {
    this.ret = 'asdasd';
  }

  render(selector) {
    const header = document.createElement('header');
    header.innerHTML = '<form class="search-form"><input class ="search-form__input" autofocus placeholder="Search"><button class ="search-form__button">RUN</button></form>';
    document.querySelector(selector).appendChild(header);
  }
}
