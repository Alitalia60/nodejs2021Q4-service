import koaBody from "koa-body";
import Router from "koa-router";
import { dbUsers } from "./user.memory.repository";

import { getUserById, delUser, addUser, updUser } from "./user.service";

export const userRouter = new Router();

//Users---------------------------------
userRouter.get("/users", async (ctx, next) => {
  ctx.response.set("Content-type", "application/json");
  ctx.body = JSON.stringify(dbUsers);
  next();
});

userRouter.get("/users/:userId", koaBody(), async (ctx, next) => {
  ctx.set("Content-type", "application/json");
  getUserById(ctx);
  next();
});

userRouter.post("/users", koaBody(), async (ctx, next) => {
  addUser(ctx);
  next();
});

userRouter.put("/users/:userId", koaBody(), async (ctx, next) => {
  updUser(ctx);
  next();
});

userRouter.del("/users/:userId", async (ctx, next) => {
  delUser(ctx);
  next();
});
