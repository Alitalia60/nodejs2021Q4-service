const koaBody = require('koa-body');
const Router = require('koa-router');
const { checkStructureBoard } = require('../../common/checkStructure');
const boardService = require('./board.service');
const { getBoardList } = require('./board.memory.repository');

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
  boardService.getBoard(ctx);
  next();
});

//!!  3. POST /boards - create board
//TODO  add columns if passed
boardRouter.post('/boards', koaBody(), async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    // ctx.throw(400, "not 'application/json");
    return;
  }
  if (!checkStructureBoard(ctx.request.body)) {
    // ctx.throw(400, "structure of Board not valid");
    ctx.status = 400;
    ctx.response.body = 'structure of Board not valid';
    return;
  }
  // ctx.response.body = boardService.addBoard(ctx.request.body);
  ctx.response.body = boardService.addBoard(ctx);
  ctx.set('content-type', 'application/json');
  ctx.status = 201;
});

//!!  4.  PUT /boards/:boardId - update board
boardRouter.put('/boards/:boardId', koaBody(), async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkStructureBoard(ctx.request.body)) {
    ctx.status = 400;
    ctx.response.body = 'structure of Board not valid';
    return;
  }
  boardService.updBoard(ctx);
  ctx.set('content-type', 'application/json');
  //   ctx.response.status = 204;
  next();
});

//!!  DELETE /boards/:boardId - delete board
boardRouter.del('/boards/:boardId', async (ctx, next) => {
  boardService.delBoard(ctx);
  next();
});

module.exports = boardRouter;
