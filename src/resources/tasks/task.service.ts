import { HTTP_STATUS_CODE } from "../../common/httpStatusCode";
import { updateTask, dbTasks } from "./task.memory.repository";
import { dbBoards } from "../boards/board.memory.repository";
import { Task } from "./task.model";
// import { checkRequestStructure } from '../../common/checkStructure';
import { koaCtxType } from "../../common/types";

// export function getBoardById(id: string) {
//   return dbBoards.find((item) => item.id == id);
// }

// export function findTaskById(id: string) {
//   return dbTasks.find((item) => item.id == id);
// }

//* OK
export function getTask(ctx: koaCtxType) {
  const boardId = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];

  if (!board) {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
    return;
  }
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
}

//* OK
export function getTaskList(ctx: koaCtxType) {
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

//* OK
export function addTask(ctx: koaCtxType) {
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

//* OK
export function updTask(ctx: koaCtxType) {
  const taskId = ctx["params"].taskId;
  const boardId = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (!board) {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
    return;
  }

  // let task = findTaskById(taskId);
  let task = dbTasks.filter((task) => task.id === taskId)[0];
  if (task) {
    //do not change boardID !!
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

export function delTask(ctx: koaCtxType) {
  const taskId = ctx["params"].taskId;
  // let task = findTaskById(taskId);
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
