export default class SearchLine {
  constructor() {
    this.inputElement = null;
    this.searchForm = null;
  }

  render(selector) {
    const header = document.createElement('header');
    header.innerHTML = `<form class="search-form">
    <input class ="search-form__input" autofocus placeholder="Search">
    <button class ="search-form__button">RUN</button>
    </form>`;
    this.searchForm = header.querySelector('.search-form');
    this.inputElement = header.querySelector('.search-form__input');
    document.querySelector(selector).appendChild(header);
  }

  getValue() {
    return this.inputElement.value;
  }
}