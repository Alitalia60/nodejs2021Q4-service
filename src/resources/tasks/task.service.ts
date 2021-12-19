import { HTTP_STATUS_CODE } from "../../common/httpStatusCode";
import { updateTask, dbTasks } from "./task.memory.repository";
import { dbBoards } from "../boards/board.memory.repository";
import { Task } from "./task.model";
import { koaContext } from "../../common/types";

/**
 *
 * function return to client Task with passed ctx.params.boardId and ctx.params.taskId if they're exist
 * @param {koaContext} ctx
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
    } else {
      ctx.body = JSON.stringify(`Not found task ${taskId}`);
      ctx.status = HTTP_STATUS_CODE.Not_Found;
    }
  } else {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

/**
 *
 * function return to client list of all tasks on board ctx.params.boardId if board exist
 * @param {koaContext} ctx
 */
export function getTaskList(ctx: koaContext) {
  const boardId = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (!board) {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
    return;
  }
  ctx.status = HTTP_STATUS_CODE.OK;
  ctx.response.set("content-type", "application/json");
  ctx.body = JSON.stringify(dbTasks.filter((item) => item.boardId == boardId));
}

/**
 *
 * function add new task to memory repository
 * @param {koaContext} ctx
 */
export function addTask(ctx: koaContext) {
  const boardId = ctx["params"].boardId;
  ctx.request.body.boardId = boardId;
  try {
    let board = dbBoards.filter((board) => board.id === boardId)[0];
    if (!board) {
      ctx.body = JSON.stringify(`Not found board ${boardId}`);
      ctx.status = HTTP_STATUS_CODE.Not_Found;
      return;
    }
    const newTask = new Task(ctx.request.body);
    dbTasks.push(newTask);
    ctx.status = HTTP_STATUS_CODE.Created;
    ctx.response.set("content-type", "application/json");

    ctx.response.body = JSON.stringify(newTask);
  } catch (error) {
    ctx.body = JSON.stringify(`Error creating Task`);
    ctx.status = HTTP_STATUS_CODE.Server_Error;
  }
}

/**
 *
 * function return to client updated task with id == ctx.params.taskId on board ctx.params.boardId if board exist
 * @param {koaContext} ctx
 */
export function updTask(ctx: koaContext) {
  const taskId = ctx["params"].taskId;
  const boardId = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (!board) {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
    return;
  }

  let task = dbTasks.filter((task) => task.id === taskId)[0];
  if (task) {
    ctx.request.body.boardId = boardId;
    updateTask(taskId, ctx.request.body);
    ctx.set("content-type", "application/json");
    ctx.response.status = HTTP_STATUS_CODE.OK;

    ctx.response.body = JSON.stringify(task);
  } else {
    ctx.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

/**
 *
 * function delete task witth id == ctx.params.taskId
 * @param {koaContext} ctx
 */
export function delTask(ctx: koaContext) {
  const taskId = ctx["params"].taskId;
  let task = dbTasks.filter((task) => task.id === taskId)[0];
  if (task) {
    dbTasks.splice(dbTasks.indexOf(task), 1);
    ctx.status = HTTP_STATUS_CODE.No_Content;
    ctx.body = `Ddeleted tasks id = ${taskId}`;
  } else {
    ctx.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}
