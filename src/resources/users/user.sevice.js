const dbUsers = require('./user.memory.repository')
const User = require('./user.model')

// USER

//!!
exports.getUser = function (ctx) {
    ctx.body = `Show user id = ${ctx.params.id}`
}

//!!
exports.getUserList = function (ctx) {
    return JSON.stringify(dbUsers)
}

//!!
exports.addUser = function (param) {
    try {
        const newUser = new User(param);
        dbUsers.push(newUser)
        return JSON.stringify(newUser)

    } catch (error) {
        console.log(`error creating User`, error)
    }
}

//TODO
exports.updUser = function (ctx) {
    ctx.body = `update users id = ${ctx.params.id}`
}

//TODO
exports.delUser = function (ctx) {
    ctx.body = `delete users id = ${ctx.params.id}`
}
