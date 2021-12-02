const { v4: uuidv4 } = require('uuid');

//TODO not comleted
module.exports = class Column {
    constructor({ id = uuidv4(), title = 'NEW BOARD', columns = 1 } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }

    static toResponse(user) {
        const { id, title, columns } = user;
        return { id, title, columns }
    }
}

