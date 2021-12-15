import { dbUsers, updateUser } from "./user.memory.repository";
import {
  dbTasks,
  unassignUserIdFromTask,
} from "../tasks/task.memory.repository";
import { User } from "./user.model";
import { HTTP_STATUS_CODE } from "../../common/httpStatusCode";
import { koaCtxType } from "../../common/types";

/**
 *
 * function return response to client USER with passed userId
 * @param {koaCtxType} ctx
 */
export function getUserById(ctx: koaCtxType) {
  let userId = ctx["params"].userId;
  let user = dbUsers.filter((user) => user.id === userId)[0];
  if (user) {
    delete user["password"];
    ctx.body = JSON.stringify(user);
    ctx.status = HTTP_STATUS_CODE.OK;
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

/**
 *
 * function add new USER to memory repository dbUser
 * @param {koaCtxType} ctx
 */
export function addUser(ctx: koaCtxType) {
  exports.delUser = delUser;

  try {
    const newUser = new User(ctx.request.body);
    dbUsers.push(newUser);
    ctx.response.status = HTTP_STATUS_CODE.Created;
    ctx.set("Content-type", "application/json");
    delete newUser["password"];
    ctx.response.body = JSON.stringify(newUser);
  } catch (error) {
    ctx["responce"].body = JSON.stringify(`error creating User`);
    ctx.status = HTTP_STATUS_CODE.Server_Error;
  }
}

/**
 *
 * function return to client updated USER with id == ctx.params.userId
 * @param {koaCtxType} ctx
 */
export function updUser(ctx: koaCtxType) {
  let userId = ctx["params"].userId;
  let user = dbUsers.filter((user) => user.id === userId)[0];
  if (user) {
    updateUser(userId, ctx.request.body);
    delete user["password"];
    ctx.response.set("Content-type", "application/json");
    ctx.response.body = JSON.stringify(user);
    ctx.response.status = HTTP_STATUS_CODE.OK;
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

/**
 *
 * function delete USER  with id == ctx.params.userId from memory repository
 * @param {koaCtxType} ctx
 */
export function delUser(ctx: koaCtxType) {
  let userId = ctx["params"].userId;
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
    ctx.response.set("Content-type", "application/json");
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.response.status = HTTP_STATUS_CODE.Not_Found;
  }
}
