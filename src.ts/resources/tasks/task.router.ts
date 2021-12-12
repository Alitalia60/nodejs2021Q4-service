import Router from 'koa-router';
import {
  getTask,
  getTaskList,
  addTask,
  updTask,
  delTask,
} from './task.service';
import koaBody from 'koa-body';

const taskRouter = new Router();

//Tasks-------------------------------
//*  OK  1.  GET boards/:boardId/tasks
taskRouter.get('/boards/:boardId/tasks', async (ctx, next) => {
  ctx.set('content-type', 'application/json');
  getTaskList(ctx);
  next();
});

//*  OK 2. GET boards/:boardId/tasks/:taskId - get the task by id
taskRouter.get('/boards/:boardId/tasks/:taskId', koaBody(), async (ctx) => {
  getTask(ctx);
});

//* OK  3.  POST boards/:boardId/tasks - create task
taskRouter.post('/boards/:boardId/tasks', koaBody(), async (ctx) => {
  addTask(ctx);
});

//*  OK  4. PUT /boards/:boardId/tasks/:taskId - update task
taskRouter.put('/boards/:boardId/tasks/:taskId', koaBody(), async (ctx) => {
  updTask(ctx);
});

//* OK 5.  DELETE boards/:boardId/tasks/:taskId - delete task
taskRouter.del('/boards/:boardId/tasks/:taskId', koaBody(), async (ctx) => {
  delTask(ctx);
});

module.exports = taskRouter;
