const {
  dbUsers,
  showUser,
  getUserById,
  showUserList,
} = require('./user.memory.repository');
const User = require('./user.model');

//* OK
exports.getUser = function (ctx) {
  let user = getUserById(ctx.params.userId);
  if (user) {
    ctx.body = JSON.stringify(showUser(user));
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
};

//* OK
exports.getUserList = function () {
  return showUserList();
};

//* OK
exports.addUser = function (ctxReqBody) {
  try {
    const newUser = new User(ctxReqBody);
    dbUsers.push(newUser);
    return JSON.stringify(showUser(newUser));
  } catch (error) {
    ctx.body = JSON.stringify(`error creating User`);
    ctx.status = 500;

    console.log(`error creating User`, error);
  }
};

//* OK
exports.updUser = function (ctx) {
  let user = getUserById(ctx.params.userId);
  if (user) {
    user.updateUser(ctx.request.body);
    ctx.body = JSON.stringify(showUser(user));
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
};

//* OK
exports.delUser = function (ctx) {
  let user = getUserById(ctx.params.userId);
  if (user) {
    dbUsers.splice(dbUsers.indexOf(user), 1);
    ctx.body = `deleted users id = ${ctx.params.userId}`;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
};
