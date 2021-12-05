const dbColumns = require('../columns/column.memory.repository');
const dbBoards = require('./board.memory.repository');
const { deleteTasksIfBoardId } = require('../tasks/task.service');
const Board = require('./board.model');
const checkRequestStructure = require('../../common/checkStructure');

function getBoardList() {
  return dbBoards;
}

function getBoardById(id) {
  return dbBoards.find((item) => item.id == id);
}

//*  OK
function getBoard(ctx) {
  let boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (board) {
    ctx.status = 200;
    ctx.response.set('Content-type', 'application/json');
    ctx.body = JSON.stringify(board);
  } else {
    ctx.body = JSON.stringify(`not found board ${boardId}`);
    ctx.status = 404;
  }
}

//* OK
function addBoard(ctx) {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new Board())) {
    // ctx.throw(400, "structure of Board not valid");
    ctx.status = 400;
    ctx.response.body = 'Incorrect structure of Board';
    return;
  }

  try {
    const newBoard = new Board(ctx.request.body);
    dbBoards.push(newBoard);
    ctx.response.status = 201;
    ctx.response.set('Content-type', 'application/json');
    ctx.response.body = JSON.stringify(newBoard);
    return JSON.stringify(newBoard);
  } catch (error) {
    ctx.body = JSON.stringify(`error creating Board`);
    ctx.status = 500;
    console.log(`error creating Board`, error);
  }
}

//* OK
function updBoard(ctx) {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = "not 'application/json";
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new Board())) {
    ctx.status = 400;
    ctx.response.body = 'Incorrect structure of Board';
    return;
  }
  let boardId = ctx.params.boardId;
  let board = getBoardById(boardId);
  if (board) {
    deleteColumnsOfBoardId(boardId);
    board.updateBoard(ctx.request.body);
    ctx.set('content-type', 'application/json');
    ctx.status = 200;
    ctx.body = JSON.stringify(board);
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
