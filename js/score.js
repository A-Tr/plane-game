function Score (game){
  this.game = game;
  this.points = 0;
}


Score.prototype.draw = function () {
  this.game.ctx.font = "30px sans-serif",
  this.game.ctx.fillText("Score: " + this.points, 300, 600);
}

