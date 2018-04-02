function Projectile (game) {
  this.width = 5;
  this.height = 10;
  this.game = game;

  this.x =  this.game.player.x + (this.game.player.width / 2);
  this.y = this.game.player.y - this.height;

  this.vy = -10;

  this.damage = 1;
}

Projectile.prototype.draw = function () {
  this.game.ctx.fillStyle = "#FF0000";
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Projectile.prototype.move = function () {
  this.y += this.vy;
}