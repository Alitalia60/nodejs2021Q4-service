import Router from "koa-router";
import {
  getTask,
  getTaskList,
  addTask,
  updTask,
  delTask,
} from "./task.service";
import { koaContext } from "../../common/types";

export const taskRouter = new Router();

taskRouter.get("/boards/:boardId/tasks", async (ctx: koaContext) => {
  ctx.set("content-type", "application/json");
  getTaskList(ctx);
});

taskRouter.get(
  "/boards/:boardId/tasks/:taskId",

  async (ctx: koaContext) => {
    getTask(ctx);
  }
);

taskRouter.post(
  "/boards/:boardId/tasks",

  async (ctx: koaContext) => {
    addTask(ctx);
  }
);

taskRouter.put(
  "/boards/:boardId/tasks/:taskId",

  async (ctx: koaContext) => {
    updTask(ctx);
  }
);

taskRouter.del(
  "/boards/:boardId/tasks/:taskId",

  async (ctx: koaContext) => {
    delTask(ctx);
  }
);
