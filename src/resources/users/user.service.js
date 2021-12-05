const dbTasks = require('../tasks/task.memory.repository');
const dbUsers = require('./user.memory.repository');
const User = require('./user.model');
const checkRequestStructure = require('../../common/checkStructure');

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
  // delete user['id'];
  return user;
}

// return object of User
function getUserObject(id) {
  return dbUsers.find((item) => item.id == id);
}

//* OK
function getUserById(ctx) {
  let userId = ctx.params.userId;
  let user = getUserObject(userId);
  if (user) {
    ctx.body = JSON.stringify(showUser(user));
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = 404;
  }
}

//* OK
function addUser(ctx) {
  if (!ctx.is('application/json')) {
    ctx.status = 400;
    ctx.response.body = 'not application/json';
    return;
  }

  if (!checkRequestStructure(ctx.request.body, new User())) {
    ctx.status = 400;
    ctx.response.body = 'structure of User not valid';
    return;
  }

  try {
    const newUser = new User(ctx.request.body);
    dbUsers.push(newUser);
    ctx.response.status = 201;
    ctx.set('Content-type', 'application/json');
    ctx.response.body = JSON.stringify(showUser(newUser));
    // ctx.response.body = JSON.stringify(newUser);
  } catch (error) {
    ctx.responce.body = JSON.stringify(`error creating User`);
    ctx.status = 500;
    console.log(`error creating User`, error);
  }
}

//* OK
function updUser(ctx) {
  ctx.response.type = 'application/json';
  if (!ctx.is('application/json')) {
    ctx.response.status = 400;
    ctx.response.body = 'not application/json';
    return;
  }
  if (!checkRequestStructure(ctx.request.body, new User())) {
    ctx.response.status = 400;
    console.log('structure of User not valid');
    ctx.response.body = 'structure of User not valid';
    return;
  }
  let userId = ctx.params.userId;
  let user = getUserObject(userId);
  if (user) {
    user.updateUser(ctx.request.body);
    ctx.response.set('Content-type', 'application/json');
    ctx.response.body = JSON.stringify(showUser(user));
    ctx.response.status = 200;
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.status = 404;
  }
}

//* OK
function delUser(ctx) {
  let userId = ctx.params.userId;
  let user = getUserObject(userId);
  if (user) {
    dbTasks.forEach((element) => {
      if (element.userId == userId) {
        element.userId = null;
      }
    });

    dbUsers.splice(dbUsers.indexOf(user), 1);
    ctx.body = `deleted users id = ${userId}`;
    ctx.response.status = 204;
    ctx.response.set('Content-type', 'application/json');
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.response.status = 404;
  }
}

module.exports = {
  getUserById,
  showUserList,
  showUser,
  addUser,
  updUser,
  delUser,
};
