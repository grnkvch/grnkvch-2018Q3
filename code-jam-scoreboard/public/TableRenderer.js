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

    tableMatrix.forEach((element, index) => {
      const tableRow = document.createElement('tr');
      element.forEach((item, i) => {
        if (index === 0 || i === 0 || i>element.length-3) tableRow.innerHTML += `<td class="result-table__table-data">${item}</td>`;
        else tableRow.innerHTML += `<td class="result-table__table-data result-time">${item.time}<span class="tooltip">${item.code}</span></td>`;
        table.appendChild(tableRow);
      });
    });
  }
}
