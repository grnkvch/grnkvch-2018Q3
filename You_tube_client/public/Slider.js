/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
export default class Slider {
  constructor(outerSearchMethod) {
    this.searchMethod = outerSearchMethod;
    this.collection = [];
    this.mainSection = document.createElement('main');
    this.mainSection.classList.add('main-content');
    this.mainSection.innerHTML = `<section class="slide-bar">
                                  <div class="slide-bar__slide-wrapper">

                                  </div>
                                  </section>
                                  <nav class="pagination">
                                    <i class="pagination__arrow-left pagination__icon icon" ></i>
                                    <div class="pagination__dot-container">
                                      <div class="pagination__dot-wrapper">

                                      </div>
                                    </div>
                                    <i class="pagination__arrow-right pagination__icon icon"></i>
                                  </nav>`;
    this.slideBar = this.mainSection.querySelector('.slide-bar__slide-wrapper');
    this.pageBar = this.mainSection.querySelector('.pagination__dot-wrapper');
    this.slidesPerPageCount = null;
    this.pageCount = null;
    this.currentSlide = null;
    this.currentPage = null;
    this.pageBarLeftLim = null;
    this.pageBarRightLim = null;
    this.onLoading = null;
  }

  getCollection(data) {
    const length = data.length;
    for (let i = 0; i < length; i++) {
      const newItem = this.addItem(data[i]);
      this.slideBar.appendChild(newItem);
      this.collection.push(newItem);
    }
    if (!this.currentSlide) {
      document.querySelector('body').appendChild(this.mainSection);
      this.currentSlide = 1;
      this.pagination();
    }
    this.pageCount = Math.ceil(this.collection.length / this.slidesPerPageCount);
  }

  getslideSPerPageCount() {
    const slideBarWidth = this.slideBar.clientWidth;
    switch (slideBarWidth) {
      case 960:
        return 4;
      case 710:
        return 3;
      case 460:
        return 2;
      default:
        return 1;
    }
  }

  pagination(onResize) {
    if (this.slidesPerPageCount === this.getslideSPerPageCount() && onResize) return;
    this.slidesPerPageCount = this.getslideSPerPageCount();
    this.pageBar.innerHTML = '';
    this.pageCount = Math.ceil(this.collection.length / this.slidesPerPageCount);
    this.addPageDots(1, this.pageCount);
    if (!this.currentPage && this.currentSlide != null) {
      this.pageBar.querySelector(':first-child').classList.toggle('active');
      this.currentPage = 1;
      this.pageBarLeftLim = 0;
      this.pageBarRightLim = this.mainSection.querySelector('.pagination__dot-container').clientWidth - 40;
    } else {
      this.currentPage = Math.floor((this.currentSlide - 1) / (this.slidesPerPageCount)) + 1;
      this.pageBar.querySelectorAll('.pagination__dot')[this.currentPage - 1].classList.toggle('active');
      this.currentSlide = (this.currentPage - 1) * this.slidesPerPageCount + 1;
      const currentPos = (this.currentSlide - 1) * 250;
      this.slideBar.style.transform = `translateX(-${currentPos}px)`;
      this.setActivePagePos(onResize);
    }
  }

  setActivePagePos(onResize) {
    const pageBarWidth = this.mainSection.querySelector('.pagination__dot-container').clientWidth;
    const currentPagePos = (this.currentPage - 1) * 40;
    const midPos = pageBarWidth / 2 - 20;
    if (currentPagePos > this.pageBarRightLim || currentPagePos < this.pageBarLeftLim || onResize) {
      this.pageBar.style.transform = `translateX(-${currentPagePos - midPos}px)`;
      this.pageBarRightLim = currentPagePos + midPos;
      this.pageBarLeftLim = currentPagePos - midPos;
    }
    if (currentPagePos < midPos - 20) {
      this.pageBar.style.transform = 'translateX(0px)';
      this.pageBarLeftLim = 0;
      this.pageBarRightLim = pageBarWidth - 40;
    }
  }

  addPageDots(start, end) {
    for (let i = start; i <= end; i++) {
      const newDot = document.createElement('i');
      newDot.classList.add('pagination__dot');
      newDot.innerText = i;
      this.pageBar.appendChild(newDot);
    }
  }

  pageRight() {
    if (this.onLoading) return;
    if (this.currentPage < (Math.ceil(this.collection.length / this.slidesPerPageCount))) {
      this.switchPage(1);
    }
    if ((this.pageCount - this.currentPage) < (2 * this.slidesPerPageCount)) this.preload();
  }

  pageLeft() {
    if (this.currentSlide > 1) {
      this.switchPage(-1);
    }
  }

  switchPage(direction) {
    const currentPos = (this.currentSlide - 1) * 250;
    this.slideBar.style.transform = `translateX(-${currentPos + direction * 250 * this.slidesPerPageCount}px)`;
    this.currentSlide += this.slidesPerPageCount * direction;
    this.pageBar.querySelectorAll('.pagination__dot')[this.currentPage - 1].classList.toggle('active');
    this.currentPage += direction;
    this.pageBar.querySelectorAll('.pagination__dot')[this.currentPage - 1].classList.toggle('active');
    this.setActivePagePos();
  }

  setPage(index) {
    this.currentSlide = this.slidesPerPageCount > 1 ? index * this.slidesPerPageCount + 1
      : index * this.slidesPerPageCount + 1;
    this.pagination();
    if ((this.pageCount - this.currentPage) < (2 * this.slidesPerPageCount)) this.preload();
  }

  // eslint-disable-next-line class-methods-use-this
  addItem(content) {
    const slide = document.createElement('figure');
    slide.classList.add('slide');
    slide.innerHTML = `
                      <a class="slide__title" href="${content.url}" target="_blank">${content.title}</a>
                      <div class="slide__img-wrapper"><img class="slide__preview" src="${content.thumbnailUrl}" alt=""></div>
                      <span class="slide__author slide__details"><i class="icon"></i>${content.author}</span>
                      <span class="slide__publication-date slide__details"><i class="icon"></i>${content.publishedAt.toLocaleDateString('ru-RU')}</span>
                      <span class="slide__view-rate slide__details"><i class="icon"></i>${content.viewCount}</span>
                      <span class="slide__description slide__details"><i class="icon"></i>${content.description}</span>
                      `;
    return slide;
  }

  clickHandler(clickEvent) {
    const target = clickEvent.target;
    if (target.classList[0] === 'pagination__arrow-right') this.pageRight();
    if (target.classList[0] === 'pagination__arrow-left') this.pageLeft();
    // eslint-disable-next-line radix
    if (target.classList[0] === 'pagination__dot') this.setPage(parseInt(target.innerText) - 1);
  }

  free() {
    this.collection = [];
    this.currentSlide = null;
    this.currentPage = null;
    this.slidesPerPageCount = null;
    this.pageCount = null;
    this.pageBarLeftLim = null;
    this.pageBarRightLim = null;
    this.mainSection.querySelector('.slide-bar__slide-wrapper').innerHTML = '';
    this.mainSection.querySelector('.pagination__dot-wrapper').innerHTML = '';
    this.mainSection.querySelector('.pagination__dot-wrapper').style = '';
  }

  preload() {
    this.onLoading = true;
    const oldPageCount = this.pageCount;
    this.searchMethod.search.apply(this.searchMethod)
      .then((searchResultList) => {
        this.getCollection(searchResultList);
        this.addPageDots(oldPageCount + 1, this.pageCount);
        this.onLoading = null;
      });
  }
}