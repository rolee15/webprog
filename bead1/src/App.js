import Game from "./logic/Game.js";
import Board from "./graphics/Board.js";
import KittensLeft from "./graphics/KittensLeft.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultPanel = document.getElementById("resultPanel");

const CELL_SIZE = 80;
const BOARD_SIZE = 6;
const KITTEN_LIVES = 8;

class App {
  objects = [];
  game = new Game(BOARD_SIZE, KITTEN_LIVES);

  constructor() {
    this.objects.push(this.board);
    this.objects.push(this.kittens);
    canvas.onclick = this.gameLoop.bind(this);
  }

  getClickedCellIndex(x, y) {
    return {
      row: Math.floor(y / CELL_SIZE),
      col: Math.floor(x / CELL_SIZE),
    };
  }

  gameLoop(event) {
    if (this.game.isGameWon) {
      this.newGame();
      return;
    }

    const { row, col } = this.getClickedCellIndex(event.offsetX, event.offsetY);
    if (row >= this.game.boardSize || col >= this.game.boardSize) return;

    this.game.place(row, col);
    if (this.game.winCondition()) this.displayWinner();

    this.render();
  }

  displayWinner() {
    resultPanel.innerHTML = `<h1>${this.game.winner} wins!</h1>`;
  }

  newGame() {
    this.game.reset();
    resultPanel.innerHTML = "";
    this.render();
  }

  render() {
    this.clearCanvas();

    this.objects = [];
    this.objects.push(
      new Board(this.game.board, this.game.boardSize, CELL_SIZE)
    );
    this.objects.push(
      new KittensLeft(
        this.game.getWhiteKittensLeft(),
        this.game.getBlackKittensLeft()
      )
    );

    this.objects.forEach((o) => o.render(ctx));
  }

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export default App;
