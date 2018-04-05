function Item(game, itemType) {
  this.y = 0;
  
  this.width = 40;
  this.height = 40;
  this.vy = 4;
  this.game = game;
  this.itemType = itemType
  
  this.x = this.width + Math.floor(Math.random() * 400 - this.width);
  this.img = new Image();
  this.img.src = ("images/item_1.png")

  if (this.itemType == "weapon") {
    this.img.src = ("images/item_2.png")
  } else if (this.itemType == "health") {
    this.img.src = ("images/item_3.png");
    this.vy = 7
  } else if (this.itemType == "special") {
    this.img.src = ("images/bomb.png");
    this.vy = 7
  }
}


  Item.prototype.draw = function () {
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

Item.prototype.move = function () {
  this.y += this.vy;
}