const dbTasks = require('./task.memory.repository');
const Task = require('./task.model');

// USER

function findTaskById(id) {
  return dbTasks.find((item) => item.id == id);
}

//!!
exports.getTask = function (ctx) {
  let task = findTaskById(ctx.params.taskId);
  if (task) {
    ctx.body = JSON.stringify(task);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found task ${ctx.params.taskId}`);
    ctx.status = 404;
  }
};

//!!
exports.getTaskList = function (ctx) {
  return JSON.stringify(
    dbTasks.filter((item) => item.boardId == ctx.params.boardId)
  );
};

//!!
exports.addTask = function (ctx) {
  ctx.request.body.boardId = ctx.params.boardId;

  try {
    const newTask = new Task(ctx.request.body);
    dbTasks.push(newTask);
    return JSON.stringify(newTask);
  } catch (error) {
    ctx.body = JSON.stringify(`error creating Task`);
    ctx.status = 500;

    console.log(`error creating Task`, error);
  }
};

//TODO
exports.updTask = function (ctx) {
  let task = findTaskById(ctx.params.taskId);
  if (task) {
    task.updateTask(ctx.request.body);
    ctx.body = JSON.stringify(task);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found task ${ctx.params.taskId}`);
    ctx.status = 404;
  }
};

//TODO
exports.delTask = function (ctx) {
  let task = findTaskById(ctx.params.taskId);
  if (task) {
    dbTasks.splice(dbTasks.indexOf(task), 1);
    ctx.body = `deleted tasks id = ${ctx.params.taskId}`;
  } else {
    ctx.body = JSON.stringify(`not found task ${ctx.params.taskId}`);
    ctx.status = 404;
  }
};
