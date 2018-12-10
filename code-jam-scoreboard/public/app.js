import UserParser from './UserParser';
import TableRenderer from './TableRenderer';
import SessionParser from './SessionParser';

const userParser = new UserParser();
const tableRenderer = new TableRenderer();
const sessionParser = new SessionParser();

const div = document.createElement('div');
div.className = 'session-container';
dataSesion.forEach((item, i) => {
  div.innerHTML += `
    <label class="session-container__session-items" for="sessionN${i}">
    <input type="radio" id="sessionN${i}" name="session" value="${i}">
    ${item.alias}
    </label>`;
});
let activeSessionIndex = 0;
div.firstElementChild.firstElementChild.checked = true;
document.body.appendChild(div);


const userNames = userParser.parse(dataUsers);
sessionParser.parse(dataSesion, activeSessionIndex, userNames);
let tableToRender = sessionParser.renderPrep();
tableRenderer.render(tableToRender);

console.log(tableToRender);

document.querySelector('.session-container').addEventListener('click', (event) => {
  let target = event.target;
  while (target !== event.currentTarget) {
    if (target.tagName === 'LABEL') {
      target.firstElementChild.checked = true;
      if (target.firstElementChild.value !== activeSessionIndex) {
        activeSessionIndex = target.firstElementChild.value;
        sessionParser.parse(dataSesion, activeSessionIndex, userNames);
        tableToRender = sessionParser.renderPrep();
        tableRenderer.render(tableToRender);
      }
    }
    target = target.parentNode;
  }
});
