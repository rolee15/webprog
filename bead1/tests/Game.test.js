import Game from "../src/Game.js";

let game;
let boardSize;

beforeEach(() => {
  boardSize = 6;
  game = new Game(boardSize);
});

describe("the game", () => {
  test("should throw excpetion if board size too small", () => {
    expect(() => new Game(0)).toThrow(Error);
    expect(() => new Game(1)).toThrow(Error);
    expect(() => new Game(-1)).toThrow(Error);
  });

  test("should create a board with given board size", () => {
    expect(game.board.length).toBe(boardSize);
    expect(game.board[0].length).toBe(boardSize);
  });

  test("all cells should be free after creation", () => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        expect(game.isCellFree(i, j)).toBe(true);
      }
    }
  });

  test("should throw exception if trying to get outside bounds", () => {
    expect(() => game.get(-1, 0)).toThrow(Error);
    expect(() => game.get(0, -1)).toThrow(Error);
    expect(() => game.get(6, 0)).toThrow(Error);
    expect(() => game.get(0, 6)).toThrow(Error);
  });

  test("should throw exception if trying to set outside bounds", () => {
    expect(() => game.set(-1, 0, Game.WHITE)).toThrow(Error);
    expect(() => game.set(0, -1, Game.WHITE)).toThrow(Error);
    expect(() => game.set(6, 0, Game.WHITE)).toThrow(Error);
    expect(() => game.set(0, 6, Game.WHITE)).toThrow(Error);
  });

  test("should throw exception if trying to set invalid value", () => {
    expect(() => game.set(-1, 0, Game.EMPTY)).toThrow(Error);
    expect(() => game.set(-1, 0, "C")).toThrow(Error);
    expect(() => game.set(-1, 0, 42)).toThrow(Error);
  });

  test("should return value if trying to get inside bounds", () => {
    expect(game.set(0, 1, Game.WHITE)).toBe(Game.WHITE);
    expect(game.get(0, 1)).toBe(Game.WHITE);

    expect(game.set(4, 4, Game.BLACK)).toBe(Game.BLACK);
    expect(game.get(4, 4)).toBe(Game.BLACK);
  });
});
