import Game from "../src/logic/Game.js";

let game;
let boardSize;
let kittenLives;

beforeEach(() => {
  boardSize = 6;
  kittenLives = 3;
  game = new Game(boardSize, kittenLives);
  game.reset();
});

describe("the board", () => {
  describe("after creation", () => {
    it("should throw exception if board size too small", () => {
      expect(() => new Game(0)).toThrow(Error);
      expect(() => new Game(1)).toThrow(Error);
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
      expect(game.set(0, 1, "W")).toBe("W");
      expect(game.get(0, 1)).toBe("W");

      expect(game.set(4, 4, "B")).toBe("B");
      expect(game.get(4, 4)).toBe("B");
    });
  });
});

describe("the game", () => {
  it("should have the set number of kittens for each player", () => {
    expect(game.whiteKittens).toBe(kittenLives);
    expect(game.blackKittens).toBe(kittenLives);
  });

  it("should not be able to place a kitten on an occupied cell", () => {
    game.gameMove(1, 1);
    game.gameMove(1, 1);
    expect(game.whiteKittens).toBe(kittenLives - 1);
    expect(game.blackKittens).toBe(kittenLives);
    expect(game.get(1, 1)).toBe("W");
  });

  it("should have one less kitten after placing one", () => {
    game.placeWhite(1,1);
    expect(game.whiteKittens).toBe(kittenLives-1);

    game.placeBlack(4,4);
    expect(game.blackKittens).toBe(kittenLives-1);
  });

  it("should end after white player places all their kittens", () => {
    game.placeWhite(1,1);
    game.placeWhite(1,2);
    game.placeWhite(1,3);
    expect(game.winCondition()).toBe(true);
  });

  it("should end after black player places all their kittens", () => {
    game.placeBlack(1,1);
    game.placeBlack(1,2);
    game.placeBlack(1,3);
    expect(game.winCondition()).toBe(true);
  });
});
