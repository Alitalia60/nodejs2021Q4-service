const { v4: uuidv4 } = require('uuid');

//TODO not comleted
module.exports = class Column {
  constructor({ id = uuidv4(), title = 'Backlog', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { id, title, columns } = column;
    return { id, title, columns };
  }
};
