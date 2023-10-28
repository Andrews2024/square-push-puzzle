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
            this.board[row][col].color = "#22b14c";
            this.board[row][col].isNinja = true;
        }
        
        // get coordinates of other defined squares and add them to the board
        this.colorCoords = this.extractBoard(boardInfo);

        for (var j = 0; j < this.colorCoords.length; j++) { // for coord in this.colorCoords
            let row = this.colorCoords[j][0];
            let col = this.colorCoords[j][1];
            
            // go to the Square at those coords and change its color
            this.board[row][col].color = this.colorCoords[j][2];
        }

        // this.board now has nxn squares with colors and Ninja-se
    }

    extractBoard(boardInfo) {
        let allSquares = [];
        // for square in boardInfo.initial
        for (let i = 0; i < boardInfo.initial.length; i++) {
            let square = boardInfo.initial[i]; // get current square
            let row = parseInt(square.row) - 1; // get row from row and 0-index
            
            // get column from column and convert to number
            let col = 0;

            switch (square.column) {
                case "A":
                    col = 0;
                    break;
                case "B":
                    col = 1;
                    break;
                case "C":
                    col = 2;
                    break;
                case "D":
                    col = 3;
                    break;
                case "E":
                    col = 4;
                    break;
                case "F":
                    col = 5;
                    break;
            }

            let color = square.color; // get color from color

            allSquares.push([row, col, color]); // add square to list
        }
        
        return allSquares; // return coordinates and colors with each coordinate
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
        ninjaCoords.push([ninjaRow, ninjaCol]); // top left
        ninjaCoords.push([ninjaRow, ninjaCol + 1]); // top right
        ninjaCoords.push([ninjaRow + 1, ninjaCol]); // bottom left
        ninjaCoords.push([ninjaRow + 1, ninjaCol + 1]); // bottom right
        
        // return the 4 ninja coordinates
        return ninjaCoords;
    }

    updatePuzzle() {
        // wipe the board to start fresh
        this.board = Array(this.rows).fill().map(() => Array(this.columns).fill().map(() => new Square("white", false)));
        
        // Redraw Ninja-se
        for (var i = 0; i < this.ninjaCoords.length; i++) { // for coord in this.ninjaCoords
            let row = this.ninjaCoords[i][0];
            let col = this.ninjaCoords[i][1];
            
            // go to the Square at those coords and change its color and isNinja
            this.board[row][col].color = "green";
            this.board[row][col].isNinja = true;
        }
        
        // Redraw colored squares
        for (var j = 0; j < this.colorCoords.length; j++) { // for coord in this.colorCoords
            let row = this.colorCoords[j][0];
            let col = this.colorCoords[j][1];
            
            // go to the Square at those coords and change its color
            this.board[row][col].color = this.colorCoords[j][2];
        }
    }

    moveUp() {
        // ninjaCoords = top left, top right, bottom left, bottom right
        let ninjaCols = [this.ninjaCoords[0][1], this.ninjaCoords[1][1]]; // cols of top left, top right
        let ninjaTopRow = this.ninjaCoords[0][0];
        let rowAbove = ninjaTopRow - 1; // assuming Up is disabled if ninja at the top
        let orderOfRows = []; // might use this later for multi-block pushes
        
        let scoreThisMove = 0;

        for (var i = 0; i < ninjaCols.length; i++) { // for each column of Ninja-se
            let squareAbove = this.board[rowAbove][ninjaCols[i]];

            if (squareAbove.color === "white") { // square above is empty
                // move Ninja-se up by decrementing row
                this.ninjaCoords[0 + i][0]--; // first val in column
                this.ninjaCoords[2 + i][0]--; // second val in column
            }
        }
        
            // if no blocks directly above
                // decrease row of all ninjaCoords
            
            // if block directly above, but no blocks after, move block and then Ninja-se

        // handle moving Ninja-se up or down
        // get columns affected by Ninja-se
        // make copy of current columns 
        // increment coords of all squares (modulo for looping)
        // for squares in the two columns
            // if square color not white/ green and coords changed 
                // increment score
        // increment move counter and numbre of squares affected (score)

        this.updatePuzzle();
    }

    moveDown() {

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

        if (config == null) { return; } // if no config set, end initialization

        this.initialize(config);
    }

    initialize(config) {
        let boardInfo = JSON.parse(JSON.stringify(config));
        this.puzzle = new Puzzle(boardInfo);
    }
}