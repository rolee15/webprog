import Renderable from "./Renderable.js";

class KittensLeft extends Renderable {
  constructor(maxKittens) {
    super();
    this.kittenLives = maxKittens;
    this.whiteKittens = maxKittens;
    this.blackKittens = maxKittens;
  }

  render(ctx) {
    // Draw white kittens left
    for (let i = 0; i < this.whiteKittens; i++) {
      ctx.beginPath();
      ctx.arc(40 + i * 15, ctx.canvas.height - 20, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      ctx.stroke();
      ctx.closePath();
    }

    // Draw white black left
    for (let i = 0; i < this.blackKittens; i++) {
      ctx.beginPath();
      ctx.arc(
        ctx.canvas.width - 40 - i * 15,
        ctx.canvas.height - 20,
        5,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.closePath();
    }
  }

  placeWhite() {
    if (this.whiteKittens > 0) this.whiteKittens--;
  }

  placeBlack() {
    if (this.blackKittens > 0) this.blackKittens--;
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

export default KittensLeft;
