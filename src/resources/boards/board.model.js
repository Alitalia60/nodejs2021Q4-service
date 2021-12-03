const { v4: uuidv4 } = require('uuid');

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
    this.columns = columns;
  }
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
};
