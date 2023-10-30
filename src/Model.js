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
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        if (boardInfo == null) { return; } // buttons are available, but no puzzle

        this.rows = parseInt(boardInfo.numRows);
        this.columns = parseInt(boardInfo.numColumns);
        this.board = Array(this.rows).fill().map(() => Array(this.columns).fill().map(() => new Square("white", false))); //.fill(new Square("white", false))); // fill with empty squares
        this.removableColor = false; // for tracking when we can remove a color
    
        this.initialize(boardInfo);
        this.checkDirections();
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
                default:
                    col = 0;
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
            default:
                ninjaCol = 0;
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
            this.board[row][col].color = "#22b14c";
            this.board[row][col].isNinja = true;
        }
        
        // Redraw colored squares
        for (var j = 0; j < this.colorCoords.length; j++) { // for coord in this.colorCoords
            let row = this.colorCoords[j][0];
            let col = this.colorCoords[j][1];
            
            // go to the Square at those coords and change its color
            this.board[row][col].color = this.colorCoords[j][2];
        }

        this.checkDirections()
    }

    moveUp() {
        // ninjaCoords = top left, top right, bottom left, bottom right
        let ninjaCols = [this.ninjaCoords[0][1], this.ninjaCoords[1][1]]; // cols of top left, top right
        let ninjaTopRow = this.ninjaCoords[0][0];
        let rowAbove = ninjaTopRow - 1; // assuming Up is disabled if ninja at the top

        let scoreThisMove = 0;

        for (var i = 0; i < ninjaCols.length; i++) { // for each column of Ninja-se
            let squareAbove = this.board[rowAbove][ninjaCols[i]];
            
            // get colored squares in this column and remove them from this.colorCoords
            let colorsInCol = this.colorCoords.filter(square => square[1] === ninjaCols[i]); // get only the colored squares in this column
            colorsInCol.forEach(colSquare => this.colorCoords.splice(this.colorCoords.findIndex(boardSquare => colSquare === boardSquare), 1));

            if (squareAbove.color === "white") { // square above is empty
                // move Ninja-se up by decrementing row
                this.ninjaCoords[0 + i][0]--; // first val in column
                this.ninjaCoords[2 + i][0]--; // second val in column

                // add the colored squares back to this.colorCoords
                colorsInCol.forEach(square => this.colorCoords.push(square));
            }

            else if (colorsInCol.length + 2 === this.rows) { // if column is full
                // move Ninja-se up by decrementing row
                this.ninjaCoords[0 + i][0]--; // first val in column
                this.ninjaCoords[2 + i][0]--; // second val in column

                // move other squares up by decrementing row
                colorsInCol.forEach(square => square[0] = (square[0] + this.rows - 1) % this.rows); // + numRows - 1 to decrement but stay in 0 to numRows range for modulo
                colorsInCol.forEach(square => this.colorCoords.push(square));

                // update score
                scoreThisMove += colorsInCol.length;
            }

            else { // column has some empty space somewhere
                // move Ninja-se up by decrementing row
                this.ninjaCoords[0 + i][0]--; // first val in column
                this.ninjaCoords[2 + i][0]--; // second val in column

                // get colored squares above Ninja-se in order
                colorsInCol.sort().reverse(); // sort by row value greatest to least (e.g. 5, 4, 0)
                let orderedColors = colorsInCol.filter(square => square[0] < ninjaTopRow);
                for (let i = 0; i < colorsInCol.length; i++) { // add remaining colors under Ninja-se
                    if (colorsInCol[i][0] > ninjaTopRow + 1) { orderedColors.push(colorsInCol[i]); }
                }

                // Move squares around as needed
                for (let j = 0; j < orderedColors.length; j++) {
                    let currentColorSquare = orderedColors[j];

                    if (j < orderedColors.length - 1) { // if we still have colors to look at ahaead of this one
                        if (currentColorSquare[0] - 1 !== orderedColors[j + 1][0] && currentColorSquare[0] !== 0) { // if next colored square more than 1 row away AND rows in question are not 0 and n
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0]--; // move current square up
                            break; // no more squares in line, break for loop
                        }

                        else if (currentColorSquare[0] === 0 && orderedColors[j + 1][0] !== this.rows - 1) {
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = this.rows - 1; // loop around current square
                            break;
                        }

                        else if (currentColorSquare[0] === 0 && orderedColors[j + 1][0] === this.rows - 1) { // if looping around and there's a square there
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = this.rows - 1; // move current around to bottom
                        }

                        else {
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = (orderedColors[j][0] - 1 + this.rows) % this.rows;
                        }
                    }

                    else { // last element in the list gets moved if we got this far
                        scoreThisMove++;
                        orderedColors[j][0] = (orderedColors[j][0] - 1 + this.rows) % this.rows;
                    }
                }

                orderedColors.forEach(square => this.colorCoords.push(square)); // add the squares back
            }
        }
        
        this.updatePuzzle();
        return scoreThisMove; // return update for score
    }

    moveDown() {
        // ninjaCoords = top left, top right, bottom left, bottom right
        let ninjaCols = [this.ninjaCoords[0][1], this.ninjaCoords[1][1]]; // cols of top left, top right
        let ninjaTopRow = this.ninjaCoords[0][0];

        let scoreThisMove = 0;

        for (var i = 0; i < ninjaCols.length; i++) { // for each column of Ninja-se
            let squareBelow = this.board[ninjaTopRow + 2][ninjaCols[i]];
            
            // get colored squares in this column and remove them from this.colorCoords
            let colorsInCol = this.colorCoords.filter(square => square[1] === ninjaCols[i]); // get only the colored squares in this column
            colorsInCol.forEach(colSquare => this.colorCoords.splice(this.colorCoords.findIndex(boardSquare => colSquare === boardSquare), 1));

            if (squareBelow.color === "white") { // square above is empty
                // move Ninja-se up by decrementing row
                this.ninjaCoords[0 + i][0]++; // first val in column
                this.ninjaCoords[2 + i][0]++; // second val in column

                // add the colored squares back to this.colorCoords
                colorsInCol.forEach(square => this.colorCoords.push(square));
            }

            else if (colorsInCol.length + 2 === this.rows) { // if column is full
                // move Ninja-se up by decrementing row
                this.ninjaCoords[0 + i][0]++; // first val in column
                this.ninjaCoords[2 + i][0]++; // second val in column

                // move other squares up by decrementing row
                colorsInCol.forEach(square => square[0] = (square[0] + 1) % this.rows);
                colorsInCol.forEach(square => this.colorCoords.push(square));

                // update score
                scoreThisMove += colorsInCol.length;
            }

            else { // column has some empty space somewhere
                // move Ninja-se down by incrementing row
                this.ninjaCoords[0 + i][0]++; // first val in column
                this.ninjaCoords[2 + i][0]++; // second val in column

                // get colored squares above Ninja-se in order
                colorsInCol.sort(); // sort by row value least to greatest (e.g. 0, 4, 5)
                let orderedColors = colorsInCol.filter(square => square[0] > ninjaTopRow + 1); // get squares below ninja-se
                for (let i = 0; i < colorsInCol.length; i++) { // add remaining colors above Ninja-se
                    if (colorsInCol[i][0] < ninjaTopRow) { orderedColors.push(colorsInCol[i]); }
                }

                // Move squares around as needed
                for (let j = 0; j < orderedColors.length; j++) {
                    let currentColorSquare = orderedColors[j];

                    if (j < orderedColors.length - 1) { // if we still have colors to look at ahaead of this one
                        if (currentColorSquare[0] + 1 !== orderedColors[j + 1][0] && currentColorSquare[0] !== this.rows - 1) { // if next colored square more than 1 row away AND rows in question are not 0 and n
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0]++; // move current square down
                            break; // no more squares in line, break for loop
                        }

                        else if (currentColorSquare[0] === this.rows - 1 && orderedColors[j + 1][0] !== 0) { // if looping around and no square there
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = 0; // loop around current square
                            break;
                        }

                        else if (currentColorSquare[0] === this.rows - 1 && orderedColors[j + 1][0] === 0) { // if looping around and there's a square there
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = 0; // move current around to top
                        }

                        else {
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = (orderedColors[j][0] + 1) % this.rows;
                        }
                    }

                    else { // last element in the list gets moved if we got this far
                        console.log("Last element case")
                        scoreThisMove++;
                        orderedColors[j][0] = (orderedColors[j][0] + 1) % this.rows;
                    }
                }

                orderedColors.forEach(square => this.colorCoords.push(square)); // add the squares back
            }
        }
            

        this.updatePuzzle();
        return scoreThisMove; // return update for score
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

    checkDirections() { //check each direction to see if Ninja-se can go that way
        let topLeft = this.ninjaCoords[0];
        
        this.up = !(topLeft[0] === 0); //check up - is top left corner in 0th row?
        this.down = !(topLeft[0] === this.rows - 2);// check down - is top left corner in row above bottom?
        this.left = !(topLeft[1] === 0); // check left - is top left corner in 0th column?
        this.right = !(topLeft[1] === this.columns - 2); // check right - is top left corner a column to the left of right edge
    }
}

export default class Model {
    static _id = 0;

    constructor(config) {
        this.id = Model._id;
        Model._id++;

        if (config == null) { 
            this.puzzle = new Puzzle();
            return; 
        } // if no config set, end initialization

        this.initialize(config);
    }

    initialize(config) {
        let boardInfo = JSON.parse(JSON.stringify(config));
        this.puzzle = new Puzzle(boardInfo);
    }
}