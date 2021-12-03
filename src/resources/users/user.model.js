const { v4: uuidv4 } = require('uuid');

class User {
  constructor({
    name = 'TEST_USER',
    login = 'test_user',
    password = 'T35t_P@55w0rd',
  } = {}) {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  updateUser({ name, login, password }) {
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login, password } = user;
    return { id, name, login, password };
  }
}

module.exports = User;
