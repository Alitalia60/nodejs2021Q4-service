import { HTTP_STATUS_CODE } from "../../common/httpStatusCode";
import { updateTask, dbTasks } from "./task.memory.repository";
import { dbBoards } from "../boards/board.memory.repository";
import { Task } from "./task.model";
import { koaContext } from "../../common/types";
import { validateBody } from "../../common/validator";
import { logger } from "../../common/logger";

/**
 *
 * function return to client Task with passed ctx.params.boardId and ctx.params.taskId if they're exist
 * @param {koaContext} ctx  - koa context
 */
export function getTask(ctx: koaContext) {
  const boardId = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (board) {
    const taskId = ctx["params"].taskId;
    // const task = findTaskById(taskId);
    let task = dbTasks.filter((task) => task.id === taskId)[0];
    if (task) {
      ctx.response.set("content-type", "application/json");
      ctx.response.body = JSON.stringify(task);
      ctx.status = HTTP_STATUS_CODE.OK;
      logger(ctx)
    } else {
      ctx.response.body = JSON.stringify(`Not found task ${taskId}`);
      ctx.response.status = HTTP_STATUS_CODE.Not_Found;
      logger(ctx, 'warn')
    }
  } else {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
    logger(ctx, 'warn')
  }
}

/**
 *
 * function return to client list of all tasks on board ctx.params.boardId if board exist
 * @param {koaContext} ctx  - koa context
 */
export function getTaskList(ctx: koaContext) {
  const boardId = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (!board) {
    ctx.response.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.response.status = HTTP_STATUS_CODE.Not_Found;
    logger(ctx, 'warn')
  }
  else {
    ctx.status = HTTP_STATUS_CODE.OK;
    ctx.response.set("content-type", "application/json");
    ctx.body = JSON.stringify(dbTasks.filter((item) => item.boardId == boardId));
    logger(ctx)
  }
}

/**
 *
 * function add new task to memory repository
 * @param {koaContext} ctx  - koa context
 */
export function addTask(ctx: koaContext) {
  if (validateBody(ctx, new Task)) {
    const boardId = ctx["params"].boardId;
    ctx.request.body.boardId = boardId;
    try {
      let board = dbBoards.filter((board) => board.id === boardId)[0];
      if (!board) {
        ctx.body = JSON.stringify(`Not found board ${boardId}`);
        ctx.response.status = HTTP_STATUS_CODE.Not_Found;
        logger(ctx, 'error')
        return;
      }
      const newTask = new Task(ctx.request.body);
      dbTasks.push(newTask);
      ctx.status = HTTP_STATUS_CODE.Created;
      ctx.response.set("content-type", "application/json");
      ctx.response.body = JSON.stringify(newTask);
      logger(ctx)

    } catch (error) {
      ctx.response.body = JSON.stringify(`Error creating Task`);
      ctx.response.status = HTTP_STATUS_CODE.Server_Error;
      logger(ctx, 'error')
    }
  }
  else {
    // logger(`wrong request data`, 'warn');
    ctx.response.body = JSON.stringify(`wrong request data`);
    ctx.response.status = HTTP_STATUS_CODE.Bad_Request;
    logger(ctx, 'warn')
  }

}

/**
 * function return to client updated task with id == ctx.params.taskId on board ctx.params.boardId if board exist
 *
 * @param {koaContext} ctx  - koa context
 */
export function updTask(ctx: koaContext) {
  if (validateBody(ctx, new Task)) {
    const taskId = ctx["params"].taskId;
    const boardId = ctx["params"].boardId;
    let board = dbBoards.filter((board) => board.id === boardId)[0];
    if (!board) {
      ctx.response.body = JSON.stringify(`Not found board ${boardId}`);
      ctx.response.status = HTTP_STATUS_CODE.Not_Found;
      logger(ctx, 'warn')
      return;
    }

    let task = dbTasks.filter((task) => task.id === taskId)[0];
    if (task) {
      ctx.request.body.boardId = boardId;
      updateTask(taskId, ctx.request.body);
      ctx.set("content-type", "application/json");
      ctx.response.status = HTTP_STATUS_CODE.OK;
      ctx.response.body = JSON.stringify(task);
      logger(ctx)
    } else {
      ctx.body = JSON.stringify(`Not found task ${taskId}`);
      ctx.status = HTTP_STATUS_CODE.Not_Found;
      logger(ctx, 'warn')
    }
  }
  else {
    ctx.response.body = JSON.stringify(`wrong request data`);
    ctx.response.status = HTTP_STATUS_CODE.Bad_Request;
    logger(ctx, 'warn')
  }

}

/**
 *
 * function delete task witth id == ctx.params.taskId
 * @param {koaContext} ctx  - koa context
 */
export function delTask(ctx: koaContext) {
  const taskId = ctx["params"].taskId;
  let task = dbTasks.filter((task) => task.id === taskId)[0];
  if (task) {
    dbTasks.splice(dbTasks.indexOf(task), 1);
    ctx.response.status = HTTP_STATUS_CODE.No_Content;
    ctx.response.body = `Ddeleted tasks id = ${taskId}`;
    logger(ctx)
  } else {
    ctx.response.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.response.status = HTTP_STATUS_CODE.Not_Found;
    logger(ctx, 'warn')
  }
}
