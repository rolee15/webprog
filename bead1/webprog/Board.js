import Renderable from "./Renderable.js";

class Board extends Renderable {
  constructor(boardSize, cellSize) {
    super();
    this.boardSize = boardSize;
    this.cellSize = cellSize;

    this.clearBoard();
  }

  render(ctx) {
    // Draw cell borders
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const x = col * this.cellSize;
        const y = row * this.cellSize;

        ctx.fillStyle = "white";
        ctx.fillRect(x, y, this.cellSize, this.cellSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, this.cellSize, this.cellSize);
      }
    }

    // Draw kitten heads
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
    if (color === "W") img.src = "white_kitten.jpg";
    if (color === "B") img.src = "black_kitten.jpg";
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

  clearBoard() {
    this.board = [];
    for (let row = 0; row < this.boardSize; row++) {
      this.board.push([]);
      for (let col = 0; col < this.boardSize; col++) {
        this.board[row].push(null);
      }
    }
  }

  get(i, j) {
    if (i < 0 || i >= this.boardSize) return;
    if (j < 0 || j >= this.boardSize) return;

    return this.board[i][j];
  }

  set(i, j, value) {
    if (i < 0 || i >= this.boardSize) return;
    if (j < 0 || j >= this.boardSize) return;
    if (value !== "W" && value !== "B") return;

    this.board[i][j] = value;
  }

  isCellFree(i, j) {
    return !this.board[i][j];
  }

  board = [];
}

export default Board;
