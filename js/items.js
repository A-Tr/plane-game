function Item(game) {
  this.x = Math.floor(Math.random() * 400);
  this.y = 0;

  this.width = 40;
  this.height = 40;
  this.vy = 8;
  this.game = game;
}

Item.prototype.draw = function () {
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

Item.prototype.move = function () {
  this.y += this.vy;
}