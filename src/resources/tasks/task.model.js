const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    title = 'Autotest task',
    order = 0,
    description = 'Lorem ipsum',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  updateTask({ title, order, description, userId, boardId, columnId }) {
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, userId, boardId, columnId } = task;
    return { id, title, order, userId, boardId, columnId };
  }
}

module.exports = Task;
