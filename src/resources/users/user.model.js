const { v4: uuidv4 } = require('uuid');

class User {
  constructor({ name = 'USER', login = 'User0', password = 'P@55w0rd' } = {}) {
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
