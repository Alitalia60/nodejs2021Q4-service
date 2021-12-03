const dbTasks = require('../tasks/task.memory.repository');
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
  // delete user['id'];
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

//!! test
function addUser(ctxReqBody) {
  try {
    const newUser = new User(ctxReqBody);
    dbUsers.push(newUser);
    // return JSON.stringify(newUser);
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
    // ctx.set('Content-type', 'application/json');
    user.updateUser(ctx.request.body);

    console.log(ctx.type);
  } else {
    // ctx.response.set('Content-type', 'application/json');
    ctx.body = JSON.stringify(`not found user ${ctx.params.userId}`);
    ctx.status = 404;
  }
}

//* OK
function delUser(ctx) {
  let userId = ctx.params.userId;
  console.log(`before deleting usew=${userId}`);
  console.log('dbTasks=', dbTasks);

  let user = getUserObject(ctx.params.userId);
  if (user) {
    //TODO  userID of Tasks must tobe null

    dbTasks.forEach((element) => {
      if ((element.userId = userId)) {
        console.log(`delete TASK ${element} userId ${userId} = null`);
        element.userId = null;
      }
    });

    dbUsers.splice(dbUsers.indexOf(user), 1);
    ctx.response.status = 200;
    ctx.body = `deleted users id = ${userId}`;

    console.log(`AFTER deleting usew=${userId}`);
    console.log('dbTasks=', dbTasks);
  } else {
    ctx.body = JSON.stringify(`not found user ${userId}`);
    ctx.response.status = 404;
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
