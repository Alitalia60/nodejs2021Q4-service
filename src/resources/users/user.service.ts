import { dbUsers, updateUser } from './user.memory.repository';
import {
  dbTasks,
  unassignUserIdFromTask,
} from '../tasks/task.memory.repository';
import { User } from './user.model';
// import { checkRequestStructure } from '../../common/checkStructure';
import { HTTP_STATUS_CODE } from '../../common/httpStatusCode';
import { koaCtxType } from '../../common/types';

export function showUserList() {
  return dbUsers.map((item) => {
    delete item['password'];
    return item;
  });
}

export function getUserById(ctx: koaCtxType) {
  let userId = ctx['params'].userId;
  let user = dbUsers.filter((user) => user.id === userId)[0];
  if (user) {
    delete user['password'];
    ctx.body = JSON.stringify(user);
    ctx.status = HTTP_STATUS_CODE.OK;
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

export function addUser(ctx: koaCtxType) {
  exports.delUser = delUser;

  try {
    const newUser = new User(ctx.request.body);
    dbUsers.push(newUser);
    ctx.response.status = HTTP_STATUS_CODE.Created;
    ctx.set('Content-type', 'application/json');
    delete newUser['password'];
    ctx.response.body = JSON.stringify(newUser);
  } catch (error) {
    ctx['responce'].body = JSON.stringify(`error creating User`);
    ctx.status = HTTP_STATUS_CODE.Server_Error;
    console.log(`error creating User`, error);
  }
}

export function updUser(ctx: koaCtxType) {
  let userId = ctx['params'].userId;
  let user = dbUsers.filter((user) => user.id === userId)[0];
  if (user) {
    updateUser(userId, ctx.request.body);
    delete user['password'];
    ctx.response.set('Content-type', 'application/json');
    ctx.response.body = JSON.stringify(user);
    ctx.response.status = HTTP_STATUS_CODE.OK;
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

export function delUser(ctx: koaCtxType) {
  let userId = ctx['params'].userId;
  let user = dbUsers.filter((user) => user.id === userId)[0];
  if (user) {
    dbTasks.forEach((element) => {
      if (element.userId == userId) {
        element.userId = null;
      }
    });

    dbUsers.splice(dbUsers.indexOf(user), 1);

    unassignUserIdFromTask(userId);
    ctx.body = `deleted users id = ${userId}`;
    ctx.response.status = HTTP_STATUS_CODE.No_Content;
    ctx.response.set('Content-type', 'application/json');
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.response.status = HTTP_STATUS_CODE.Not_Found;
  }
}
