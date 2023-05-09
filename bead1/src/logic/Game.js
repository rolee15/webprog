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

  remove(i, j) {
    const value = this.get(i, j);
    if (!value)
      throw new Error("Cannot remove kitten from cell: " + i + ", " + j);

    this.unset(i, j);
    if (value === "W") this.whiteKittens++;
    if (value === "B") this.blackKittens++;
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
    if (this.didWhiteWin()) {
      this.winner = "White";
      this.isGameWon = true;
    } else if (this.didBlackWin()) {
      this.winner = "Black";
      this.isGameWon = true;
    }

    return this.isGameWon;
  }

  didWhiteWin() {
    return this.blackKittens === 0 || this.whitePts === 5;
  }

  didBlackWin() {
    return this.whiteKittens === 0 || this.blackPts === 5;
  }

  checkThrees() {
    this.checkRows();
    this.checkColumns();
    this.checkDiagonals();
    this.checkAntiDiagonals();
  }

  checkRows() {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 2; j < this.boardSize; j++) {
        this.checkAndRemove(i, j - 2, i, j - 1, i, j);
      }
    }
  }

  checkColumns() {
    for (let j = 0; j < this.boardSize; j++) {
      for (let i = 2; i < this.boardSize; i++) {
        this.checkAndRemove(i - 2, j, i - 1, j, i, j);
      }
    }
  }

  checkDiagonals() {
    for (let i = 2; i <= 5; i++) {
      for (let j = 2; j <= 5; j++) {
        this.checkAndRemove(i - 2, j - 2, i - 1, j - 1, i, j);
      }
    }
  }

  checkAntiDiagonals() {
    for (let i = 2; i <= 5; i++) {
      for (let j = 0; j <= 3; j++) {
        this.checkAndRemove(i - 2, j + 2, i - 1, j + 1, i, j);
      }
    }
  }

  checkAndRemove(i1, j1, i2, j2, i3, j3) {
    const color = this.get(i1, j1);
    if (!color) return;

    if (this.get(i2, j2) === color && this.get(i3, j3) === color) {
      this.remove(i1, j1);
      this.remove(i2, j2);
      this.remove(i3, j3);

      if (color === "W") this.whitePts++;
      if (color === "B") this.blackPts++;
    }
  }
}

export default Game;
