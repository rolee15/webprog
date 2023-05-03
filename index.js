import Board from "./Board.js";
import KittensLeft from "./KittensLeft.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultPanel = document.getElementById("resultPanel");

const CELL_SIZE = 80;
const BOARD_SIZE = 6;
const KITTEN_LIVES = 3;

let objects = [];
let board = new Board(BOARD_SIZE, CELL_SIZE);
let kittens = new KittensLeft(KITTEN_LIVES);

let isGameWon;
let isWhite;
let winText;

function gameLoop(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  const row = Math.floor(y / CELL_SIZE);
  const col = Math.floor(x / CELL_SIZE);

  if (row >= board.boardSize || col >= board.boardSize) return;

  if (isGameWon) {
    newGame();
    return;
  }

  if (winCondition()) {
    displayWinner();
  } else {
    gameMove(row, col);
  }

  render();
}

function displayWinner() {
  resultPanel.innerHTML = `<h1>${winText} wins!</h1>`;
}

function gameMove(row, col) {
  if (
    board.isCellFree(row, col) &&
    ((isWhite && kittens.getWhiteKittensLeft() > 0) ||
      (!isWhite && kittens.getBlackKittensLeft() > 0))
  ) {
    board.set(row, col, isWhite ? "W" : "B");
    isWhite ? kittens.placeWhite() : kittens.placeBlack();
    isWhite = !isWhite;
  }
}

function winCondition() {
  if (kittens.getWhiteKittensLeft() === 0) {
    winText = "Black";
    isGameWon = true;
  } else if (kittens.getBlackKittensLeft() === 0) {
    winText = "White";
    isGameWon = true;
  }

  return isGameWon;
}

function init() {
  objects.push(board);
  objects.push(kittens);
  canvas.addEventListener("click", gameLoop);
}

function newGame() {
  reset();
  render();
}

function reset() {
  board.clearBoard();
  kittens.restoreKittens();
  resultPanel.innerHTML = "";
  isGameWon = false;
  isWhite = true;
}

function render() {
  clearCanvas();
  objects.forEach((o) => o.render(ctx));
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

init();
newGame();
