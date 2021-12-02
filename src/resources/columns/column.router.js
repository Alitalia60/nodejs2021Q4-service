const Router = require('koa-router')

const columnRouter = new Router();

//columns---------------------------------
//TODO
columnRouter.get('/columns', async (ctx, next) => {
    userControl.getUserList(ctx)
    next()
})

//TODO
columnRouter.get('/columns/:userId', async (ctx, next) => {
    userControl.getUser(ctx)
    next()
})

//TODO
columnRouter.post('/columns', async (ctx, next) => {
    userControl.addUser(ctx);
    next()
})

//TODO
columnRouter.put('/columns/:userId', async (ctx, next) => {
    userControl.updUser(ctx)
    next()
})

//TODO
columnRouter.del('/columns/:userId', async (ctx, next) => {
    userControl.delUser(ctx)
    next()
})


module.exports = columnRouter


