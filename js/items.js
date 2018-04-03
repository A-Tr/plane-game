function Item(game) {
  this.y = 0;
  
  this.width = 40;
  this.height = 40;
  this.vy = 4;
  this.game = game;
  
  this.x = this.width + Math.floor(Math.random() * 400 - this.width);
}

Item.prototype.draw = function () {
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

Item.prototype.move = function () {
  this.y += this.vy;
}