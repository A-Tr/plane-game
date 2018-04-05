function Projectile(game, bulletType, whoShoots, x, y) {
  this.width = 20;
  this.height = 40;
  this.game = game;

  this.img = new Image();
  this.damage = 1;

  this.vx = 0;
  
  this.bulletType = bulletType;
  
  if (whoShoots === "player") {
    this.img.src = "images/missile.png";
    
    this.x = this.game.player.x + this.game.player.width / 2 - this.width / 2;
    this.y = this.game.player.y - this.height;
    this.vy = -10;

    if (this.bulletType == 2) {
      this.width = this.width * 2 / 3;
      this.height = this.height * 2 / 3;
      this.x -= 15;
      this.vx = -0.5;
      this.damage = 0.75;
    } else if (this.bulletType == 3) {
      this.width = this.width * 2 / 3;
      this.height = this.height * 2 / 3;
      this.x += 15;
      this.vx += 0.5
      this.damage = 0.75;
    } else if (this.bulletType == 4) {
      this.width = this.width / 2;
      this.height = this.height / 2;
      this.vx = -1;
      this.x -= 15;
      this.damage = 0.50;
    } else if (this.bulletType == 5) {
      this.width = this.width / 2;
      this.height = this.height / 2;
      this.vx = 1;
      this.x += 15;
      this.damage = 0.50;
    } else if (this.bulletType == "special") {
      this.width = 122;
      this.height = 241;
      this.vy = -8
      this.damage = 75;
    }

  } else if (whoShoots === "enemy") {
    this.img.src = "images/enemy_missile.png";
    this.height = 50;

    this.x = x;

    if (this.bulletType == 2) {
      this.x -= 140;
    } else if (this.bulletType == 3) {
      this.x += 140;
    }

    this.y = y;

    this.vy = 8;
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
  this.x += this.vx;
};
