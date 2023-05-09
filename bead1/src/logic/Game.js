class Game {
  isGameWon;
  isWhite;
  winner;
  whitePts;
  blackPts;

  constructor(boardSize, kittenLives) {
    if (boardSize < 3) throw new Error("Board must be at least 3x3!");
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
    this.resetPoints();
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

  restoreKittens() {
    this.whiteKittens = this.kittenLives;
    this.blackKittens = this.kittenLives;
  }

  resetPoints() {
    this.whitePts = 0;
    this.blackPts = 0;
  }

  getWhiteKittensLeft() {
    return this.whiteKittens;
  }

  getBlackKittensLeft() {
    return this.blackKittens;
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

    this.board[i][j] = value;
  }

  unset(i, j) {
    if (i < 0 || i >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + i);
    if (j < 0 || j >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + j);

    this.board[i][j] = null;
  }

  move(iNew, jNew, iCurr, jCurr) {
    if (iCurr < 0 || iCurr >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + iCurr);
    if (jCurr < 0 || jCurr >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + jCurr);
    if (iNew < 0 || iNew >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + iNew);
    if (jNew < 0 || jNew >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + jNew);

    this.set(iNew, jNew, this.get(iCurr, jCurr));
    this.unset(iCurr, jCurr);
  }

  isCellOccupied(i, j) {
    if (i < 0 || i >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + i);
    if (j < 0 || j >= this.boardSize)
      throw new Error("Parameter is out of bounds: " + j);

    return this.board[i][j] !== null;
  }

  isCellFree(i, j) {
    return !this.isCellOccupied(i, j);
  }

  place(row, col) {
    if (this.isCellFree(row, col)) {
      this.isWhite ? this.placeWhite(row, col) : this.placeBlack(row, col);
      this.isWhite = !this.isWhite;
      this.checkThrees();
    }
  }

  placeWhite(row, col) {
    if (this.whiteKittens > 0) {
      this.set(row, col, "W");
      this.whiteKittens--;

      this.boopNeighbors(row, col);
    }
  }

  placeBlack(row, col) {
    if (this.blackKittens > 0) {
      this.set(row, col, "B");
      this.blackKittens--;

      this.boopNeighbors(row, col);
    }
  }

  boopNeighbors(row, col) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        if (
          row + i < 0 ||
          col + j < 0 ||
          row + i >= this.boardSize ||
          col + j >= this.boardSize
        )
          continue;

        if (this.isCellOccupied(row + i, col + j))
          this.boop(row + i, col + j, row, col);
      }
    }
  }

  boop(rowNeighbor, colNeighbor, rowSource, colSource) {
    let moveRow = rowNeighbor - rowSource;
    let moveCol = colNeighbor - colSource;
    let newRow = rowNeighbor + moveRow;
    let newCol = colNeighbor + moveCol;

    let value = this.get(rowNeighbor, colNeighbor);

    if (
      newRow >= 0 &&
      newRow < this.boardSize &&
      newCol >= 0 &&
      newCol < this.boardSize
    ) {
      if (this.isCellFree(newRow, newCol))
        this.move(newRow, newCol, rowNeighbor, colNeighbor);
    } else {
      this.unset(rowNeighbor, colNeighbor);
      if (value === "W") this.whiteKittens++;
      if (value === "B") this.blackKittens++;
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

  checkThrees() {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 2; j < this.boardSize; j++) {
        if (
          this.get(i, j - 2) === "W" &&
          this.get(i, j - 1) === "W" &&
          this.get(i, j) === "W"
        ) {
        }
      }
    }

    for (let j = 0; j < this.boardSize; j++) {
      for (let i = 2; i < this.boardSize; i++) {
        // check columns
      }
    }
  }
}

export default Game;
