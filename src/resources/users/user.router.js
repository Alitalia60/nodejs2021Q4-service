const Router = require('koa-router');
const koaBody = require('koa-body');
const { checkStructureUser } = require('../../common/checkStructure');
const userService = require('./user.service');

const userRouter = new Router();

//Users---------------------------------
//* OK 1.  GET /users - get all users (remove password from response)
userRouter.get('/users', async (ctx, next) => {
  ctx.set('content-type', 'application/json');
  ctx.body = JSON.stringify(userService.showUserList());
  next();
});

//* OK GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)
userRouter.get('/users/:userId', koaBody(), async (ctx, next) => {
  ctx.set('content-type', 'application/json');
  userService.getUserById(ctx);
  next();
});

//* OK  POST /users - create user
userRouter.post('/users', koaBody(), async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    // ctx.throw(400, "not 'application/json");
    return;
  }
  if (!checkStructureUser(ctx.request.body)) {
    // ctx.throw(400, "structure of User not valid");
    ctx.status = 400;
    ctx.response.body = 'structure of User not valid';
    return;
  }
  // console.log('from user router', ctx.request.body);

  ctx.response.body = userService.addUser(ctx.request.body);
  ctx.set('content-type', 'application/json');
  ctx.status = 201;
});

//* OK PUT /users/:userId - update user
userRouter.put('/users/:userId', koaBody(), async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkStructureUser(ctx.request.body)) {
    ctx.status = 400;
    ctx.response.body = 'structure of User not valid';
    return;
  }
  userService.updUser(ctx);
  ctx.set('content-type', 'application/json');
  //   ctx.response.status = 204;
  next();
});

//* OK DELETE /users/:userId - delete user
userRouter.del('/users/:userId', async (ctx, next) => {
  userService.delUser(ctx);
  next();
});

module.exports = userRouter;
