/**
 * Draws the puzzle onto the HTML canvas
 * @param {*} model The Model object, which contains the puzzle information we need to draw
 * @param {*} canvasObj Current state of reference to the canvas in the HTML
 * @returns Null if no configration has been chosen
 */
export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    if (ctx == null || model.puzzle == null) { return; }    // here for before config chosen

    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  

    // get board size and determine square size in px
    let numRows = model.puzzle.rows;
    let numCols = model.puzzle.columns;
    let squareWidth = canvasObj.width / numCols;
    let squareHeight = canvasObj.height / numRows;
    
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        let square = model.puzzle.board[r][c] // get Square from board for color
        
        let x = c * squareWidth; // coords of starting corner in px
        let y = r * squareHeight;
        
        ctx.fillStyle = square.color;
        ctx.fillRect(x, y, squareWidth, squareHeight);
      }
    }
}