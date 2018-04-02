function Enemy(game) {
  this.x = 0;
  this.y = 0;

  this.game = game;

  this.vx = 5;
  this.vy = 1;

  this.width = 60;
  this.height = 60;

  this.health = 1;
}

Enemy.prototype.draw = function() {
  this.game.ctx.fillStyle = "#00FF00";
  var that = this;
  if (that.game.enemiesGenerated < 5) {
    that.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  } else if (that.game.enemiesGenerated > 5) {
    that.game.ctx.fillRect(
      that.game.canvas.width - this.width,
      this.y,
      this.width,
      this.height
    );
  }
};

Enemy.prototype.move = function() {
  if (this.x + this.width > 400) {
    this.x = this.game.canvas.width - 1 - this.width;
    this.vx = this.vx * -1;
  } else if (this.x < 0) {
    this.x = 1;
    this.vx = this.vx * -1;
  } else if (this.y >= 500) {
    this.vy = 0;
  } else {
    this.x += this.vx;
    this.y += this.vy;
  }
};
