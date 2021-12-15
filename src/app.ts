import Koa from 'koa';
import { boardRouter } from './resources/boards/board.router';
import { userRouter } from './resources/users/user.router';
import { taskRouter } from './resources/tasks/task.router';
import dotenv from 'dotenv';

const envParsed = dotenv.config().parsed;
let HOST: string = 'localhost';
let PORT: number = 4000;

if (envParsed) {
  if (envParsed['error']) {
    throw envParsed['error'];
  }
  if (envParsed['HOST']) {
    HOST = envParsed['HOST'];
  }
  if (envParsed['PORT']) {
    PORT = Number(envParsed['PORT']);
  }
}
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
app.on('error', (err: string) => {
  console.log('server error', err);
});
