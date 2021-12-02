const dbBoards = require('./board.memory.repository');
const Board = require('./board.model');

// Board
exports.getBoard = function (ctx) {
    ctx.body = `Show board id = ${ctx.params.id}`
}

exports.getBoardList = function (ctx) {
    return JSON.stringify(dbBoards)
}

exports.addBoard = function (param) {
    try {
        const newBrd = new Board(param);
        dbBoards.push(newBrd)
        return JSON.stringify(newBrd)

    } catch (error) {
        console.log(error, `error creating BOARD `)
    }

}

exports.updBoard = function (ctx) {
    ctx.body = `update Boards id = ${ctx.params.id}`
}

exports.delBoard = function (ctx) {
    ctx.body = `delete Boards id = ${ctx.params.id}`
}
