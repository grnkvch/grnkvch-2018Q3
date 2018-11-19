/* eslint-disable linebreak-style */
class SearchLine {
  constructor() {

  }

  render(selector) {
    const header = document.createElement('header');
    header.innerHTML = '<form class="search-form"><input class ="search-form__input" autofocus placeholder="Search"><button class ="search-form__button">RUN</button></form>';
    document.querySelector(selector).appendChild(header);
  }
}

const searchLine1 = new SearchLine();
searchLine1.render('body');
