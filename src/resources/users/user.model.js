const { v4: uuidv4 } = require('uuid');

class User {
    constructor({ name = 'USER', login = "User0", password = 'P@55w0rd' } = {}) {
        this.id = uuidv4();
        this.name = name;
        this.login = login;
        this.password = password;
    }

    static toResponse(task) {
        const { id, name, login, password } = task;
        return { id, name, login, password };
    }
}

module.exports = User;

