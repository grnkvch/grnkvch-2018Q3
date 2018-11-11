var tipMassive = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Suspendisse turpis enim, dapibus in libero vitae, tempor ornare massa.",
                "Morbi feugiat congue nisl, elementum hendrerit elit elementum vel.", 
                "Nullam vel faucibus velit."];
var tipCount = tipMassive.length;

function activate (elem) {
    elem.classList.toggle("active");
}

function setContent (tipMassive) {
    let dotList = document.querySelector(".notifer .navdots");
    let tipList = document.querySelector(".tipcontainer");

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
        currElems.forEach((item)=>activate(item));
        let nextElems = document.querySelectorAll('[number="'+(currElemIndex+1)+'"]');
        nextElems.forEach((item)=>activate(item));
    } else {
        currElems.forEach((item)=>activate(item));
        let nextElems = document.querySelectorAll('[number="'+(0)+'"]');
        nextElems.forEach((item)=>activate(item));
    } 
}

function previous () {
    let currElems = document.querySelectorAll(".notifer .active");
    let currElemIndex = parseInt(currElems[0].getAttribute("number"));
    if (currElemIndex>0) {
        currElems.forEach((item)=>activate(item));
        let nextElems = document.querySelectorAll('[number="'+(currElemIndex-1)+'"]');
        nextElems.forEach((item)=>activate(item));
    } else {
        currElems.forEach((item)=>activate(item));
        let nextElems = document.querySelectorAll('[number="'+(tipCount-1)+'"]');
        nextElems.forEach((item)=>activate(item));
    } 
}


let closebtn = document.querySelector(".close");
let leftarrow = document.querySelector(".arrow.left");
let rightarrow = document.querySelector(".arrow.right");

leftarrow.addEventListener("click", previous);
rightarrow.addEventListener("click", next);
closebtn.addEventListener("click",()=>activate(document.querySelector('.notifer')));
document.addEventListener("DOMContentLoaded", ()=>setContent (tipMassive));
document.addEventListener("DOMContentLoaded", setTimeout(()=>activate(document.querySelector('.notifer')),5000));
