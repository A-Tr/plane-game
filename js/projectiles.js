function Projectile (game, playerLevel) {
  this.width = 15;
  this.height = 30;
  this.game = game;

  this.img = new Image();
  this.img.src = "images/missile.png"

  this.x =  this.game.player.x + (this.game.player.width / 2);
  this.y = this.game.player.y - this.height;

  this.vy = -10;

  this.damage = 1;

  this.playerLevel = playerLevel
}


Projectile.prototype.draw = function () {
  if (this.playerLevel == 1){
    this.game.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x - 15,
      this.y,
      this.width,
      this.height
    );
  } else if (this.playerLevel == 2) {
    this.game.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x + 15,
      this.y,
      this.width,
      this.height
    );
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
  
}

Projectile.prototype.move = function () {
  this.y += this.vy;
}