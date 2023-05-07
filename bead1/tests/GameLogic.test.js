import GameLogic from "../GameLogic.js";

test("should create a board with give board size", () => {
  const size = 6;
  let game = new GameLogic(size);
  expect(game.board).toBe(size);
});
