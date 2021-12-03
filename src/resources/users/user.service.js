const dbUsers = require('./user.memory.repository');
const User = require('./user.model');

// get all users (remove password from response)
function showUserList() {
  return dbUsers.map((item) => {
    delete item['password'];
    return item;
  });
}

// return representation of user without password
function showUser(user) {
  delete user['password'];
  return user;
}

// return object of User
function getUserObject(id) {
  return dbUsers.find((item) => item.id == id);
}

//* OK
function getUserById(ctx) {
  let user = getUserObject(ctx.params.userId);
  if (user) {
    ctx.body = JSON.stringify(showUser(user));
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
}

//* OK
function addUser(ctxReqBody) {
  try {
    const newUser = new User(ctxReqBody);
    dbUsers.push(newUser);
    return JSON.stringify(showUser(newUser));
  } catch (error) {
    ctx.body = JSON.stringify(`error creating User`);
    ctx.status = 500;

    console.log(`error creating User`, error);
  }
}

//* OK
function updUser(ctx) {
  let user = getUserObject(ctx.params.userId);
  if (user) {
    user.updateUser(ctx.request.body);
    ctx.body = JSON.stringify(showUser(user));
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
}

//* OK
function delUser(ctx) {
  let user = getUserObject(ctx.params.userId);
  if (user) {
    dbUsers.splice(dbUsers.indexOf(user), 1);
    ctx.body = `deleted users id = ${ctx.params.userId}`;
  } else {
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
}

module.exports = {
  getUserById,
  showUserList,
  showUser,
  delUser,
  addUser,
  updUser,
  delUser,
};
