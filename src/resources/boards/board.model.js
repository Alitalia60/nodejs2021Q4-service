const { v4: uuidv4 } = require('uuid');

module.exports = class User {
    constructor({ title = 'NEW BOARD', columns = 0 } = {}) {
        this.id = uuidv4();
        this.title = title;
        this.columns = columns;
    }

    static toResponse(user) {
        const { id, title, columns } = user;
        return { id, title, columns }
    }
}

