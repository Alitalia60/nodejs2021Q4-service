const Column = require('../columns/column.model');
const dbColumns = require('../columns/column.memory.repository');
const dbBoards = require('./board.memory.repository');
const { deleteTasksIfBoardId } = require('../tasks/task.service');
const Board = require('./board.model');
const Task = require('../tasks/task.model');
// const { updColumnsOfBoard } = require('../columns/column.service');

function getBoardList() {
  return dbBoards;
}

function getBoardById(id) {
  return dbBoards.find((item) => item.id == id);
}

//*  OK
function getBoard(ctx) {
  let board = getBoardById(ctx.params.boardId);
  if (board) {
    ctx.body = JSON.stringify(board);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found board ${ctx.params.boardId}`);
    ctx.status = 404;
  }
}

//* OK
function addBoard(ctx) {
  try {
    const newBoard = new Board(ctx.request.body);
    // updColumnsOfBoard(ctx.request.body.columns, newBoard);
    dbBoards.push(newBoard);
    return JSON.stringify(newBoard);
  } catch (error) {
    ctx.body = JSON.stringify(`error creating Board`);
    ctx.status = 500;

    console.log(`error creating Board`, error);
  }

  console.log('Add -> array Boards =', dbBoards.length);
}

//* OK
function updBoard(ctx) {
  // console.log('Befor upd-> array Boards =', dbBoards.length);
  let board = getBoardById(ctx.params.boardId);
  if (board) {
    // console.log(' updBoard ', ctx.params);

    board.updateBoard(ctx.request.body);
    // updColumnsOfBoard(ctx.request.body.columns, newBoard);
    ctx.body = JSON.stringify(board);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found board ${ctx.params.boardId}`);
    ctx.status = 404;
  }
  // console.log('After upd-> array Boards =', dbBoards.length);
}

//* OK
function delBoard(ctx) {
  let boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (board) {
    //!! check
    // delete all tasks from dbTasks where task.boardId == board.id
    deleteTasksIfBoardId(boardId);

    //TODO delete all columns and tasks
    // delete all instances from dbColumns where column.id is in board.columns
    // dbColumns = dbColumns.map(
    // (item) => idOfColumnsOfBoard.indexOf(item.id) != -1
    // );

    // console.log(dbColumns);

    dbBoards.splice(dbBoards.indexOf(board), 1);
    ctx.body = `deleted boards id = ${boardId}`;

    //!! *****
  } else {
    ctx.body = JSON.stringify(`not found board ${boardId}`);
    ctx.status = 404;
  }
}

module.exports = {
  getBoard,
  getBoardById,
  getBoardList,
  addBoard,
  updBoard,
  delBoard,
};
