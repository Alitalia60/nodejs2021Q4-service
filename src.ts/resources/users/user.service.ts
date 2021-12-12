import { dbUsers } from './user.memory.repository';
import { dbTasks } from '../tasks/task.memory.repository';
import { User } from './user.model';
import { checkRequestStructure } from '../../common/checkStructure';
import { HTTP_STATUS_CODE } from '../../common/httpStatusCode';
import { koaCtxType } from '../../common/types';
import { updateUser } from './user.memory.repository';

// get all users (remove password from response)
export function showUserList() {
  return dbUsers.map((item) => {
    delete item['password'];
    return item;
  });
}

// return object of User
export function getUserObject(id: string) {
  return dbUsers.find((item) => item.id == id);
}

//* OK
export function getUserById(ctx: koaCtxType) {
  let userId = ctx.params.userId;
  let user = getUserObject(userId);
  if (user) {
    delete user['password'];
    ctx.body = JSON.stringify(user);
    ctx.status = HTTP_STATUS_CODE.OK;
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

//* OK
export function addUser(ctx: koaCtxType) {
  if (!ctx.is('application/json')) {
    ctx.status = HTTP_STATUS_CODE.Bad_Request;
    ctx.response.body = 'not application/json';
    return;
  }

  if (!checkRequestStructure(ctx.request.body, new User())) {
    ctx.status = HTTP_STATUS_CODE.Bad_Request;
    ctx.response.body = 'structure of User not valid';
    return;
  }

  try {
    const newUser = new User(ctx.request.body);
    dbUsers.push(newUser);
    ctx.response.status = HTTP_STATUS_CODE.Created;
    ctx.set('Content-type', 'application/json');
    delete newUser['password'];
    ctx.response.body = JSON.stringify(newUser);
    // ctx.response.body = JSON.stringify(newUser);
  } catch (error) {
    ctx.responce.body = JSON.stringify(`error creating User`);
    ctx.status = HTTP_STATUS_CODE.Server_Error;
    console.log(`error creating User`, error);
  }
}

//* OK
export function updUser(ctx: koaCtxType) {
  ctx.response.type = 'application/json';
  if (!ctx.is('application/json')) {
    ctx.response.status = HTTP_STATUS_CODE.Bad_Request;
    ctx.response.body = 'not application/json';
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new User())) {
    ctx.response.status = HTTP_STATUS_CODE.Bad_Request;
    console.log('structure of User not valid');
    ctx.response.body = 'structure of User not valid';
    return;
  }
  let userId = ctx.params.userId;
  let user = getUserObject(userId);
  if (user) {
    updateUser(user, ctx.request.body);
    delete user['password'];
    ctx.response.set('Content-type', 'application/json');
    ctx.response.body = JSON.stringify(user);
    ctx.response.status = HTTP_STATUS_CODE.OK;
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

//* OK
export function delUser(ctx: koaCtxType) {
  let userId = ctx.params.userId;
  let user = getUserObject(userId);
  if (user) {
    dbTasks.forEach((element) => {
      if (element.userId == userId) {
        element.userId = null;
      }
    });

    dbUsers.splice(dbUsers.indexOf(user), 1);
    ctx.body = `deleted users id = ${userId}`;
    ctx.response.status = HTTP_STATUS_CODE.No_Content;
    ctx.response.set('Content-type', 'application/json');
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.response.status = HTTP_STATUS_CODE.Not_Found;
  }
}
