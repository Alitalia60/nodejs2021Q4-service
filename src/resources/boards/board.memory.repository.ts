// import { ParameterizedContext } from 'koa';
// import { IRouterParamContext } from 'koa-router';
import { HTTP_STATUS_CODE } from '../../common/httpStatusCode';
import { IBoard } from '../../common/interfaces';
import { koaCtxType } from '../../common/types';

export const dbBoards: IBoard[] = [];

export function findBoardAsObjectById(id: string): IBoard | undefined {
  return dbBoards.find((item) => item.id == id);
}

export function getBoardList(ctx: koaCtxType): void {
  ctx.response.status = HTTP_STATUS_CODE.OK;
  ctx.response.set('Content-type', 'application/json');
  ctx.body = JSON.stringify(dbBoards);
}

export function updateBoard(boardId: string, ctxBody: IBoard): void {
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (board) {
    board.title = ctxBody.title;
    board.columns = ctxBody.columns;
  }
}
