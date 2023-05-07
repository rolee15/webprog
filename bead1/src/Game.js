class Game {
  constructor(boardSize) {
    if (boardSize < 2)
      throw new Error("Board must be at least 2x2!");

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
    if (i < 0 || i >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + i);
    if (j < 0 || j >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + j);

    return this.board[i][j];
  }

  set(i, j, value) {
    if (i < 0 || i >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + i);
    if (j < 0 || j >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + j);
    if (value !== "W" && value !== "B")
      throw new Error("Invalid value given: " + j);

    return this.board[i][j] = value;
  }

  isCellFree(i, j) {
    if (i < 0 || i >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + i);
    if (j < 0 || j >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + j);

    return !this.board[i][j];
  }
}

Game.WHITE = "W";
Game.BLACK = "B";
Game.EMPTY = null;

export default Game;
