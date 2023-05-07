import GameLogic from "../GameLogic.js";

test("should create a board with given board size", () => {
  const size = 6;
  let game = new GameLogic(size);
  expect(game.board.length).toBe(size);
  expect(game.board[0].length).toBe(size);
});
