/**
 * Represents a square in the puzzle board
 * @class
 */
class Square {
    /**
     * Constructor for a square
     * @constructor
     * @param {string} color 
     * @param {boolean} isNinja 
     */
    constructor(color, isNinja) {
        this.color = color;
        this.isNinja = isNinja;
    }

    /**
     * Convert Square into a string for printing
     * @returns The color of the square
     */
    toString() {
        return this.color;
    }
}

/**
 * Represents the puzzle board and various aspects of its state
 * @class
 */
class Puzzle {
    /**
     * Constructor for the puzzle. 
     * Sets the validity of the directions and whether the game has removable colors or is complete for the purpose of enabling buttons on the page.
     * If a configuration is selected, it parses the configuration to create the initial board and start the game.
     * @constructor
     * @param {Object} boardInfo Board configuration information
     * @returns Null if the board configuration hasn't been set
     */
    constructor(boardInfo) {
        // Whether Ninja-se can move in the given directions
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.removableColor = false; // for tracking when we can remove a color
        this.complete = false; // for tracking whether the game is complete

        if (boardInfo == null) { return; } // buttons are set, but no puzzle

        // get size of the board and fill it in with blanks
        this.rows = parseInt(boardInfo.numRows);
        this.columns = parseInt(boardInfo.numColumns);
        this.board = Array(this.rows).fill().map(() => Array(this.columns).fill().map(() => new Square("white", false))); //.fill(new Square("white", false))); // fill with empty squares
        
        // initialize the board and set which directions are valid
        this.initialize(boardInfo);
        this.checkDirections();
    }

    /**
     * Initializes the board by placing Ninja-se and colored squares according to the configuration
     * @param {Object} boardInfo Board configuration information
     */
    initialize(boardInfo) {
        // Get ninja coordinates and add Ninja-se to the board
        this.ninjaCoords = this.extractNinja(boardInfo);
        
        for (var i = 0; i < this.ninjaCoords.length; i++) { // for coord in this.ninjaCoords
            let row = this.ninjaCoords[i][0];
            let col = this.ninjaCoords[i][1];
            
            // go to the Square at those coords and change its color and isNinja
            this.board[row][col].color = "#22b14c";
            this.board[row][col].isNinja = true;
        }
        
        // Get coordinates of other defined squares and add them to the board
        this.colorCoords = this.extractBoard(boardInfo);

        for (var j = 0; j < this.colorCoords.length; j++) { // for coord in this.colorCoords
            let row = this.colorCoords[j][0];
            let col = this.colorCoords[j][1];
            
            // go to the Square at those coords and change its color
            this.board[row][col].color = this.colorCoords[j][2];
        }

        // this.board now has nxn squares with colors and Ninja-se
    }

    /**
     * Parses the configuration information to extract the coordinates and colors of each colored square in the board
     * @param {Object} boardInfo Board configuration information
     * @returns {Array} Array of row, column, and color of each colored square in the board
     */
    extractBoard(boardInfo) {
        let allSquares = []; // array to store all colored squares
        
        for (let i = 0; i < boardInfo.initial.length; i++) { // for square in boardInfo.initial
            let square = boardInfo.initial[i]; // get current square
            let row = parseInt(square.row) - 1; // get row from row and shift to 0 index
            
            // get column from column and convert to number
            let col = 0;

            switch (square.column) { // use switch case to convert all letter values to 0-index numbers
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

    /**
     * Extracts information about Ninja-se's initial position from board configuration information
     * @param {Object} boardInfo Board configuration information
     * @returns {Array} Array of coordinates for each of the 4 squares of Ninja-se
     */
    extractNinja(boardInfo) {
        let ninjaCoords = []; // array to hold the Ninja-se coordinates
        
        // get row from ninjaRow of top left corner
        const ninjaRow = parseInt(boardInfo.ninjaRow) - 1; // convert from 1-index to 0-index
        
        // get column from ninjaColumn and convert from letter to number
        let ninjaCol = 0;
        
        switch (boardInfo.ninjaColumn) { // use switch case to turn letters into 0-index numbers
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

    /**
     * Called after each move to update the puzzle.
     * Works by wiping the board and filling it with the updated Ninja-se and colored square coordinates.
     */
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

        // update valid directions and whether there is a removable color or if the game is complete
        this.checkDirections();
        this.check2x2();
        this.checkComplete();
    }

    /**
     * Moves Ninja-se up the board by one row.
     * @returns {int} The number of blocks moved by this movement, which is added to the score
     */
    moveUp() {
        // ninjaCoords = top left, top right, bottom left, bottom right
        let ninjaCols = [this.ninjaCoords[0][1], this.ninjaCoords[1][1]]; // columns of top left, top right
        let ninjaTopRow = this.ninjaCoords[0][0];

        let scoreThisMove = 0; // number of blocks moved this turn

        for (var i = 0; i < ninjaCols.length; i++) { // for each column of Ninja-se
            let squareAbove = this.board[ninjaTopRow - 1][ninjaCols[i]]; // get square directly above Ninja-se
            
            // get colored squares in this column and remove them from this.colorCoords
            let colorsInCol = this.colorCoords.filter(square => square[1] === ninjaCols[i]); // get only the colored squares in this column
            colorsInCol.forEach(colSquare => this.colorCoords.splice(this.colorCoords.findIndex(boardSquare => colSquare === boardSquare), 1)); // remove them temporarily from list of colored squares

            // move Ninja-se up by decrementing row
            this.ninjaCoords[0 + i][0]--; // first val in column
            this.ninjaCoords[2 + i][0]--; // second val in column
            
            if (squareAbove.color === "white") { // square above is empty
                colorsInCol.forEach(square => this.colorCoords.push(square)); // add the colored squares back to this.colorCoords unchanged
            }

            else if (colorsInCol.length + 2 === this.rows) { // if column is full
                // move other squares up by decrementing row
                colorsInCol.forEach(square => square[0] = (square[0] + this.rows - 1) % this.rows); // + numRows - 1 to decrement but stay in 0 to numRows range for modulo
                colorsInCol.forEach(square => this.colorCoords.push(square));

                // update score
                scoreThisMove += colorsInCol.length;
            }

            else { // column has some empty space somewhere
                // get colored squares above Ninja-se in order
                colorsInCol.sort().reverse(); // sort by row value greatest to least (e.g. 5, 4, 0)
                let orderedColors = colorsInCol.filter(square => square[0] < ninjaTopRow);
                
                for (let i = 0; i < colorsInCol.length; i++) { // add remaining colors under Ninja-se
                    if (colorsInCol[i][0] > ninjaTopRow + 1) { orderedColors.push(colorsInCol[i]); }
                }

                // Move squares around as needed
                for (let j = 0; j < orderedColors.length; j++) { // for each colored square in column
                    let currentColorSquare = orderedColors[j];

                    if (j < orderedColors.length - 1) { // if we still have colors to look at ahaead of this one
                        if (currentColorSquare[0] - 1 !== orderedColors[j + 1][0] && currentColorSquare[0] !== 0) { // if next colored square more than 1 row away AND rows in question are not 0 and n
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0]--; // move current square up
                            break; // no more squares in line, break for loop
                        }

                        else if (currentColorSquare[0] === 0 && orderedColors[j + 1][0] !== this.rows - 1) { // if looping around and bottom of board is empty
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = this.rows - 1; // loop around current square
                            break; // no more squares in line, break for loop
                        }

                        else if (currentColorSquare[0] === 0 && orderedColors[j + 1][0] === this.rows - 1) { // if looping around and there's a square there
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = this.rows - 1; // move current around to bottom
                        }

                        else {
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][0] = (orderedColors[j][0] - 1 + this.rows) % this.rows; // move current square up
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

    /**
     * Moves Ninja-se down the board by one row.
     * @returns {int} The number of blocks moved by this movement, which is added to the score
     */
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

            // move Ninja-se up by decrementing row
            this.ninjaCoords[0 + i][0]++; // first val in column
            this.ninjaCoords[2 + i][0]++; // second val in column
            
            if (squareBelow.color === "white") { // square below is empty
                colorsInCol.forEach(square => this.colorCoords.push(square)); // add the colored squares back to this.colorCoords
            }

            else if (colorsInCol.length + 2 === this.rows) { // if column is full
                // move other squares down by incrementing row
                colorsInCol.forEach(square => square[0] = (square[0] + 1) % this.rows);
                colorsInCol.forEach(square => this.colorCoords.push(square));

                // update score
                scoreThisMove += colorsInCol.length;
            }

            else { // column has some empty space somewhere
                // get colored squares above Ninja-se in order
                colorsInCol.sort(); // sort by row value least to greatest (e.g. 0, 4, 5)
                let orderedColors = colorsInCol.filter(square => square[0] > ninjaTopRow + 1); // get squares below Ninja-se
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

    /**
     * Moves Ninja-se to the left by one column.
     * @returns {int} The number of blocks moved by this movement, which is added to the score
     */
    moveLeft() {
        // ninjaCoords = top left, top right, bottom left, bottom right
        let ninjaRows = [this.ninjaCoords[0][0], this.ninjaCoords[2][0]]; // rows of top and bottom left
        let ninjaLeftCol = this.ninjaCoords[0][1];
        
        let scoreThisMove = 0;

        for (var i = 0; i < ninjaRows.length; i++) { // for each row of Ninja-se
            let squareLeft = this.board[ninjaRows[i]][ninjaLeftCol - 1];
            
            // get colored squares in this row and remove them from this.colorCoords
            let colorsInRow = this.colorCoords.filter(square => square[0] === ninjaRows[i]); // get only the colored squares in this column
            colorsInRow.forEach(rowSquare => this.colorCoords.splice(this.colorCoords.findIndex(boardSquare => rowSquare === boardSquare), 1));

            // move Ninja-se left by decrementing column
            this.ninjaCoords[0 + 2*i][1]--; // first val in row
            this.ninjaCoords[1 + 2*i][1]--; // second val in row
            
            if (squareLeft.color === "white") { // square left is empty
                colorsInRow.forEach(square => this.colorCoords.push(square)); // add the colored squares back to this.colorCoords
            }

            else if (colorsInRow.length + 2 === this.columns) { // if row is full
                // move other squares left by decrementing column
                colorsInRow.forEach(square => square[1] = (square[1] + this.columns - 1) % this.columns); // + numCols - 1 to decrement but stay in 0 to numCols range for modulo
                colorsInRow.forEach(square => this.colorCoords.push(square));

                // update score
                scoreThisMove += colorsInRow.length;
            }

            else { // row has some empty space somewhere
                // get colored squares above Ninja-se in order
                colorsInRow.sort().reverse(); // sort by column value greatest to least (e.g. 5, 4, 0)
                let orderedColors = colorsInRow.filter(square => square[1] < ninjaLeftCol);
                
                for (let i = 0; i < colorsInRow.length; i++) { // add remaining colors under Ninja-se
                    if (colorsInRow[i][1] > ninjaLeftCol + 1) { orderedColors.push(colorsInRow[i]); }
                }

                // Move squares around as needed
                for (let j = 0; j < orderedColors.length; j++) {
                    let currentColorSquare = orderedColors[j];

                    if (j < orderedColors.length - 1) { // if we still have colors to look at ahaead of this one
                        if (currentColorSquare[1] - 1 !== orderedColors[j + 1][1] && currentColorSquare[1] !== 0) { // if next colored square more than 1 column away AND columns in question are not 0 and n
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][1]--; // move current square left
                            break; // no more squares in line, break for loop
                        }

                        else if (currentColorSquare[1] === 0 && orderedColors[j + 1][1] !== this.columns - 1) {
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][1] = this.columns - 1; // loop around current square
                            break;
                        }

                        else if (currentColorSquare[1] === 0 && orderedColors[j + 1][1] === this.columns - 1) { // if looping around and there's a square there
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][1] = this.columns - 1; // move current around to right
                        }

                        else {
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][1] = (orderedColors[j][1] - 1 + this.columns) % this.columns; // move square to the left
                        }
                    }

                    else { // last element in the list gets moved if we got this far
                        scoreThisMove++;
                        orderedColors[j][1] = (orderedColors[j][1] - 1 + this.columns) % this.columns;
                    }
                }

                orderedColors.forEach(square => this.colorCoords.push(square)); // add the squares back
            }
        }
        
        this.updatePuzzle();
        return scoreThisMove; // return update for score
    }

    /**
     * Moves Ninja-se to the right one column
     * @returns {int} The number of blocks moved by this movement, which is added to the score
     */
    moveRight() {
        // ninjaCoords = top left, top right, bottom left, bottom right
        let ninjaRows = [this.ninjaCoords[0][0], this.ninjaCoords[2][0]]; // rows of top and bottom left
        let ninjaLeftCol = this.ninjaCoords[0][1];

        let scoreThisMove = 0;

        for (var i = 0; i < ninjaRows.length; i++) { // for each row of Ninja-se
            let squareRight = this.board[ninjaRows[i]][ninjaLeftCol + 2];
            
            // get colored squares in this row and remove them from this.colorCoords
            let colorsInRow = this.colorCoords.filter(square => square[0] === ninjaRows[i]); // get only the colored squares in this column
            colorsInRow.forEach(rowSquare => this.colorCoords.splice(this.colorCoords.findIndex(boardSquare => rowSquare === boardSquare), 1));

            // move Ninja-se right by incrementing column
            this.ninjaCoords[0 + 2*i][1]++; // first val in row
            this.ninjaCoords[1 + 2*i][1]++; // second val in row
            
            if (squareRight.color === "white") { // square right is empty
                colorsInRow.forEach(square => this.colorCoords.push(square)); // add the colored squares back to this.colorCoords
            }

            else if (colorsInRow.length + 2 === this.columns) { // if row is full
                // move other squares right by incrementing column
                colorsInRow.forEach(square => square[1] = (square[1] + 1) % this.columns); // + numRows - 1 to decrement but stay in 0 to numRows range for modulo
                colorsInRow.forEach(square => this.colorCoords.push(square));

                // update score
                scoreThisMove += colorsInRow.length;
            }

            else { // row has some empty space somewhere
                // get colored squares above Ninja-se in order
                colorsInRow.sort(); // sort by column value greatest to least (e.g. 5, 4, 0)
                let orderedColors = colorsInRow.filter(square => square[1] > ninjaLeftCol + 1);
                for (let i = 0; i < colorsInRow.length; i++) { // add remaining colors left of Ninja-se
                    if (colorsInRow[i][1] < ninjaLeftCol) { orderedColors.push(colorsInRow[i]); }
                }

                // Move squares around as needed
                for (let j = 0; j < orderedColors.length; j++) {
                    let currentColorSquare = orderedColors[j];
                    console.log(currentColorSquare[2]);

                    if (j < orderedColors.length - 1) { // if we still have colors to look at ahead of this one
                        if (currentColorSquare[1] + 1 !== orderedColors[j + 1][1] && currentColorSquare[1] !== this.columns - 1) { // if next colored square more than 1 colummn away AND columns in question are not 0 and n
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][1]++; // move current square right
                            break; // no more squares in line, break for loop
                        }

                        else if (currentColorSquare[1] === this.columns - 1 && orderedColors[j + 1][1] !== 0) { // if looping around and no square
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][1] = 0; // loop around current square
                            break;
                        }

                        else if (currentColorSquare[1] === this.columns - 1 && orderedColors[j + 1][1] === 0) { // if looping around and there's a square there
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][1] = 0; // move current around to left
                        }

                        else {
                            scoreThisMove++; // increase score by 1
                            orderedColors[j][1] = (orderedColors[j][1] + 1) % this.columns;
                        }
                    }

                    else { // last element in the list gets moved if we got this far
                        scoreThisMove++;
                        orderedColors[j][1] = (orderedColors[j][1] + 1) % this.columns;
                    }
                }

                orderedColors.forEach(square => this.colorCoords.push(square)); // add the squares back
            }
        }
        
        this.updatePuzzle();
        return scoreThisMove; // return update for score
    }

    /**
     * Checks if there is a color that can be removed because its squares form a 2x2 square.
     * Assigns the colored squares to this.removable if the color can be removed
     * @returns Null if there's a color to be remove. Assigns first found removable color to this.removable
     */
    check2x2() {
        // sort colorCoords by color
        this.colorCoords.sort(function (a, b) {
            if (a[2] > b[2]) { return 1; }
            if (b[2] > a[2]) { return -1; }
            return 0;
        });

        // check in groups of 4
        for (var i = 0; i < this.colorCoords.length; i += 4) {
            // get cols and rows of current color
            let rowsOfCurrentColor = [this.colorCoords[i][0], this.colorCoords[i + 1][0], this.colorCoords[i + 2][0], this.colorCoords[i + 3][0]];
            let colsOfCurrentColor = [this.colorCoords[i][1], this.colorCoords[i + 1][1], this.colorCoords[i + 2][1], this.colorCoords[i + 3][1]];
        
            // turn into sets to get unique values only and convert back to arrays for accessing
            let uniqueRows = [...new Set(rowsOfCurrentColor)];
            let uniqueColumns = [...new Set(colsOfCurrentColor)];

            if (uniqueRows.length !== 2 || uniqueColumns.length !== 2) { // squares should have only 2 rows and 2 columns
                continue; // skip this color if this is the case
            }
            else if (Math.abs(uniqueRows[0] - uniqueRows[1]) !== 1) { // check that rows are next to each other
                continue;
            }
            else if (Math.abs(uniqueColumns[0] - uniqueColumns[1]) !== 1) { // check that columns are next to each other
                continue;
            }
            else {
                this.removableColor = [this.colorCoords[i], this.colorCoords[i + 1], this.colorCoords[i + 2], this.colorCoords[i + 3]]
                return; // "return" first color only
            }
        }
    }

    /**
     * Checks which directions Ninja-se is able to move in and sets the class booleans accordingly.
     */
    checkDirections() { //check each direction to see if Ninja-se can go that way
        let topLeft = this.ninjaCoords[0];
        
        this.up = !(topLeft[0] === 0); //check up - is top left corner in 0th row?
        this.down = !(topLeft[0] === this.rows - 2);// check down - is top left corner in row above bottom?
        this.left = !(topLeft[1] === 0); // check left - is top left corner in 0th column?
        this.right = !(topLeft[1] === this.columns - 2); // check right - is top left corner a column to the left of right edge
    }

    /**
     * Removes a color from the board by removing its coordinates from this.colorCoords
     */
    removeColor() {
        // remove each square of that color from 
        this.removableColor.forEach(removableSquare => this.colorCoords.splice(this.colorCoords.indexOf(removableSquare), 1));

        // reset this.removableColor
        this.removableColor = false;

        // update the board
        this.updatePuzzle();
    }

    /**
     * Sets this.complete based on how many colors are left. If no colors are left in this.colorCoords, then the game is complete.
     */
    checkComplete() {
        this.complete = this.colorCoords.length === 0;
    }
}

/**
 * Container class for the puzzle for Entity, Boundary, Controller software model
 * @class
 */
export default class Model {
    /**
     * Constructor for the Model class
     * @constructor
     * @param {JSON} config The selected board configuration
     * @returns Null if no configuration has been selected
     */
    constructor(config) {
        if (config == null) { 
            this.puzzle = new Puzzle();
            return; 
        } // if no config set, end initialization

        this.initialize(config);
    }

    /**
     * Initializes the puzzle once a configuration has been selected
     * @param {JSON} config The selected board configuration
     */
    initialize(config) {
        let boardInfo = JSON.parse(JSON.stringify(config)); // convert from JSON to string to Object
        this.puzzle = new Puzzle(boardInfo);
    }
}