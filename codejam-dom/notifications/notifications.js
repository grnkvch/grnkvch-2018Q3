let tipMassive = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Suspendisse turpis enim, dapibus in libero vitae, tempor ornare massa.",
                "Morbi feugiat congue nisl, elementum hendrerit elit elementum vel.", 
                "Nullam vel faucibus velit."];
let tipCount = tipMassive.length;

function activate (elem) {
    elem.classList.toggle("active");
}

function setContent (tipMassive) {
    let dotList = document.querySelector(".notifer .navdots");
    let tipList = document.querySelector(".notifer .tipcontainer");

    for (let i=0; i<tipCount; i++) {
        let dotElemArea = document.createElement("li");
        let dotElem = document.createElement("i");
        let tip = document.createElement("div");
        dotElemArea.classList.add("dotarea");
        dotElem.classList.add("dot");
        dotElem.setAttribute("number", i);
        tip.classList.add("tip");
        tip.textContent = tipMassive[i];
        tip.setAttribute("number", i);
        if (i==0) {
            dotElem.classList.add("active");
            tip.classList.add("active");
        }
        dotElemArea.appendChild(dotElem);
        dotList.appendChild(dotElemArea);
        tipList.appendChild(tip);
    }
}

function next () {
    let currElems = document.querySelectorAll(".notifer .active");
    let currElemIndex = parseInt(currElems[0].getAttribute("number"));
    if (currElemIndex<tipCount-1) {
        var nextElems = document.querySelectorAll('.notifer [number="'+(currElemIndex+1)+'"]');
    } else {
        var nextElems = document.querySelectorAll('.notifer [number="'+(0)+'"]');
    } 
    switchTips(currElems, nextElems);
}

function previous () {
    let currElems = document.querySelectorAll(".notifer .active");
    let currElemIndex = parseInt(currElems[0].getAttribute("number"));
    if (currElemIndex>0) {
        var nextElems = document.querySelectorAll('.notifer [number="'+(currElemIndex-1)+'"]');
    } else {
        var nextElems = document.querySelectorAll('.notifer [number="'+(tipCount-1)+'"]');
    }
    switchTips(currElems, nextElems);
}

function switchTips (previous,next) {
    previous.forEach((item)=>activate(item));
    next.forEach((item)=>activate(item));
}

function dotClick (event) {
    let target = event.target;
    while (target != navdots) {
        if (target.tagName == 'LI') {
            let currElems = document.querySelectorAll(".notifer .active");
            let nextElemIndex = parseInt(target.firstElementChild.getAttribute("number"));
            let nextElems = document.querySelectorAll('.notifer [number="'+(nextElemIndex)+'"]');
            switchTips(currElems, nextElems);
            return
        }
        target = target.parentNode;
    }
}

function close () {
    if (notificator.classList.contains("active")) activate(notificator);
}

function toogleNotifer () {
    if (checkBox.checked) {
    localStorage.setItem("disableNotification", "true")
    }
    else localStorage.removeItem("disableNotification");
} 

function showNotification () {
    if (!localStorage.getItem("disableNotification")) activate(notificator);
}

function keybordControl (event) {
    let key = event.keyCode;
    switch (key) {
        case 37:
          previous ();
          break;
        case 39:
          next ();
          break;
        case 27:
          close ();
          break;
      }
}

let notificator = document.querySelector(".notifer");
let closebtn = document.querySelector(".notifer .close");
let leftarrow = document.querySelector(".notifer .arrow.left");
let rightarrow = document.querySelector(".notifer .arrow.right");
let navdots = document.querySelector(".notifer .navdots");
let checkBox = document.querySelector(".notifer .checkbox input");

leftarrow.addEventListener("click", previous);
rightarrow.addEventListener("click", next);
closebtn.addEventListener("click",close);
navdots.addEventListener("click", dotClick);
checkBox.addEventListener("change", toogleNotifer);
document.addEventListener("DOMContentLoaded", ()=>setContent (tipMassive));
document.addEventListener("keyup", keybordControl);
document.addEventListener("DOMContentLoaded", setTimeout(()=>showNotification(), 5000));