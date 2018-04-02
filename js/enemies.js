function Enemy(game) {
  this.x = 0;
  this.y = 0;

  this.game = game;

  this.vx = 2;
  this.vy = 1;

  this.width = 60;
  this.height = 60;

  this.health = 1;
}

/* if (this.game.enemiesGenerated < 3) {
  Enemy.prototype.draw = Enemy.prototype.drawLeft
} else if (game.enemiesGenerated > 3) {
  Enemy.prototype.draw = Enemy.prototype.drawRight
} */

Enemy.prototype.draw = function() {
  this.game.ctx.fillStyle = "#00FF00";
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Enemy.prototype.drawLeft = function() {
  this.game.ctx.fillStyle = "#00FF00";
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Enemy.prototype.drawRight = function() {
  this.game.ctx.fillStyle = "#0000FF";
  this.game.ctx.fillRect(this.games.canvas.width - 1, this.y, this.width, this.height);
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


