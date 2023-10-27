class Square {
    constructor(row, column, color, isNinja) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.isNinja = isNinja;
    }
}

class Puzzle {
    constructor(boardInfo) {
        this.rows = boardInfo.numRows;
        this.columns = boardInfo.numColumns;
    }

    initialize() {
        //set up initial configuration
    }

    moveCol(direction) {
        // handle moving Ninja-se up or down
    }

    moveRow(direction) {
        // handle moving Ninja-se left or right
    }
}

export default class Model {
    static _id = 0;

    constructor(config) {
        this.id = Model._id;
        Model._id++;

        if (typeof config === 'undefined') { return; } // if no config set, end initialization

        this.initialize(config);
    }

    initialize(config) {
        let boardInfo = JSON.parse(JSON.stringify(config));
        let puzzle = new Puzzle(boardInfo);
    }
}