const Router = require('koa-router');
const {
  getTask,
  getTaskList,
  addTask,
  updTask,
  delTask,
} = require('./task.service');
const koaBody = require('koa-body');
const { checkStructureTask } = require('../../common/checkStructure');

const taskRouter = new Router();

//Tasks-------------------------------
//*  OK  1.  GET boards/:boardId/tasks
taskRouter.get('/boards/:boardId/tasks', async (ctx, next) => {
  // console.log(ctx.params);
  ctx.set('content-type', 'application/json');
  getTaskList(ctx);
  next();
});

//*  OK 2. GET boards/:boardId/tasks/:taskId - get the task by id
taskRouter.get(
  '/boards/:boardId/tasks/:taskId',
  koaBody(),
  async (ctx, next) => {
    ctx.set('content-type', 'application/json');
    getTask(ctx);
    next();
  }
);

//* OK  3.  POST boards/:boardId/tasks - create task
taskRouter.post('/boards/:boardId/tasks', koaBody(), async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    // ctx.throw(400, "not 'application/json");
    return;
  }
  if (!checkStructureTask(ctx.request.body)) {
    // ctx.throw(400, "structure of Task not valid");
    ctx.status = 400;
    ctx.response.body = 'incorrect structure of Task';
    return;
  }
  ctx.response.body = addTask(ctx);
  ctx.set('content-type', 'application/json');
  ctx.status = 201;
});

//*  OK  4. PUT /boards/:boardId/tasks/:taskId - update task
taskRouter.put(
  '/boards/:boardId/tasks/:taskId',
  koaBody(),
  async (ctx, next) => {
    if (!ctx.is('application/json')) {
      ctx.status = 400;
      ctx.response.body = "not 'application/json";
      return;
    }
    if (!checkStructureTask(ctx.request.body)) {
      ctx.status = 400;
      ctx.response.body = 'incorrect structure of Task';
      return;
    }
    updTask(ctx);
    ctx.set('content-type', 'application/json');
    ctx.response.status = 200;
    next();
  }
);

//* OK 5.  DELETE boards/:boardId/tasks/:taskId - delete task
taskRouter.del(
  '/boards/:boardId/tasks/:taskId',
  koaBody(),
  async (ctx, next) => {
    ctx.set('content-type', 'application/json');
    delTask(ctx);
    next();
  }
);

module.exports = taskRouter;
