import { dbTasks } from './task.memory.repository';
import { dbBoards } from '../boards/board.memory.repository';
import { Task } from './task.model';
import { checkRequestStructure } from '../../common/checkStructure';
import { koaCtxType } from '../../common/types';
import { updateTask } from './task.memory.repository';

export function getBoardById(id: string) {
  return dbBoards.find((item) => item.id == id);
}

export function findTaskById(id: string) {
  return dbTasks.find((item) => item.id == id);
}

//* OK
export function getTask(ctx: koaCtxType) {
  const boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (!board) {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }
  const taskId = ctx.params.taskId;
  const task = findTaskById(taskId);
  if (task) {
    ctx.response.set('content-type', 'application/json');
    ctx.response.body = JSON.stringify(task);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.status = 404;
  }
}

//* OK
export function getTaskList(ctx: koaCtxType) {
  const boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (!board) {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }
  ctx.status = 200;
  ctx.response.set('content-type', 'application/json');
  ctx.body = JSON.stringify(dbTasks.filter((item) => item.boardId == boardId));
}

//* OK
export function addTask(ctx: koaCtxType) {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new Task())) {
    console.log('creatung TASK structure of Task not valid');
    ctx.status = 400;
    ctx.response.body = 'incorrect structure of Task';
    return;
  }

  const boardId = ctx.params.boardId;
  ctx.request.body.boardId = boardId;
  try {
    let board = getBoardById(boardId);
    if (!board) {
      ctx.body = JSON.stringify(`Not found board ${boardId}`);
      ctx.status = 404;
      return;
    }
    const newTask = new Task(ctx.request.body);
    dbTasks.push(newTask);
    ctx.status = 201;
    ctx.response.set('content-type', 'application/json');

    ctx.response.body = JSON.stringify(newTask);
  } catch (error) {
    ctx.body = JSON.stringify(`Error creating Task`);
    ctx.status = 500;
  }
}

//* OK
export function updTask(ctx: koaCtxType) {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new Task())) {
    console.log('creatung TASK structure of Task not valid');
    ctx.status = 400;
    ctx.response.body = 'incorrect structure of Task';
    return;
  }

  const taskId = ctx.params.taskId;
  const boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (!board) {
    ctx.body = JSON.stringify(`Not found board ${boardId}`);
    ctx.status = 404;
    return;
  }

  let task = findTaskById(taskId);
  if (task) {
    //do not change boardID !!
    ctx.request.body.boardId = boardId;
    updateTask(task, ctx.request.body);
    ctx.set('content-type', 'application/json');
    ctx.response.status = 200;

    ctx.response.body = JSON.stringify(task);
  } else {
    ctx.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.status = 404;
  }
}

export function delTask(ctx: koaCtxType) {
  const taskId = ctx.params.taskId;
  let task = findTaskById(taskId);
  if (task) {
    dbTasks.splice(dbTasks.indexOf(task), 1);
    ctx.status = 204;
    ctx.body = `Ddeleted tasks id = ${taskId}`;
  } else {
    ctx.body = JSON.stringify(`Not found task ${taskId}`);
    ctx.status = 404;
  }
}

export function deleteTasksIfBoardId(boardId: string) {
  let findedTaskIndex;
  do {
    findedTaskIndex = dbTasks.findIndex((item) => item.boardId == boardId);
    dbTasks.splice(findedTaskIndex);
  } while (findedTaskIndex != -1);
}
