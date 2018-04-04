function Projectile(game, bulletType, whoShoots, x, y) {
  this.width = 12;
  this.height = 24;
  this.game = game;

  this.img = new Image();
  this.damage = 1;

  this.bulletType = bulletType;

  if (whoShoots === "player") {
    this.img.src = "images/missile.png";

    this.x = this.game.player.x + this.game.player.width / 2;
    this.y = this.game.player.y - this.height;

    if (this.bulletType == 2) {
      this.x -= 15;
      this.damage = 0.75;
    } else if (this.bulletType == 3) {
      this.x += 15;
      this.damage = 0.75;
    }
    this.vy = -10;

  } else if (whoShoots === "enemy") {
    this.img.src = "images/enemy_missile.png";

    this.x = x;

    if (this.bulletType == 2) {
      this.x -= 40;
    } else if (this.bulletType == 3) {
      this.x += 40;
    }

    this.y = y;

    this.vy = 5;
  }
}

Projectile.prototype.draw = function() {
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
};

Projectile.prototype.move = function() {
  this.y += this.vy;
};
