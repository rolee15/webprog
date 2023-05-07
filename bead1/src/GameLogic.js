class GameLogic {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.clearBoard();
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
}

export default GameLogic;
