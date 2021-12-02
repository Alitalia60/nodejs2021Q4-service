const dbBoards = require('./board.memory.repository');
const Board = require('./board.model');

// USER

function findBoardById(id) {
  return dbBoards.find((item) => item.id == id);
}

//!!
exports.getBoard = function (ctx) {
  let board = findBoardById(ctx.params.boardId);
  if (board) {
    ctx.body = JSON.stringify(board);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found board ${ctx.params.boardId}`);
    ctx.status = 404;
  }
};

//!!
exports.getBoardList = function (ctx) {
  return JSON.stringify(dbBoards);
};

//!!
exports.addBoard = function (param) {
  try {
    const newBoard = new Board(param);
    dbBoards.push(newBoard);
    return JSON.stringify(newBoard);
  } catch (error) {
    ctx.body = JSON.stringify(`error creating Board`);
    ctx.status = 500;

    console.log(`error creating Board`, error);
  }
};

//TODO
exports.updBoard = function (ctx) {
  let board = findBoardById(ctx.params.boardId);
  if (board) {
    board.updateBoard(ctx.request.body);
    ctx.body = JSON.stringify(board);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found board ${ctx.params.boardId}`);
    ctx.status = 404;
  }
};

//TODO
exports.delBoard = function (ctx) {
  let board = findBoardById(ctx.params.boardId);
  if (board) {
    dbBoards.splice(dbBoards.indexOf(board), 1);
    ctx.body = `deleted boards id = ${ctx.params.boardId}`;
  } else {
    ctx.body = JSON.stringify(`not found board ${ctx.params.boardId}`);
    ctx.status = 404;
  }
};
