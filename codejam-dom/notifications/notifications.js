/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const tips = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Donec eget velit eu sem consectetur molestie ut ut eros. Cras ut sapien sed nisi placerat vestibulum sit amet vel justo. Proin facilisis lorem vitae maximus vulputate. Aliquam suscipit mi nec eros dictum tempus. Praesent viverra mi nec viverra ultricies.',
  'Morbi feugiat congue nisl, elementum hendrerit elit elementum vel.',
  'Nullam vel faucibus velit.',
  'Cras ut sapien sed nisi placerat vestibulum sit amet vel justo.',
  'Proin facilisis lorem vitae maximus vulputate.',
  'Aliquam suscipit mi nec eros dictum tempus.',
  'Praesent viverra mi nec viverra ultricies.',
  'Nunc vel mi a leo tristique molestie.',
  'Pellentesque commodo felis sagittis, pellentesque ante vitae, scelerisque lectus.'];

const tipCount = tips.length > 9 ? 9 : tips.length;

const notificator = document.querySelector('.notifer');
const closebtn = document.querySelector('.notifer .close');
const leftarrow = document.querySelector('.notifer .arrow.left');
const rightarrow = document.querySelector('.notifer .arrow.right');
const navdots = document.querySelector('.notifer .navdots');
const checkBox = document.querySelector('.notifer .checkbox input');

function activate(elem) {
  elem.classList.toggle('active');
}

function setContent(tiparr) {
  const dotList = document.querySelector('.notifer .navdots');
  const tipList = document.querySelector('.notifer .tipcontainer');

  for (let i = 0; i < tipCount; i++) {
    const dotElemArea = document.createElement('li');
    const dotElem = document.createElement('i');
    const tip = document.createElement('div');
    dotElemArea.classList.add('dotarea');
    dotElem.classList.add('dot');
    dotElem.setAttribute('number', i);
    tip.classList.add('tip');
    tip.textContent = tiparr[i];
    tip.setAttribute('number', i);
    if (i === 0) {
      dotElem.classList.add('active');
      tip.classList.add('active');
    }
    dotElemArea.appendChild(dotElem);
    dotList.appendChild(dotElemArea);
    tipList.appendChild(tip);
  }
}

function switchTips(previousitem, nextitem) {
  previousitem.forEach(item => activate(item));
  nextitem.forEach(item => activate(item));
}

function next() {
  const currElems = document.querySelectorAll('.notifer .active');
  const currElemIndex = parseInt(currElems[0].getAttribute('number'));
  let nextElems;
  if (currElemIndex < tipCount - 1) {
    nextElems = document.querySelectorAll(`.notifer [number="${currElemIndex + 1}"]`);
  } else {
    nextElems = document.querySelectorAll(`.notifer [number="${0}"]`);
  }
  switchTips(currElems, nextElems);
}

function previous() {
  const currElems = document.querySelectorAll('.notifer .active');
  const currElemIndex = parseInt(currElems[0].getAttribute('number'));
  let nextElems;
  if (currElemIndex > 0) {
    nextElems = document.querySelectorAll(`.notifer [number="${currElemIndex - 1}"]`);
  } else {
    nextElems = document.querySelectorAll(`.notifer [number="${tipCount - 1}"]`);
  }
  switchTips(currElems, nextElems);
}

function dotClick(event) {
  let target = event.target;
  while (target !== navdots) {
    if (target.tagName === 'LI') {
      const currElems = document.querySelectorAll('.notifer .active');
      const nextElemIndex = parseInt(target.firstElementChild.getAttribute('number'));
      const nextElems = document.querySelectorAll(`.notifer [number="${nextElemIndex}"]`);
      switchTips(currElems, nextElems);
      return;
    }
    target = target.parentNode;
  }
}

function close() {
  if (notificator.classList.contains('active')) activate(notificator);
}

function toogleNotifer() {
  if (checkBox.checked) {
    localStorage.setItem('disableNotification', 'true');
  } else localStorage.removeItem('disableNotification');
}

function showNotification() {
  if (!localStorage.getItem('disableNotification')) activate(notificator);
}

function keybordControl(event) {
  const key = event.keyCode;
  switch (key) {
    case 37:
      previous();
      break;
    case 39:
      next();
      break;
    case 27:
      close();
      break;
  }
}

leftarrow.addEventListener('click', previous);
rightarrow.addEventListener('click', next);
closebtn.addEventListener('click', close);
navdots.addEventListener('click', dotClick);
checkBox.addEventListener('change', toogleNotifer);
document.addEventListener('DOMContentLoaded', () => setContent(tips));
document.addEventListener('keyup', keybordControl);
document.addEventListener('DOMContentLoaded', setTimeout(() => showNotification(), 5000));
