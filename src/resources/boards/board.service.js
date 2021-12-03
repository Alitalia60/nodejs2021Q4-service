const Column = require('../columns/column.model');
const dbColumns = require('../columns/column.memory.repository');
const { dbBoards, getBoardById } = require('./board.memory.repository');
const Board = require('./board.model');

function addColumnsToBard(arrColumns, board) {
  if (arrColumns.length != 0) {
    board.columns = [];
    // const arrColumns = [];
    arrColumns.forEach((element) => {
      board.columns.push(new Column(element));
    });
  }
}

//!!   i'm here
function updColumnsOfBard(arrColumns, board) {
  if (arrColumns.length != 0) {
    board.columns = [];
    // const arrColumns = [];
    arrColumns.forEach((element) => {
      board.columns.push(new Column(element));
    });
  }
}

//*  OK
exports.getBoard = function (ctx) {
  let board = getBoardById(ctx.params.boardId);
  if (board) {
    ctx.body = JSON.stringify(board);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found board ${ctx.params.boardId}`);
    ctx.status = 404;
  }
};

//* OK
exports.addBoard = function (ctx) {
  try {
    const newBoard = new Board(ctx.request.body);
    addColumnsToBard(ctx.request.body.columns);
    dbBoards.push(newBoard);
    return JSON.stringify(newBoard);
  } catch (error) {
    ctx.body = JSON.stringify(`error creating Board`);
    ctx.status = 500;

    console.log(`error creating Board`, error);
  }
};

//* OK
exports.updBoard = function (ctx) {
  let board = getBoardById(ctx.params.boardId);
  if (board) {
    board.updateBoard(ctx.request.body);

    //!!
    console.log(board.columns);

    ctx.body = JSON.stringify(board);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found board ${ctx.params.boardId}`);
    ctx.status = 404;
  }
};

//* OK
exports.delBoard = function (ctx) {
  let board = getBoardById(ctx.params.boardId);
  if (board) {
    dbBoards.splice(dbBoards.indexOf(board), 1);
    ctx.body = `deleted boards id = ${ctx.params.boardId}`;
  } else {
    ctx.body = JSON.stringify(`not found board ${ctx.params.boardId}`);
    ctx.status = 404;
  }
};
