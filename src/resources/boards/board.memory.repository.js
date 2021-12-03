const dbBoards = [];

getBoardList = () => dbBoards;

function getBoardById(id) {
  return dbBoards.find((item) => item.id == id);
}

module.exports = { dbBoards, getBoardList, getBoardById };
