import { dbUsers, updateUser } from "./user.memory.repository";
import {
  dbTasks,
  unassignUserIdFromTask,
} from "../tasks/task.memory.repository";
import { User } from "./user.model";
import { HTTP_STATUS_CODE } from "../../common/httpStatusCode";
import { koaContext } from "../../common/types";
import { IUser } from "../../common/interfaces";
import { validateBody } from "../../common/validator";
import { logger } from "../../common/logger";

/**
 *
 * fill response to client USER with passed userId
 *
 *  @param {koaContext} ctx - koa context
 */
export function getUserById(ctx: koaContext) {
  let userId = ctx["params"].userId;
  let user = dbUsers.filter((user) => user.id === userId)[0];
  if (user) {
    delete user["password"];
    ctx.body = JSON.stringify(user);
    ctx.response.status = HTTP_STATUS_CODE.OK;
    logger(ctx)
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
    logger(ctx, 'warn')
  }
}

/**
 * fill data of new user, add to memory repository dbUser, fill response data
 *
 *  @param {koaContext} ctx - koa context
 */
export function addUser(ctx: koaContext) {
  if (validateBody(ctx, new User)) {
    try {
      const newUser = new User(ctx.request.body);
      dbUsers.push(newUser);
      ctx.response.status = HTTP_STATUS_CODE.Created;
      ctx.set("Content-type", "application/json");
      delete newUser["password"];
      ctx.response.body = JSON.stringify(newUser);
      logger(ctx)
    } catch (error) {
      ctx["response"].body = JSON.stringify(`error creating User`);
      ctx.response.status = HTTP_STATUS_CODE.Server_Error;
      logger(ctx, 'error')
    }
  }
  else {
    ctx.response.body = JSON.stringify(`wrong request data`);
    ctx.response.status = HTTP_STATUS_CODE.Bad_Request;
    logger(ctx, 'warn')
  }
}

/**
 * update user data it in memory repository, fill response to client
 *
 *  @param {koaContext} ctx - koa context
 */
export function updUser(ctx: koaContext) {

  if (validateBody(ctx, new User)) {
    let userId = ctx["params"].userId;
    let user = dbUsers.filter((user) => user.id === userId)[0];
    if (user) {
      updateUser(userId, ctx.request.body);
      delete user["password"];
      ctx.response.set("Content-type", "application/json");
      ctx.response.body = JSON.stringify(user);
      ctx.response.status = HTTP_STATUS_CODE.OK;
      logger(ctx)
    } else {
      ctx.body = JSON.stringify(`not found user ${userId}`);
      ctx.status = HTTP_STATUS_CODE.Not_Found;
      logger(ctx, 'warn')
    }
  }
  else {
    // logger(`wrong request data`, 'warn');
    ctx["response"].body = JSON.stringify(`wrong request data`);
    ctx.status = HTTP_STATUS_CODE.Bad_Request;
    logger(ctx, 'warn')
  }
}

/**
 * delete USER with id == ctx.params.userId from memory repository
 *
 *  @param {koaContext} ctx - koa context
 */
export function delUser(ctx: koaContext) {
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
    logger(ctx.response.message, 'info')
  } else {
    logger(ctx.response.message, 'warn')
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.response.status = HTTP_STATUS_CODE.Not_Found;
  }
}
