const Router = require('koa-router');
const koaBody = require('koa-body');
const { checkStructureUser } = require('../../common/checkStructure');
const {
  getUserById,
  showUserList,
  showUser,
  delUser,
  addUser,
  updUser,
} = require('./user.service');

const userRouter = new Router();

//Users---------------------------------
//* OK 1.  GET /users - get all users (remove password from response)
userRouter.get('/users', async (ctx, next) => {
  // ctx.set('Content-type', 'application/json');
  ctx.response.set('Content-type', 'application/json');
  ctx.body = JSON.stringify(showUserList());
  next();
});

//* OK GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)
userRouter.get('/users/:userId', koaBody(), async (ctx, next) => {
  ctx.set('Content-type', 'application/json');
  getUserById(ctx);
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
  // if (!checkStructureUser(ctx.request.body)) {
  //   ctx.status = 400;
  //   ctx.response.body = 'structure of User not valid';
  //   return;
  // }

  ctx.response.body = addUser(ctx.request.body);
  ctx.response.set('Content-type', 'application/json');
  ctx.status = 201;
});

//* OK PUT /users/:userId - update user
userRouter.put('/users/:userId', koaBody(), async (ctx, next) => {
  ctx.response.type = 'application/json';
  if (!ctx.is('application/json')) {
    ctx.response.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkStructureUser(ctx.request.body)) {
    ctx.response.status = 400;
    ctx.response.body = 'structure of User not valid';
    return;
  }
  updUser(ctx);
  ctx.response.body = addUser(ctx.request.body);
  ctx.response.status = 200;
  next();
});

//* OK DELETE /users/:userId - delete user
userRouter.del('/users/:userId', async (ctx, next) => {
  delUser(ctx);
  next();
});

module.exports = userRouter;
