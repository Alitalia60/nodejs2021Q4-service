const dbUsers = [];

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
function getUserById(id) {
  return dbUsers.find((item) => item.id == id);
}

module.exports = { dbUsers, showUserList, showUser, getUserById };
