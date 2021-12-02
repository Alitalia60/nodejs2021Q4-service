const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'task 1',
    order = 1,
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  updateTask({ title, order, userId, boardId, columnId }) {
    this.title = title;
    this.order = order;
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
