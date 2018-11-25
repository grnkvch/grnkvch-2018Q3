export default class Swiper {
  constructor(controlledElement, onLeftMethod, onRightMethod, touchMoveElement) {
  this.touchstartX = 0;
  this.touchstartY = 0;
  this.touchendX = 0;
  this.touchendY = 0;
  this.controlledElement = controlledElement;
  this.onLeftMethod = onLeftMethod;
  this.onRightMethod = onRightMethod;
  this.touchMoveElement = touchMoveElement;
  this.touch = null;
  }

  addSwipeListeners(touchArea) {
    touchArea.addEventListener('mousedown', (event)=> {this.swipeStart(event)}, false);
    touchArea.addEventListener('mouseup', (event)=> {this.swipeEnd(event)}, false);
    touchArea.addEventListener('touchstart', (event)=> {this.swipeStart(event)}, false);
    touchArea.addEventListener('touchend', (event)=> {this.swipeEnd(event)}, false);
    touchArea.addEventListener('touchmove', (event)=> {this.moveElement(event)}, false);
    touchArea.addEventListener('mousemove', (event)=> {this.moveElement(event)}, false);
  }

  swipeStart(event) {
    this.touch = true;
    this.touchstartX = event.screenX ? event.screenX : event.changedTouches[0].screenX;
  }

  swipeEnd(event) {
    this.touchendX = event.screenX ? event.screenX : event.changedTouches[0].screenX;
    this.touch = false;
    this.touchMoveElement.style.cssText = ``;
    this.swipeHandle();
  }

  moveElement(){
    if (this.touch) {
      let currentX = event.screenX ? event.screenX : event.changedTouches[0].screenX;
      this.touchMoveElement.style.transition = "all 0s";
      this.touchMoveElement.style.marginLeft=`${currentX - this.touchstartX}px`;
    }
  }

  swipeHandle() {
    if (this.touchendX > this.touchstartX) {
      this.onLeftMethod.apply(this.controlledElement)
    }
    if (this.touchendX < this.touchstartX) {
      this.onRightMethod.apply(this.controlledElement)
    }
  }
}