import Router from "koa-router";
import { dbUsers } from "./user.memory.repository";
import { koaContext } from "../../common/types";
import { getUserById, delUser, addUser, updUser } from "./user.service";

export const userRouter = new Router();

userRouter.get("/users", async (ctx: koaContext) => {
  ctx.response.set("Content-type", "application/json");
  ctx.body = JSON.stringify(dbUsers);
});

userRouter.get("/users/:userId", async (ctx: koaContext) => {
  ctx.set("Content-type", "application/json");
  getUserById(ctx);
});

// userRouter.post("/users", async (ctx: koaContext) => {
userRouter.post("/users", async (ctx: koaContext) => {
  addUser(ctx);
});

userRouter.put("/users/:userId", async (ctx: koaContext) => {
  updUser(ctx);
});

userRouter.del("/users/:userId", async (ctx: koaContext) => {
  delUser(ctx);
});
