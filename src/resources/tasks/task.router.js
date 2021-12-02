const Router = require('koa-router');
const taskService = require('./task.service');
const koaBody = require('koa-body');
const { checkStructureTask } = require('../../common/checkStructure');

const taskRouter = new Router();

//Tasks-------------------------------
//?
// GET boards/:boardId/tasks
taskRouter.get('/boards/:boardId/tasks', async (ctx, next) => {
  // console.log(ctx.params);
  ctx.set('content-type', 'application/json');
  ctx.body = taskService.getTaskList(ctx);
  next();
});

//TODO
taskRouter.get(
  '/boards/:boardId/tasks/:taskId',
  koaBody(),
  async (ctx, next) => {
    ctx.set('content-type', 'application/json');
    taskService.getTask(ctx);
    next();
  }
);

//!!
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
    ctx.response.body = 'structure of Task not valid';
    return;
  }
  ctx.response.body = taskService.addTask(ctx);
  ctx.set('content-type', 'application/json');
  ctx.status = 201;
});

//TODO
taskRouter.put(
  'boards/:boardId/tasks/:taskId',
  koaBody(),
  async (ctx, next) => {
    if (!ctx.is('application/json')) {
      ctx.status = 400;
      ctx.response.body = "not 'application/json";
      return;
    }
    if (!checkStructureTask(ctx.request.body)) {
      ctx.status = 400;
      ctx.response.body = 'structure of Task not valid';
      return;
    }
    taskService.updTask(ctx);
    ctx.set('content-type', 'application/json');
    //   ctx.response.status = 204;
    next();
  }
);

//TODO
taskRouter.del('boards/:boardId/tasks/:taskId', async (ctx, next) => {
  taskService.delTask(ctx);
  next();
});

module.exports = taskRouter;
