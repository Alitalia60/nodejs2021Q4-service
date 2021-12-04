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
}

//* OK
function updBoard(ctx) {
  let boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (board) {
    deleteColumnsOfBoardId(boardId);
    board.updateBoard(ctx.request.body);
    ctx.body = JSON.stringify(board);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found board ${boardId}`);
    ctx.status = 404;
  }
}

//* OK
function delBoard(ctx) {
  let boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (board) {
    // delete all tasks from dbTasks where task.boardId == board.id
    deleteTasksIfBoardId(boardId);
    deleteColumnsOfBoardId(boardId);
    dbBoards.splice(dbBoards.indexOf(board), 1);
    ctx.body = `deleted boards id = ${boardId}`;
  } else {
    ctx.body = JSON.stringify(`not found board ${boardId}`);
    ctx.status = 404;
  }
}

function deleteColumnsOfBoardId(boardId) {
  let board = getBoardById(boardId);
  if (board.columns.length != 0) {
    const arrayOfColumns = board.columns;
    arrayOfColumns.forEach((element) => {
      let columnOfBoard = dbColumns.find((el) => el.id == element.id);
      dbColumns.splice(columnOfBoard);
      element = {};
    });
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
