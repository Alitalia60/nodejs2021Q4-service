const { v4: uuidv4 } = require('uuid');
const dbColumns = require('../columns/column.memory.repository');
const Column = require('../columns/column.model');

module.exports = class Board {
  constructor({
    title = 'Autotest board',
    columns = [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 },
    ],
  } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }

  updateBoard({ title, columns }) {
    this.title = title;

    //udate columns
    this.columns = [];
    if (columns.length != 0) {
      columns.forEach((element) => {
        let newColumn = dbColumns.find((item) => item.id == element.id);
        if (!newColumn) {
          newColumn = new Column(element);
          dbColumns.push(newColumn);
          this.columns.push(newColumn);
        } else {
          newColumn.updateColumn(element);
        }
      });
    }
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
};
