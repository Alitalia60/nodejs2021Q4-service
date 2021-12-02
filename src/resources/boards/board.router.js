const koaBody = require('koa-body');
const Router = require('koa-router');
const { checkStructureBoard } = require('../../common/checkStructure');
const boardService = require('./board.service');

const boardRouter = new Router();

//Boards-------------------------------
//?
boardRouter.get('/boards', async (ctx, next) => {
  ctx.set('content-type', 'application/json');
  ctx.body = boardService.getBoardList(ctx);
  next();
});

//TODO
boardRouter.get('/boards/:boardId', koaBody(), async (ctx, next) => {
  ctx.set('content-type', 'application/json');
  boardService.getBoard(ctx);
  next();
});

//!!
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
  ctx.response.body = boardService.addBoard(ctx.request.body);
  ctx.set('content-type', 'application/json');
  ctx.status = 201;
});

//TODO
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

//TODO
boardRouter.del('/boards/:boardId', async (ctx, next) => {
  boardService.delBoard(ctx);
  next();
});

module.exports = boardRouter;
