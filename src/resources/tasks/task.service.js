const dbTasks = require('./task.memory.repository');
const dbBoards = require('../boards/board.memory.repository');
const Task = require('./task.model');
const checkRequestStructure = require('../../common/checkStructure');

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
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }
  const taskId = ctx.params.taskId;
  const task = findTaskById(taskId);
  if (task) {
    ctx.response.set('content-type', 'application/json');
    ctx.response.body = JSON.stringify(task);
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
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }
  ctx.status = 200;
  ctx.response.set('content-type', 'application/json');
  ctx.body = JSON.stringify(dbTasks.filter((item) => item.boardId == boardId));
}

//* OK
function addTask(ctx) {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new Task())) {
    console.log('creatung TASK structure of Task not valid');
    ctx.status = 400;
    ctx.response.body = 'incorrect structure of Task';
    return;
  }

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
    ctx.response.set('content-type', 'application/json');

    ctx.response.body = JSON.stringify(newTask);
  } catch (error) {
    ctx.body = JSON.stringify(`Error creating Task`);
    ctx.status = 500;
  }
}

//* OK
function updTask(ctx) {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new Task())) {
    console.log('creatung TASK structure of Task not valid');
    ctx.status = 400;
    ctx.response.body = 'incorrect structure of Task';
    return;
  }

  const taskId = ctx.params.taskId;
  const boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (!board) {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }

  let task = findTaskById(taskId);
  if (task) {
    //do not change boardID !!
    ctx.request.body.boardId = boardId;
    task.updateTask(ctx.request.body);
    ctx.set('content-type', 'application/json');
    ctx.response.status = 200;

    ctx.response.body = JSON.stringify(task);
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
  let findedTaskIndex;
  do {
    findedTaskIndex = dbTasks.findIndex((item) => item.boardId == boardId);
    dbTasks.splice(findedTaskIndex);
  } while (findedTaskIndex != -1);
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
