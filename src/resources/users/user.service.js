const dbUsers = require('./user.memory.repository');
const User = require('./user.model');

// USER

function findUserById(id) {
  return dbUsers.find((item) => item.id == id);
}

//!!
exports.getUser = function (ctx) {
  let user = findUserById(ctx.params.userId);
  if (user) {
    ctx.body = JSON.stringify(user);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
};

//!!
exports.getUserList = function (ctx) {
  return JSON.stringify(dbUsers);
};

//!!
exports.addUser = function (param) {
  try {
    const newUser = new User(param);
    dbUsers.push(newUser);
    return JSON.stringify(newUser);
  } catch (error) {
    ctx.body = JSON.stringify(`error creating User`);
    ctx.status = 500;

    console.log(`error creating User`, error);
  }
};

//TODO
exports.updUser = function (ctx) {
  let user = findUserById(ctx.params.userId);
  if (user) {
    user.updateUser(ctx.request.body);
    ctx.body = JSON.stringify(user);
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
};

//TODO
exports.delUser = function (ctx) {
  let user = findUserById(ctx.params.userId);
  if (user) {
    dbUsers.splice(dbUsers.indexOf(user), 1);
    ctx.body = `deleted users id = ${ctx.params.userId}`;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
};
