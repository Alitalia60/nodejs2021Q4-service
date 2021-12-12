import { ParameterizedContext } from 'koa';
import { IRouterParamContext } from 'koa-router';
import { IBoard } from '../../common/interfaces';

export const dbBoards: IBoard[] = [];

export function getBoardList(
  ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>
): void {
  ctx.response.status = 200;
  ctx.response.set('Content-type', 'application/json');
  ctx.body = JSON.stringify(dbBoards);
  return;
}

function getBoardById(id: string) {
  return dbBoards.find((item) => item.id == id);
}
