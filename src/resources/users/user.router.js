const Router = require('koa-router')
const userService = require('./user.sevice')
const koaBody = require('koa-body')

const { checkStructureUser } = require('../../common/checkStructure')

const userRouter = new Router();

//Users---------------------------------
//TODO
userRouter.get('/users', async (ctx, next) => {
    ctx.set('content-type', 'application/json');
    ctx.body = userService.getUserList(ctx);
    next()
})

//TODO
userRouter.get('/users/:userId', async (ctx, next) => {
    userService.getUser(ctx)
    next()
})

//TODO
userRouter.post('/users', koaBody(), async (ctx, next) => {
    if (!ctx.is('application/json')) {
        ctx.status = 400;
        ctx.response.body = "not 'application/json"
        // ctx.throw(400, "not 'application/json");
        return
    }
    if (!checkStructureUser(ctx.request.body)) {
        // ctx.throw(400, "structure of User not valid");
        ctx.status = 400;
        ctx.response.body = "structure of User not valid"
        return
    }
    ctx.response.body = userService.addUser(ctx.request.body);
    ctx.set('content-type', 'application/json');
    ctx.status = 201;
})

//TODO
userRouter.put('/users/:userId', koaBody(), async (ctx, next) => {
    userService.updUser(ctx)
    next()
})

//TODO
userRouter.del('/users/:userId', async (ctx, next) => {
    userService.delUser(ctx)
    next()
})

module.exports = userRouter


