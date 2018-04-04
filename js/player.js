function Player(game) {
  this.x = 160;
  this.y = 620;
  this.game = game;
  
  this.vx = 1;
  this.ax = 5;

  this.moveLeft = false;
  this.moveRight = false;

  this.width = 80;
  this.height = 100;

  this.health = 5;
  this.projectiles = [];
  this.item = []
  this.playerLevel = 1;

  this.shootSound = new Audio("sounds/shoot.ogg")

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
    } 
    else if (e.keyCode === 32) {
      this.shoot();
    }
  }.bind(this);
};

Player.prototype.move = function() {
  if (this.moveLeft == true && this.x > 0) {
    this.x -= this.vx * this.ax;
  } else if (this.moveRight == true && (this.x + this.width) <= this.game.canvas.width) {
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
  if (this.playerLevel == 1) {
    this.projectiles.push(new Projectile(this.game, 1, "player"));
  } else if (this.playerLevel == 2) {
    this.projectiles.push(new Projectile(this.game, 2, "player"));
    this.projectiles.push(new Projectile(this.game, 3, "player"));
  } else if (this.playerLevel >= 3) {
    this.projectiles.push(new Projectile(this.game, 1, "player"));
    this.projectiles.push(new Projectile(this.game, 2, "player"));
    this.projectiles.push(new Projectile(this.game, 3, "player"));
  }
  this.shootSound.play();
};
