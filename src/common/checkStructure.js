const User = require('../resources/users/user.model')
const Board = require('../resources/boards/board.model')
const Task = require('../resources/tasks/task.model')
const Column = require('../resources/columns/column.model');

function checkStructureUser(param) {
    let result = true;
    let jsonParam = JSON.stringify(param);
    Object.keys(new User()).forEach(key => {
        if ((Object.keys(param).indexOf(key) == -1) && (key != 'id')) {
            // console.log(key);
            result = false
        }
    })
    return result
}

function checkStructureBoard(param) {
    let result = true;
    let jsonParam = JSON.stringify(param);
    Object.keys(new Board()).forEach(key => {
        if ((Object.keys(param).indexOf(key) == -1) && (key != 'id')) {
            result = false
        }
    })
    return result
}


//TODO
function checkStructureTask(param) {
    let result = true;
    let jsonParam = JSON.stringify(param);
    Object.keys(new Task()).forEach(key => {
        if ((Object.keys(param).indexOf(key) == -1) && (key != 'id')) {
            // console.log(key);
            result = false
        }
    })
    return result
}

//TODO
function checkStructureColumn(param) {
    let result = true;
    let jsonParam = JSON.stringify(param);
    Object.keys(new Column()).forEach(key => {
        if ((Object.keys(param).indexOf(key) == -1) && (key != 'id')) {
            // console.log(key);
            result = false
        }
    })
    return result
}

module.exports = {
    checkStructureUser,
    checkStructureBoard,
    checkStructureTask,
    checkStructureColumn
}