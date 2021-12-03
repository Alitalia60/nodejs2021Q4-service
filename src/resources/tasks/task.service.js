const dbTasks = require('./task.memory.repository');
const dbBoards = require('../boards/board.memory.repository');
const Task = require('./task.model');

function getBoardById(id) {
  return dbBoards.find((item) => item.id == id);
}

function findTaskById(id) {
  return dbTasks.find((item) => item.id == id);
}

//* OK
function getTask(ctx) {
  const boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (!board) {
    // console.log(`Not found board ${boardId}`);
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }
  const taskId = ctx.params.taskId;
  const task = findTaskById(taskId);
  if (task) {
    ctx.body = JSON.stringify(task);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.status = 404;
  }
}

//* OK
function getTaskList(ctx) {
  const boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (!board) {
    // console.log(`Not found board ${boardId}`);
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }
  ctx.status = 200;
  ctx.body = JSON.stringify(dbTasks.filter((item) => item.boardId == boardId));
}

//* OK
function addTask(ctx) {
  const boardId = ctx.params.boardId;
  ctx.request.body.boardId = boardId;
  try {
    let board = getBoardById(boardId);
    if (!board) {
      ctx.body = JSON.stringify(`Not found board ${boardId}`);
      ctx.status = 404;
      return;
    }
    const newTask = new Task(ctx.request.body);
    dbTasks.push(newTask);
    ctx.status = 201;
    return JSON.stringify(newTask);
  } catch (error) {
    ctx.body = JSON.stringify(`Error creating Task`);
    ctx.status = 500;
    // console.log(`error creating Task`, error);
  }
}

//* OK
function updTask(ctx) {
  const taskId = ctx.params.taskId;

  const boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (!board) {
    // console.log(`Not found board ${boardId}`);
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }

  let task = findTaskById(taskId);
  if (task) {
    //do not change boardID !!
    ctx.request.body.boardId = boardId;
    task.updateTask(ctx.request.body);
    ctx.body = JSON.stringify(task);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.status = 404;
  }
}

//* OK
function delTask(ctx) {
  const taskId = ctx.params.taskId;
  let task = findTaskById(taskId);
  if (task) {
    dbTasks.splice(dbTasks.indexOf(task), 1);
    ctx.status = 204;
    ctx.body = `Ddeleted tasks id = ${taskId}`;
  } else {
    ctx.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.status = 404;
  }
}

function deleteTasksIfBoardId(boardId) {
  // console.log('before');
  // console.log('dbTask=s', dbTasks);
  let findedTaskIndex;
  do {
    findedTaskIndex = dbTasks.findIndex((item) => dbTasks.boardId == boardId);
    dbTasks.splice(findedTaskIndex);
  } while (findedTaskIndex != -1);

  //after
  // console.log('after');
  // console.log('dbTask=s', dbTasks);
}

module.exports = {
  findTaskById,
  getTask,
  getTaskList,
  updTask,
  addTask,
  delTask,
  deleteTasksIfBoardId,
};
