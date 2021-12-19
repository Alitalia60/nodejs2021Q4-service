import { Board } from "./board.model";
import { dbBoards, updateBoard } from "./board.memory.repository";
import { deleteColumnsOfBoardId } from "../columns/column.memory.repository";
import { deleteTasksOfBoardId } from "../tasks/task.memory.repository";
import { koaContext } from "../../common/types";
import { HTTP_STATUS_CODE } from "../../common/httpStatusCode";

/**
 * fill response data of board with boardId, if exist
 *
 * @param {koaContext} ctx  - koa context
 */
export function getBoard(ctx: koaContext): void {
  let boardId = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (board) {
    ctx.status = HTTP_STATUS_CODE.OK;
    ctx.response.set("Content-type", "application/json");
    ctx.body = JSON.stringify(board);
  } else {
    ctx.body = JSON.stringify(`not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

/**
 * add new BOARD to memory repository dbBoard
 *
 * @param {koaContext} ctx  - koa context
 */
export function addBoard(ctx: koaContext) {
  try {
    const newBoard = new Board(ctx.request.body);
    dbBoards.push(newBoard);
    ctx.response.status = HTTP_STATUS_CODE.Created;
    ctx.response.set("Content-type", "application/json");
    ctx.response.body = JSON.stringify(newBoard);
  } catch (error) {
    ctx.body = JSON.stringify(`error creating Board`);
    ctx.status = HTTP_STATUS_CODE.Server_Error;
  }
}

/**
 * fill updated data to response with id == ctx.params.boardId
 *
 * @param {koaContext} ctx  - koa context
 */
export function updBoard(ctx: koaContext) {
  let boardId = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (board) {
    deleteColumnsOfBoardId(boardId);
    // updateBoard(board, ctx.request.body);
    updateBoard(boardId, ctx.request.body);
    ctx.set("content-type", "application/json");
    ctx.status = HTTP_STATUS_CODE.OK;
    ctx.body = JSON.stringify(board);
  } else {
    ctx.body = JSON.stringify(`not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}

/**
 * delete board with id == ctx.params.boardId from memory repository dbBoard
 *fill data respons
 *
 * @param {koaContext} ctx  - koa context
 */
export function delBoard(ctx: koaContext) {
  let boardId: string = ctx["params"].boardId;
  let board = dbBoards.filter((board) => board.id === boardId)[0];
  if (board) {
    deleteTasksOfBoardId(boardId);
    deleteColumnsOfBoardId(boardId);
    dbBoards.splice(dbBoards.indexOf(board), 1);
    ctx.body = `deleted boards id = ${boardId}`;
  } else {
    ctx.body = JSON.stringify(`not found board ${boardId}`);
    ctx.status = HTTP_STATUS_CODE.Not_Found;
  }
}
