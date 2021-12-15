import Router from "koa-router";
import {
  getTask,
  getTaskList,
  addTask,
  updTask,
  delTask,
} from "./task.service";
import koaBody from "koa-body";

export const taskRouter = new Router();

taskRouter.get("/boards/:boardId/tasks", async (ctx, next) => {
  ctx.set("content-type", "application/json");
  getTaskList(ctx);
  next();
});

taskRouter.get("/boards/:boardId/tasks/:taskId", koaBody(), async (ctx) => {
  getTask(ctx);
});

taskRouter.post("/boards/:boardId/tasks", koaBody(), async (ctx) => {
  addTask(ctx);
});

taskRouter.put("/boards/:boardId/tasks/:taskId", koaBody(), async (ctx) => {
  updTask(ctx);
});

taskRouter.del("/boards/:boardId/tasks/:taskId", koaBody(), async (ctx) => {
  delTask(ctx);
});
