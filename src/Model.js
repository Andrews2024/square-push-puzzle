class Square {
    constructor(color, isNinja) {
        this.color = color;
        this.isNinja = isNinja;
    }

    toString() {
        return this.color;
    }
}

class Puzzle {
    constructor(boardInfo) {
        this.rows = parseInt(boardInfo.numRows);
        this.columns = parseInt(boardInfo.numColumns);
        this.board = Array(this.rows).fill().map(() => Array(this.columns).fill().map(() => new Square("white", false))); //.fill(new Square("white", false))); // fill with empty squares
        this.removableColor = false; // for tracking when we can remove a color
    
        this.initialize(boardInfo);
    }

    initialize(boardInfo) {
        // get ninja coordinates and add Ninja-se to the board
        this.ninjaCoords = this.extractNinja(boardInfo);
        
        for (var i = 0; i < this.ninjaCoords.length; i++) { // for coord in this.ninjaCoords
            let row = this.ninjaCoords[i][0];
            let col = this.ninjaCoords[i][1];
            
            // go to the Square at those coords and change its color and isNinja
            this.board[row][col].color = "green";
            this.board[row][col].isNinja = true;
        }
        
        // get coordinates of other defined squares and add them to the board
        //this.colorCoords = this.extractBoard(boardInfo);
        //console.log(`colors: ${this.colorCoords}`);

        // for coord in this.colorCoords
            // change this.board[coord] to color

        // this.board now has nxn squares with colors
    }

    extractBoard(boardInfo) {
        // for square in boardInfo.initial
            // get row from row
            // get column from column and convert to number
            // get color from color
            // add [row, col], color to list
        // return coordinates and colors with each coordinate
    }

    extractNinja(boardInfo) {
        let ninjaCoords = [];
        
        // get row from ninjaRow of top left corner
        const ninjaRow = parseInt(boardInfo.ninjaRow) - 1; // original board is 1 index, we want 0 index
        
        // get column from ninjaColumn and convert from letter to number
        let ninjaCol = 0;
        
        switch (boardInfo.ninjaColumn) {
            case "A":
                ninjaCol = 0;
                break;
            case "B":
                ninjaCol = 1;
                break;
            case "C":
                ninjaCol = 2;
                break;
            case "D":
                ninjaCol = 3;
                break;
            case "E":
                ninjaCol = 4;
                break;
            case "F":
                ninjaCol = 5;
                break;
        }
        
        // get other coordinates by adding to row, column, and row and column
        ninjaCoords.push([ninjaRow, ninjaCol]);
        ninjaCoords.push([ninjaRow, ninjaCol + 1]);
        ninjaCoords.push([ninjaRow + 1, ninjaCol]);
        ninjaCoords.push([ninjaRow + 1, ninjaCol + 1]);
        
        // return the 4 ninja coordinates
        return ninjaCoords;
    }

    moveCol(direction) {
        // handle moving Ninja-se up or down
        // get columns affected by Ninja-se
        // make copy of current columns 
        // increment coords of all squares (modulo for looping)
        // for squares in the two columns
            // if square color not white/ green and coords changed 
                // increment score
        // increment move counter and numbre of squares affected (score)
    }

    moveRow(direction) {
        // handle moving Ninja-se left or right
        // get rows affected by Ninja-se
        // make copy of current rows 
        // increment coords of all squares (modulo for looping)
        // for squares in the two rows
            // if square color not white/ green and coords changed 
                // increment score
        // increment move counter and numbre of squares affected (score)
    }

    check2x2() {
        // return coords of squares to "remove" if they are 2x2
        // for each row in board - 1
            // for each col in board - 1
                // if square not white/ green
                    // check if other three squares are same color
                    // if so, return the four coords
        // return false
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
        this.puzzle = new Puzzle(boardInfo);
    }
}