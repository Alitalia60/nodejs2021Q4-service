import Koa from "koa";
import { boardRouter } from "./resources/boards/board.router";
import { userRouter } from "./resources/users/user.router";
import { taskRouter } from "./resources/tasks/task.router";
import dotenv from "dotenv";
import koaBody from "koa-body";
// import { writeReasponseLog, writeRequestLog } from "./common/loggers";
import { koaContext } from "./common/types";
import { HTTP_STATUS_CODE } from "./common/httpStatusCode";
import { logger } from "./common/logger";
import { IUser } from "./common/interfaces";
import { User } from "./resources/users/user.model";

const envParsed = dotenv.config().parsed;
let HOST: string = "localhost";
let PORT: number = 4000;

logger('=============================================')
logger('Start application')

if (envParsed) {
  if (envParsed["HOST"]) {
    HOST = envParsed["HOST"];
  }
  if (envParsed["PORT"]) {
    PORT = Number(envParsed["PORT"]);
  }
}
const app = new Koa();

app.use(koaBody())
app.listen(PORT, () => {
  console.log("==============================================");
  console.log(`Srerver is running on http://${HOST}:${PORT}`);
});

app.use(async (ctx: koaContext, next) => {
  // else {
  logger(ctx, 'info')
  if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(ctx.method) < 0) {
    ctx.response.status = HTTP_STATUS_CODE.Method_Not_Allowed
    await logger(ctx, 'error')
    logger(ctx, 'error')
  }
  else {
    await next()

  }
})

app.use(boardRouter.routes());
app.use(boardRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(taskRouter.routes());
app.use(taskRouter.allowedMethods());

app.on('error', (err, ctx) => {
  logger(`-> ${err.status} status code=${err}`, 'error')
});

