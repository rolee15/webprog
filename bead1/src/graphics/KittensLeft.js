import Renderable from "../interface/Renderable.js";

class KittensLeft extends Renderable {
  constructor(whiteKittens, blackKittens) {
    super();
    this.whiteKittens = whiteKittens;
    this.blackKittens = blackKittens;
  }

  render(ctx) {
    this.drawWhiteKittens(ctx);
    this.drawBlackKittens(ctx);
  }

  drawBlackKittens(ctx) {
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

  drawWhiteKittens(ctx) {
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
  }
}

export default KittensLeft;
