import Renderable from "../interface/Renderable.js";

const CELL_COLOR = "white";
const CELL_BORDER_COLOR = "black";

class Board extends Renderable {
  constructor(board, boardSize, cellSize) {
    super();
    this.board = board;
    this.boardSize = boardSize;
    this.cellSize = cellSize;
  }

  render(ctx) {
    this.drawCellBorders(ctx);
    this.drawKittenHeads(ctx);
  }

  drawCellBorders(ctx) {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const x = col * this.cellSize;
        const y = row * this.cellSize;

        ctx.fillStyle = CELL_COLOR;
        ctx.fillRect(x, y, this.cellSize, this.cellSize);
        ctx.strokeStyle = CELL_BORDER_COLOR;
        ctx.strokeRect(x, y, this.cellSize, this.cellSize);
      }
    }
  }

  drawKittenHeads(ctx) {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (!this.board[row][col]) continue;

        const x = col * this.cellSize;
        const y = row * this.cellSize;
        this.drawKittenHead(ctx, x, y, this.board[row][col]);
      }
    }
  }

  drawKittenHead(ctx, x, y, color) {
    const img = new Image();
    if (color === "W") img.src = "../resources/white_kitten.jpg";
    if (color === "B") img.src = "../resources/black_kitten.jpg";
    img.onload = () => {
      ctx.drawImage(
        img,
        x + 10,
        y + 10,
        this.cellSize - 20,
        this.cellSize - 20
      );
    };
  }
}

export default Board;
