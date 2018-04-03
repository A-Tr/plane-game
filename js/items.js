function Item(game, itemType) {
  this.y = 0;
  
  this.width = 40;
  this.height = 40;
  this.vy = 4;
  this.game = game;
  this.itemType = itemType
  
  this.x = this.width + Math.floor(Math.random() * 400 - this.width);
}


  Item.prototype.draw = function () {
    if (this.itemType == 1) {
      this.game.ctx.fillStyle = "red";
    } else if (this.itemType == 2) {
      this.game.ctx.fillStyle = "blue";
    }
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

Item.prototype.move = function () {
  this.y += this.vy;
}