import koaBody from "koa-body";
import Router from "koa-router";

import { getBoard, addBoard, updBoard, delBoard } from "./board.service";
import { getBoardList } from "./board.memory.repository";
import { koaContext } from "../../common/types";

import writeLog from '../../common/loggers'

export const boardRouter = new Router();

boardRouter.get("/boards", async (ctx: koaContext) => {
  getBoardList(ctx);
});

boardRouter.get("/boards/:boardId", koaBody(), async (ctx: koaContext) => {
  getBoard(ctx);
});

boardRouter.post("/boards", koaBody(), async (ctx: koaContext) => {
  addBoard(ctx);
});

boardRouter.put("/boards/:boardId", koaBody(), async (ctx: koaContext) => {
  updBoard(ctx);
});

boardRouter.del("/boards/:boardId", async (ctx: koaContext) => {
  delBoard(ctx);
});

