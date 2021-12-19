// import { ParameterizedContext } from 'koa';
// import { IRouterParamContext } from 'koa-router';
import { HTTP_STATUS_CODE } from "../../common/httpStatusCode";
import { IBoard } from "../../common/interfaces";
import { koaContext } from "../../common/types";

/**
 * return as arrray all items of memory repository dbBoards
 */
export const dbBoards: IBoard[] = [];

/**
 * return finded board as Object
 *
 * @param boardId - passed id of board
 * @returns
 */
export function findBoardAsObjectById(id: string): IBoard | undefined {
  return dbBoards.find((item) => item.id == id);
}

/**
 * fill response data with all items of board
 *
 * @param ctx - koa context
 */
export function getBoardList(ctx: koaContext): void {
  ctx.response.status = HTTP_STATUS_CODE.OK;
  ctx.response.set("Content-type", "application/json");
  ctx.body = JSON.stringify(dbBoards);
}

/**
 * update data of object board
 *
 * @param userId - passed user id
 * @param ctxBody - passed koa request body, containing board data
 */
export function updateBoard(boardId: string, ctxBody: IBoard): void {
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (board) {
    board.title = ctxBody.title;
    board.columns = ctxBody.columns;
  }
}
