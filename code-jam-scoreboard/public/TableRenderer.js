export default class TableRenderer {
  render(tableMatrix) {
    let table = null;
    if (document.querySelector('.result-table')) {
      table = document.querySelector('.result-table');
      table.innerHTML = '';
    } else{
      table = document.createElement('table');
      table.classList.add('result-table');
      document.body.appendChild(table);
    }

    tableMatrix.forEach((element) => {
      const tableRow = document.createElement('tr');
      element.forEach((item) => {
        tableRow.innerHTML += `<td>${item}</td>`;
        table.appendChild(tableRow);
      });
    });
  }
}
