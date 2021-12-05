const Router = require('koa-router');
const koaBody = require('koa-body');
const {
  getUserById,
  showUserList,
  delUser,
  addUser,
  updUser,
} = require('./user.service');

const userRouter = new Router();

//Users---------------------------------
//* OK 1.  GET /users - get all users (remove password from response)
userRouter.get('/users', async (ctx) => {
  // ctx.set('Content-type', 'application/json');
  ctx.response.set('Content-type', 'application/json');
  ctx.body = JSON.stringify(showUserList());
});

//* OK GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)
userRouter.get('/users/:userId', koaBody(), async (ctx) => {
  ctx.set('Content-type', 'application/json');
  getUserById(ctx);
});

//* OK  POST /users - create user
userRouter.post('/users', koaBody(), async (ctx) => {
  addUser(ctx);
});

//* OK PUT /users/:userId - update user
userRouter.put('/users/:userId', koaBody(), async (ctx) => {
  updUser(ctx);
});

//* OK DELETE /users/:userId - delete user
userRouter.del('/users/:userId', async (ctx) => {
  delUser(ctx);
});

module.exports = userRouter;
