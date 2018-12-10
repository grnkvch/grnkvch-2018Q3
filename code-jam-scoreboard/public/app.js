import UserParser from './UserParser';
import TableRenderer from './TableRenderer';
import SessionParser from './SessionParser';
import Scorechart from './Scorechart';

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


const chartContainer = document.createElement('div');
chartContainer.innerHTML =`<div class="chart-container" style="position: relative; height:40vh; width:80vw">
                            <canvas class="chart-canvas"></canvas>
                          </div>`;
document.body.insertBefore(chartContainer, document.body.querySelector(".session-container").nextElementSibling);

const scorechart = new Scorechart();
scorechart.init(document.body.querySelector('.chart-canvas'), sessionParser.results);



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
        scorechart.setChartConfig(sessionParser.results);
        console.log(sessionParser.results);
      }
    }
    target = target.parentNode;
  }
});

document.querySelector('.result-table').addEventListener('click', (event) => {
  let target = event.target;
  while (target !== event.currentTarget) {
    if (target.tagName === 'INPUT') {
      if (target.checked) {
        if (scorechart.chartConfig.data.datasets.length>9) {
          alert("Ten chart-elements max");
          target.checked = false;
          return;
        }
        scorechart.addDataSet(parseInt(target.value));
      } else {
        scorechart.removeDataSet(parseInt(target.value));
      }
      }
     target = target.parentNode;
    }
  });