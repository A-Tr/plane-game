function Player(game) {
  this.x = 160;
  this.y = 620;
  this.game = game;

  this.vx = 1;
  this.ax = 3;

  this.moveLeft = false;
  this.moveRight = false;

  if (this.ax >= 12) {
    this.ax == 12;
  }

  this.width = 80;
  this.height = 100;

  this.health = 5;
  this.projectiles = [];

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

  this.projectiles = this.projectiles.filter(function(p) {
    return p.y > 0;
  });

  this.projectiles.forEach(function(p) {
    p.draw();
  });
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    if (e.keyCode == 37) {
      this.moveLeft = true;
    } else if (e.keyCode == 39) {
      this.moveRight = true;
    }
  }.bind(this);

  document.onkeyup = function(e) {
    if (e.keyCode == 37) {
      this.moveLeft = false;
    } else if (e.keyCode == 39) {
      this.moveRight = false;
    } else if (e.keyCode === 32) {
      this.shoot();
    }
  }.bind(this);
};

Player.prototype.move = function() {
  if (this.moveLeft == true && this.x > 0) {
    this.x -= this.vx * this.ax;
  } else if (this.moveRight == true && (this.x + this.width) <= 400) {
    console.log(this.game.width)
    this.x += this.vx * this.ax;
  } else if (this.moveLeft == false) {
    this.x = this.x;
    this.vx = 1;
  } else if (this.moveRight == false) {
    this.x = this.x;
    this.vx = 1;
  }
};

Player.prototype.shoot = function() {
  this.projectiles.push(new Projectile(this.game));
  console.log(this.projectiles);
};
