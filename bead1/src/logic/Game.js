class Game {
  isGameWon;
  isWhite;
  winner;

  constructor(boardSize, kittenLives) {
    if (boardSize < 2) throw new Error("Board must be at least 2x2!");
    this.boardSize = boardSize;
    this.clearBoard();

    if (kittenLives < 3)
      throw new Error("Players must have at least 3 kittens!");
    this.kittenLives = kittenLives;
    this.whiteKittens = kittenLives;
    this.blackKittens = kittenLives;
  }

  reset() {
    this.clearBoard();
    this.restoreKittens();
    this.isGameWon = false;
    this.isWhite = true;
    this.winner = "Nobody";
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

  winCondition() {
    if (this.whiteKittens === 0) {
      this.winner = "Black";
      this.isGameWon = true;
    } else if (this.blackKittens === 0) {
      this.winner = "White";
      this.isGameWon = true;
    }

    return this.isGameWon;
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
      throw new Error("Invalid value given: " + value);

    return (this.board[i][j] = value);
  }

  isCellFree(i, j) {
    if (i < 0 || i >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + i);
    if (j < 0 || j >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + j);

    return !this.board[i][j];
  }

  placeWhite() {
    if (this.whiteKittens > 0) this.whiteKittens--;
  }

  placeBlack() {
    if (this.blackKittens > 0) this.blackKittens--;
  }

  gameMove(row, col) {
    if (
      this.isCellFree(row, col) &&
      ((this.isWhite && this.whiteKittens > 0) ||
        (!this.isWhite && this.blackKittens > 0))
    ) {
      this.set(row, col, this.isWhite ? "W" : "B");
      this.isWhite ? this.placeWhite() : this.placeBlack();
      this.isWhite = !this.isWhite;
    }
  }

  restoreKittens() {
    this.whiteKittens = this.kittenLives;
    this.blackKittens = this.kittenLives;
  }

  getWhiteKittensLeft() {
    return this.whiteKittens;
  }

  getBlackKittensLeft() {
    return this.blackKittens;
  }
}

export default Game;
