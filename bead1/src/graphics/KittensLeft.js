import Renderable from "../interface/Renderable.js";

class KittensLeft extends Renderable {
  constructor(whiteKittens, blackKittens, isWhite) {
    super();
    this.whiteKittens = whiteKittens;
    this.blackKittens = blackKittens;
    this.isWhite = isWhite;
  }

  render(ctx) {
    this.drawWhiteKittens(ctx);
    this.drawBlackKittens(ctx);
    this.drawCurrentPlayerIndicator(ctx);
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

  drawCurrentPlayerIndicator(ctx) {
    const img = new Image();
    img.src = this.isWhite
      ? "../resources/white_kitten.jpg"
      : "../resources/black_kitten.jpg";
    img.onload = () => {
      ctx.drawImage(
        img,
        ctx.canvas.width / 2 - 20,
        (ctx.canvas.height - 60) + 20,
        40,
        40
      );
    };
  }
}

export default KittensLeft;
