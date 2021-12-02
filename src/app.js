const Koa = require('koa');
const startServer = require('../src/server');
const boardRouter = require('./resources/boards/board.router');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const koaBody = require('koa-body');

const app = new Koa();
startServer(app);

// app.use(koaBody());
app.use(boardRouter.routes());
app.use(boardRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(taskRouter.routes());
app.use(taskRouter.allowedMethods());
app.on('error', (err) => {
  // console.log('server error', err.message);
  console.log('server error', err);
});

//!! temporary
const prepDB = require('./createDB');
