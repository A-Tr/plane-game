function EnemyProjectile (game, x, y) {
  this.width = 15;
  this.height = 30;
  this.game = game;

  this.img = new Image();
  this.img.src = "images/enemy_missile.png"

  this.x = x;
  this.y = y;

  this.vy = 10;

  this.damage = 1;
}

EnemyProjectile.prototype.draw = function () {
  this.game.ctx.drawImage(
    this.img,
    0,
    0,
    this.img.width,
    this.img.height,
    this.x,
    this.y,
    this.width,
    this.height
  );
}

EnemyProjectile.prototype.move = function () {
  this.y += this.vy;
}