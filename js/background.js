function Background(game) {
  this.x = 0;
  this.y = 0;
  this.game = game;

  this.dy = 10;

  this.img = new Image();
  this.img.src = "images/bg.jpg";
}

Background.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.game.canvas.width,
    this.game.canvas.height
  );
  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y - this.game.canvas.height,
    this.game.canvas.width,
    this.game.canvas.height
  );
};

Background.prototype.move = function() {
  if (this.game.enemiesGenerated > 12 && this.game.enemiesGenerated <= 25){
    this.y += this.dy * 1.33;
  } else  if (this.game.enemiesGenerated > 26 && this.game.enemiesGenerated <= 40){
    this.y += this.dy * 1.66;
  } else if (this.game.enemiesGenerated > 40) {
    this.y += this.dy * 2;
  } else {
    this.y += this.dy
  }

  if (this.y >= this.game.canvas.height) this.y = 0;
};
