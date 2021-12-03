const { getBoardById } = require('../boards/board.service');
const dbTasks = require('./task.memory.repository');
const Task = require('./task.model');

function findTaskById(id) {
  return dbTasks.find((item) => item.id == id);
}

//* OK
function getTask(ctx) {
  let task = findTaskById(ctx.params.taskId);
  if (task) {
    ctx.body = JSON.stringify(task);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found task ${ctx.params.taskId}`);
    ctx.status = 404;
  }
}

//* OK
function getTaskList(ctx) {
  let board = getBoardById(ctx.params.boardId);
  if (!board) {
    ctx.body = JSON.stringify(
      `GET tasks: not found board ${ctx.params.boardId}`
    );
    ctx.status = 404;
    return;
  }
  return JSON.stringify(
    dbTasks.filter((item) => item.boardId == ctx.params.boardId)
  );
}

//* OK
function addTask(ctx) {
  ctx.request.body.boardId = ctx.params.boardId;
  try {
    //TODO  check if exist Board
    let board = getBoardById(ctx.params.boardId);
    if (!board) {
      ctx.body = JSON.stringify(
        `ADD task: not found board ${ctx.params.boardId}`
      );
      ctx.status = 404;
      return;
    }
    const newTask = new Task(ctx.request.body);
    dbTasks.push(newTask);
    return JSON.stringify(newTask);
  } catch (error) {
    ctx.body = JSON.stringify(`error creating Task`);
    ctx.status = 500;

    console.log(`error creating Task`, error);
  }
}

//TODO
function updTask(ctx) {
  let task = findTaskById(ctx.params.taskId);
  if (task) {
    task.updateTask(ctx.request.body);
    ctx.body = JSON.stringify(task);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found task ${ctx.params.taskId}`);
    ctx.status = 404;
  }
}

//* OK
function delTask(ctx) {
  let task = findTaskById(ctx.params.taskId);
  if (task) {
    dbTasks.splice(dbTasks.indexOf(task), 1);
    ctx.body = `deleted tasks id = ${ctx.params.taskId}`;
  } else {
    ctx.body = JSON.stringify(`not found task ${ctx.params.taskId}`);
    ctx.status = 404;
  }
}

module.exports = {
  findTaskById,
  getTask,
  getTaskList,
  updTask,
  addTask,
  delTask,
};
