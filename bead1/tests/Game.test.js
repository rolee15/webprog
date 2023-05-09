import Game from "../src/logic/Game.js";

let game;
let boardSize;
let kittenLives;

beforeEach(() => {
  boardSize = 6;
  kittenLives = 8;
  game = new Game(boardSize, kittenLives);
  game.reset();
});

describe("the board", () => {
  describe("after creation", () => {
    it("should throw exception if board size too small", () => {
      expect(() => new Game(0)).toThrow(Error);
      expect(() => new Game(1)).toThrow(Error);
      expect(() => new Game(2)).toThrow(Error);
      expect(() => new Game(-1)).toThrow(Error);
    });

    it("should create a board with given board size", () => {
      expect(game.board.length).toBe(boardSize);
      expect(game.board[0].length).toBe(boardSize);
    });

    it("should only have free cells after creation", () => {
      for (let i = 0; i < boardSize; i++)
        for (let j = 0; j < boardSize; j++)
          expect(game.isCellFree(i, j)).toBe(true);
    });
  });

  describe("while getting or setting an element", () => {
    it("should throw exception if trying to get outside bounds", () => {
      expect(() => game.get(-1, 0)).toThrow(Error);
      expect(() => game.get(0, -1)).toThrow(Error);
      expect(() => game.get(6, 0)).toThrow(Error);
      expect(() => game.get(0, 6)).toThrow(Error);
    });

    it("should throw exception if trying to set outside bounds", () => {
      expect(() => game.set(-1, 0, "W")).toThrow(Error);
      expect(() => game.set(0, -1, "W")).toThrow(Error);
      expect(() => game.set(6, 0, "W")).toThrow(Error);
      expect(() => game.set(0, 6, "W")).toThrow(Error);
    });

    it("should throw exception if trying to set invalid value", () => {
      expect(() => game.set(-1, 0, null)).toThrow(Error);
      expect(() => game.set(-1, 0, "C")).toThrow(Error);
      expect(() => game.set(-1, 0, 42)).toThrow(Error);
    });

    it("should return value if trying to get inside bounds", () => {
      game.set(0, 1, "W");
      expect(game.get(0, 1)).toBe("W");

      game.set(4, 4, "B");
      expect(game.get(4, 4)).toBe("B");

      game.set(2, 2, "B");
      game.unset(2, 2);
      expect(game.get(2, 2)).toBeNull();
    });
  });
});

describe("the game", () => {
  it("should have the set number of kittens for each player", () => {
    expect(game.whiteKittens).toBe(kittenLives);
    expect(game.blackKittens).toBe(kittenLives);
  });

  it("should not be able to place a kitten on an occupied cell", () => {
    game.place(1, 1);
    game.place(1, 1);

    expect(game.whiteKittens).toBe(kittenLives - 1);
    expect(game.blackKittens).toBe(kittenLives);
    expect(game.get(1, 1)).toBe("W");
  });

  it("should have one less kitten after placing one", () => {
    game.placeWhite(1, 1);
    expect(game.whiteKittens).toBe(kittenLives - 1);

    game.placeBlack(4, 4);
    expect(game.blackKittens).toBe(kittenLives - 1);
  });

  it("should end and black win after white player places all their kittens", () => {
    game.whiteKittens = 3;
    game.placeWhite(1, 1);
    game.placeWhite(1, 2);
    game.placeWhite(1, 3);

    expect(game.winCondition()).toBe(true);
    expect(game.winner).toBe("Black");
  });

  it("should end and white win after black player places all their kittens", () => {
    game.blackKittens = 3;
    game.placeBlack(1, 1);
    game.placeBlack(1, 2);
    game.placeBlack(1, 3);

    expect(game.winCondition()).toBe(true);
    expect(game.winner).toBe("White");
  });

  it("should end and white win after white player reaching 5 points", () => {
    game.whitePts = 4;
    game.place(1, 1);
    game.place(3, 3);
    game.place(1, 2);
    game.place(3, 4);
    game.place(1, 3);
    game.place(3, 5);
    game.place(1, 4);

    expect(game.winCondition()).toBe(true);
    expect(game.winner).toBe("White");
  });

  it("should end and black win after black player reaching 5 points", () => {
    game.blackPts = 4;
    game.place(5, 5);
    game.place(1, 1);
    game.place(5, 4);
    game.place(1, 2);
    game.place(4, 5);
    game.place(1, 3);
    game.place(3, 5);
    game.place(1, 4);

    expect(game.winCondition()).toBe(true);
    expect(game.winner).toBe("Black");
  });
});

describe("a kitten", () => {
  it("should boop a neighbour to up and left one cell when it is a free space", () => {
    game.placeWhite(1, 1);
    game.placeBlack(2, 2);

    expect(game.get(2, 2)).toBe("B");
    expect(game.get(1, 1)).toBeNull();
    expect(game.get(0, 0)).toBe("W");
  });

  it("should boop a neighbour to up one cell when it is a free space", () => {
    game.placeWhite(1, 2);
    game.placeBlack(2, 2);

    expect(game.get(2, 2)).toBe("B");
    expect(game.get(1, 2)).toBeNull();
    expect(game.get(0, 2)).toBe("W");
  });

  it("should boop a neighbour to up and right one cell when it is a free space", () => {
    game.placeWhite(1, 3);
    game.placeBlack(2, 2);

    expect(game.get(2, 2)).toBe("B");
    expect(game.get(1, 3)).toBeNull();
    expect(game.get(0, 4)).toBe("W");
  });

  it("should boop a neighbour to right one cell when it is a free space", () => {
    game.placeWhite(2, 3);
    game.placeBlack(2, 2);

    expect(game.get(2, 2)).toBe("B");
    expect(game.get(2, 3)).toBeNull();
    expect(game.get(2, 4)).toBe("W");
  });

  it("should boop a neighbour to down and right one cell when it is a free space", () => {
    game.placeWhite(3, 3);
    game.placeBlack(2, 2);

    expect(game.get(2, 2)).toBe("B");
    expect(game.get(3, 3)).toBeNull();
    expect(game.get(4, 4)).toBe("W");
  });

  it("should boop a neighbour to down one cell when it is a free space", () => {
    game.placeWhite(3, 2);
    game.placeBlack(2, 2);

    expect(game.get(2, 2)).toBe("B");
    expect(game.get(3, 2)).toBeNull();
    expect(game.get(4, 2)).toBe("W");
  });

  it("should boop a neighbour to down and left one cell when it is a free space", () => {
    game.placeWhite(3, 1);
    game.placeBlack(2, 2);

    expect(game.get(2, 2)).toBe("B");
    expect(game.get(3, 1)).toBeNull();
    expect(game.get(4, 0)).toBe("W");
  });

  it("should boop a neighbour to left one cell when it is a free space", () => {
    game.placeWhite(2, 1);
    game.placeBlack(2, 2);

    expect(game.get(2, 2)).toBe("B");
    expect(game.get(2, 1)).toBeNull();
    expect(game.get(2, 0)).toBe("W");
  });

  it("should boop a neighbour from the board when it is in the corner", () => {
    game.placeWhite(0, 0);
    game.placeBlack(1, 1);
    expect(game.get(1, 1)).toBe("B");
    expect(game.get(0, 0)).toBeNull();
    expect(game.whiteKittens).toBe(game.kittenLives);

    game.placeWhite(0, 5);
    game.placeBlack(1, 4);
    expect(game.get(1, 4)).toBe("B");
    expect(game.get(0, 5)).toBeNull();
    expect(game.whiteKittens).toBe(game.kittenLives);

    game.placeWhite(5, 0);
    game.placeBlack(4, 1);
    expect(game.get(4, 1)).toBe("B");
    expect(game.get(5, 0)).toBeNull();
    expect(game.whiteKittens).toBe(game.kittenLives);

    game.placeWhite(5, 5);
    game.placeBlack(4, 4);
    expect(game.get(4, 4)).toBe("B");
    expect(game.get(5, 5)).toBeNull();
    expect(game.whiteKittens).toBe(game.kittenLives);
  });

  it("should boop a neighbour from the board when it is next to the edge but not in the corner", () => {
    game.placeWhite(0, 1);
    game.placeBlack(1, 1);
    expect(game.get(1, 1)).toBe("B");
    expect(game.get(0, 1)).toBeNull();
    expect(game.whiteKittens).toBe(game.kittenLives);

    game.placeWhite(1, 5);
    game.placeBlack(1, 4);
    expect(game.get(1, 4)).toBe("B");
    expect(game.get(1, 5)).toBeNull();
    expect(game.whiteKittens).toBe(game.kittenLives);

    game.placeWhite(5, 4);
    game.placeBlack(4, 4);
    expect(game.get(4, 4)).toBe("B");
    expect(game.get(5, 4)).toBeNull();
    expect(game.whiteKittens).toBe(game.kittenLives);

    game.placeWhite(4, 0);
    game.placeBlack(4, 1);
    expect(game.get(4, 1)).toBe("B");
    expect(game.get(4, 0)).toBeNull();
    expect(game.whiteKittens).toBe(game.kittenLives);
  });

  it("should not boop a neighbour when the other side of the neighbor is occupied", () => {
    game.placeWhite(1, 1);
    game.placeBlack(1, 3);
    game.placeWhite(1, 4);
    game.placeBlack(1, 3);

    expect(game.get(1, 1)).toBe("W");
    expect(game.get(1, 2)).toBe("B");
    expect(game.get(1, 3)).toBe("B");
    expect(game.get(1, 4)).toBeNull();
    expect(game.get(1, 5)).toBe("W");
  });

  it("and it's two neighbours should be placed back on the bench if three of them are in line in a row", () => {
    game.place(1, 1);
    game.place(5, 5);
    game.place(1, 2);
    game.place(5, 4);
    game.place(1, 3);
    game.place(4, 5);
    game.place(1, 4);

    expect(game.get(1, 0)).toBeNull();
    expect(game.get(1, 1)).toBeNull();
    expect(game.get(1, 2)).toBeNull();
    expect(game.get(1, 3)).toBeNull();
    expect(game.get(1, 4)).toBe("W");
  });

  it("and it's two neighbours should be placed back on the bench if three of them are in line in a column", () => {
    game.place(1, 1);
    game.place(0, 5);
    game.place(2, 1);
    game.place(0, 4);
    game.place(3, 1);
    game.place(1, 5);
    game.place(4, 1);

    expect(game.get(0, 1)).toBeNull();
    expect(game.get(1, 1)).toBeNull();
    expect(game.get(2, 1)).toBeNull();
    expect(game.get(3, 1)).toBeNull();
    expect(game.get(4, 1)).toBe("W");
  });

  it("and it's two neighbours should be placed back on the bench if three of them are in line diagonally", () => {
    game.place(1, 1);
    game.place(0, 5);
    game.place(2, 2);
    game.place(0, 4);
    game.place(3, 3);
    game.place(1, 5);
    game.place(4, 4);

    expect(game.get(0, 0)).toBeNull();
    expect(game.get(1, 1)).toBeNull();
    expect(game.get(2, 2)).toBeNull();
    expect(game.get(3, 3)).toBeNull();
    expect(game.get(4, 4)).toBe("W");
  });

  it("and it's two neighbours should be placed back on the bench if three of them are in line anti-diagonally", () => {
    game.place(1, 4);
    game.place(0, 0);
    game.place(2, 3);
    game.place(1, 1);
    game.place(3, 2);
    game.place(0, 1);
    game.place(4, 1);

    expect(game.get(0, 5)).toBeNull();
    expect(game.get(1, 4)).toBeNull();
    expect(game.get(2, 3)).toBeNull();
    expect(game.get(3, 2)).toBeNull();
    expect(game.get(4, 1)).toBe("W");
  });
});

describe("the score", () => {
  it("should increase when three kittens with the same color are in line", () => {
    game.place(1, 1);
    game.place(3, 3);
    game.place(1, 2);
    game.place(3, 4);
    game.place(1, 3);
    game.place(3, 5);
    game.place(1, 4);

    expect(game.whitePts).toBe(1);
  });
});
