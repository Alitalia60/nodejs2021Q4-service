import Koa from 'koa'
import koaBody from 'koa-body'
import koaRouter from 'koa-router'
import boardRouter from './resources/boards/board.router';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';


const envParsed = dotenv.config().parsed;
if (envParsed.error) {
  throw envParsed.error;
}
const HOST = envParsed.HOST || 'localhost';
const PORT = envParsed.PORT || 4000;

const app = new Koa();
  app.listen(PORT, () => {
    console.log('==============================================');
    console.log(`Srerver is running on http://${HOST}:${PORT}`);
  });


app.use(boardRouter.routes());
app.use(boardRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(taskRouter.routes());
app.use(taskRouter.allowedMethods());
app.on('error', (err:string) => {
  console.log('server error', err);
});
