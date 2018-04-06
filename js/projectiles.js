function Projectile(game, type, whoShoots, x, y, vx, vy, damage, imgSrc, width, height) {
  if (width != undefined) {
    this.width = width;
  } else {
    this.width = 14;
  }

  if (height != undefined) {
    this.height = height;
  } else {
    this.height = 28;
  }

  this.game = game;
  this.type = type;
  this.img = new Image();
  this.img.src = imgSrc;
  this.damage = 1;

  
  this.vx = vx;
  this.vy = vy;
  this.damage = damage;

  this.x = x;
  this.y = y;

  if (type === "special") {
    this.width = 122;
    this.height = 241;
    this.vy = -8
    this.damage = 2;
  }}


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
}
