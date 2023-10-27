class Square {
    constructor(row, column, color, width) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.width = width;
    }
}

class Puzzle {
    constructor(boardInfo, ctx) {
        this.rows = boardInfo.numRows;
        this.columns = boardInfo.numColumns;
        this.squareWidth = ctx.clientWidth;
        this.squareHeight = ctx.clientHeight;
    }
}

export function initialize(config, canvasObject) {
    let boardInfo = JSON.parse(JSON.stringify(config));

    let ctx = canvasObject.getContext('2d');
    let puzzle = new Puzzle(boardInfo, ctx);

}