const koaBody = require('koa-body');
const Router = require('koa-router');
// const { checkStructureBoard } = require('../../common/checkStructure');
const checkRequestStructure = require('../../common/checkStructure');
const Board = require('./board.model');
const {
  getBoard,
  getBoardById,
  getBoardList,
  addBoard,
  updBoard,
  delBoard,
} = require('./board.service');

const boardRouter = new Router();

//Boards-------------------------------
//*  OK  1. GET /boards - get all boards
boardRouter.get('/boards', async (ctx, next) => {
  ctx.set('content-type', 'application/json');
  ctx.body = JSON.stringify(getBoardList());
  next();
});

//* OK 2. GET /boards/:boardId - get the board by id
boardRouter.get('/boards/:boardId', koaBody(), async (ctx, next) => {
  ctx.set('content-type', 'application/json');
  getBoard(ctx);
  next();
});

//* OK  3. POST /boards - create board
boardRouter.post('/boards', koaBody(), async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new Board())) {
    // ctx.throw(400, "structure of Board not valid");
    ctx.status = 400;
    ctx.response.body = 'Incorrect structure of Board';
    return;
  }
  ctx.response.body = addBoard(ctx);
  ctx.set('content-type', 'application/json');
  ctx.status = 201;
});

//*  OK  4. PUT /boards/:boardId - update board
boardRouter.put('/boards/:boardId', koaBody(), async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new Board())) {
    ctx.status = 400;
    ctx.response.body = 'Incorrect structure of Board';
    return;
  }
  updBoard(ctx);
  ctx.set('content-type', 'application/json');
  ctx.response.status = 200;
  next();
});

//*  OK  DELETE /boards/:boardId - delete board
boardRouter.del('/boards/:boardId', async (ctx, next) => {
  delBoard(ctx);
  next();
});

module.exports = boardRouter;
