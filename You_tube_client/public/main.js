/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import SearchLine from './SearchLine';
import Slider from './Slider';
import YouTubeRequest from './YouTubeRequest';
import Swiper from './Swiper';
import KeybordControl from './KeybordControl';

const request = new YouTubeRequest();
const searchLine = new SearchLine();
const slider = new Slider(request);
const swipe = new Swiper(slider, slider.pageLeft, slider.pageRight, slider.slideBar);
swipe.addSwipeListeners(window);
// eslint-disable-next-line no-unused-vars
const keybordControl = new KeybordControl(slider, { 37: slider.pageLeft, 39: slider.pageRight });


searchLine.render('body');
searchLine.searchForm.addEventListener('submit',
  (event) => {
    event.preventDefault();
    request.free();
    slider.free();
    request.search(searchLine.getValue())
      .then(searchResultList => slider.getCollection(searchResultList));
  });

window.addEventListener('resize', () => {
  let timer;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => slider.pagination(true), 60);
});

window.addEventListener('deviceorientation', () => {
  let timer;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => slider.pagination(true), 60);
});

document.addEventListener('click', clickEvent => slider.clickHandler(clickEvent));
