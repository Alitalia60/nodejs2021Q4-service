import koaBody from 'koa-body';
import Router from 'koa-router';

import {
  getBoard,
  getBoardList,
  addBoard,
  updBoard,
  delBoard,
} from './board.service.ts';

export const boardRouter = new Router();

//Boards-------------------------------
//*  OK  1. GET /boards - get all boards
boardRouter.get('/boards', async (ctx) => {
  getBoardList(ctx);
});

//* OK 2. GET /boards/:boardId - get the board by id
boardRouter.get('/boards/:boardId', koaBody(), async (ctx) => {
  getBoard(ctx);
});

//* OK  3. POST /boards - create board
boardRouter.post('/boards', koaBody(), async (ctx) => {
  addBoard(ctx);
});

//*  OK  4. PUT /boards/:boardId - update board
boardRouter.put('/boards/:boardId', koaBody(), async (ctx) => {
  updBoard(ctx);
});

//*  OK  DELETE /boards/:boardId - delete board
boardRouter.del('/boards/:boardId', async (ctx) => {
  delBoard(ctx);
});
