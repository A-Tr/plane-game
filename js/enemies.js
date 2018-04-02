function Enemy(game, enemyType) {
  this.x = 0;
  this.y = 0;

  this.vy = 1;

  this.game = game;

  this.width = 60;
  this.height = 60;

  this.health = 1;

  //Tipos de enemigos
  if (enemyType === 1){
    this.vx = 5;
  }

  if (enemyType === 2) {
    this.vx = -5;
    this.x = 400 - this.width;
  }

  if (enemyType === 3) {
    this.vx = 0;
    this.vy = 1.5;
    this.x = 0;
  }

  if (enemyType === 4) {
    this.vx = 0;
    this.vy = 1.5;
    this.x = this.game.canvas.width - this.width;
  }

  this.health = 1;

}

Enemy.prototype.draw = function() {
  this.game.ctx.fillStyle = "#00FF00";
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);

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
