const koaBody = require('koa-body');
const Router = require('koa-router');
const { checkStructureBoard } = require('../../common/checkStructure');

const boardService = require('./board.service')

// const app = require('./app')

const boardRouter = new Router();



//Boards-------------------------------
//!! check
boardRouter.get('/boards', async (ctx, next) => {
    ctx.set('content-type', 'application/json');
    ctx.body = boardService.getBoardList(ctx);
    next()
})

//!! check
boardRouter.get('/boards/:boardId', async (ctx, next) => {
    boardService.getBoard(ctx);
    next()
})

//!! check
boardRouter.post('/boards', koaBody(), async (ctx, next) => {
    if (!ctx.is('application/json')) {
        ctx.status = 400;
        ctx.response.body = "not 'application/json"
        return
    }
    if (!checkStructureBoard(ctx.request.body)) {
        ctx.status = 400;
        ctx.response.body = "structure of Board not valid"
        return
    }
    ctx.response.body = boardService.addBoard(ctx.request.body);
    ctx.set('content-type', 'application/json');
    ctx.status = 201;
    // next()
})

//TODO
boardRouter.put('/boards/:boardId', koaBody(), async (ctx, next) => {
    boardService.updBoard(ctx)
    next()
})

//TODO
boardRouter.del('/boards/:boardId', async (ctx, next) => {
    boardService.delBoard(ctx)
    next()
})

module.exports = boardRouter


