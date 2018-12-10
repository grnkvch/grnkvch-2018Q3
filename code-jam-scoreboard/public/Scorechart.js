import Chart from 'chart.js';

export default class Scorechart {
  constructor() {
    this.chartCanvas = null;
    this.chart = null;
    this.colorsSet = new Set();
    this.dataCollection = null;
    this.chartConfig = null;
  }

  init(chartCanvasElement, dataCollection) {
    this.chartCanvas = chartCanvasElement;
    this.dataCollection = dataCollection;
    const ctx = this.chartCanvas;
    this.setChartConfig(dataCollection);
    this.chart = new Chart(ctx, this.chartConfig);
    this.chart.update();
  }

  setChartConfig(dataCollection) {
    this.dataCollection = dataCollection;
    if (!this.chart) {
      this.chartConfig = {
        type: 'line',
        data: {
          labels: dataCollection[0].rounds.slice(),
          datasets: [],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    } else {
      this.chartConfig.data.labels = dataCollection[0].rounds.slice();
      this.chartConfig.data.datasets = [];
      this.chart.update();
    }
  }

  addDataSet(index) {
    const color = this.randomColor();
    const newDataSet = {
      label: this.dataCollection[index].name,
      data: this.dataCollection[index].rounds.map(item => item.time),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 2,
      fill: false,
    };
    this.chartConfig.data.datasets.push(newDataSet);
    this.chart.update();
  }

  removeDataSet(index) {
    const name = this.dataCollection[index].name;
    const nameArr = this.chartConfig.data.datasets.map((item)=>item.label)
    const nameIndex = nameArr.indexOf(name);
    this.chartConfig.data.datasets.splice(nameIndex, 1);
    this.chart.update();
  }

  randomColor() {
    const arr = ['00', '33', '66', '99', 'CC', 'FF'];
    let color = null;
    do {
     color = `#${Math.floor(Math.random() * arr.length)}${Math.floor(Math.random() * arr.length)}${Math.floor(Math.random() * arr.length)}`;
    } while (this.colorsSet.has(color));
    this.colorsSet.add(color);
    return color;
  }
}
