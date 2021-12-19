import koaBody from "koa-body";
import Router from "koa-router";

import { getBoard, addBoard, updBoard, delBoard } from "./board.service";
import { getBoardList } from "./board.memory.repository";
export const boardRouter = new Router();

boardRouter.get("/boards", async (ctx) => {
  getBoardList(ctx);
});

boardRouter.get("/boards/:boardId", koaBody(), async (ctx) => {
  getBoard(ctx);
});

boardRouter.post("/boards", koaBody(), async (ctx) => {
  addBoard(ctx);
});

boardRouter.put("/boards/:boardId", koaBody(), async (ctx) => {
  updBoard(ctx);
});

boardRouter.del("/boards/:boardId", async (ctx) => {
  delBoard(ctx);
});
