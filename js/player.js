function Player(game) {
  this.x = 160;
  this.y = 620;
  this.game = game;

  this.vx = 5;
  this.ax = 5;

  if (this.ax >= 15) {
    this.ax == 15
  }

  this.width = 80;
  this.height = 100;

  this.health = 5;

  this.img = new Image();
  this.img.src = "images/plane.png";
  this.setListeners();
}

Player.prototype.draw = function() {
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

Player.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    if (e.keyCode == 37 && this.x > 0) {
      this.x -= this.vx * this.ax;
    } else if (
      e.keyCode === 39 &&
      this.x + this.width < this.game.canvas.width
    ) {
      this.x += this.vx * this.ax;
    }
  }.bind(this);
};

Player.prototype.shoot = function () {
  
}
