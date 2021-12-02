const { v4: uuidv4 } = require('uuid');

module.exports = class Board {
    constructor(title, columns) {
        this.id = uuidv4();
        this.title = title;
        this.columns = columns;
    }
}

