//Construir el jugador
function Player(game) {
  this.game = game;
  
  this.vx = 1;
  this.ax = 5;
  
  this.moveLeft = false;
  this.moveRight = false;
  
  this.width = 76;
  this.height = 100;
  
  this.x = 160;
  this.y = this.game.canvas.height - 120;
  
  this.health = 5;
  this.projectiles = [];
  this.specialCount = 3;
  this.playerLevel = 1;
  this.isDamaged = false;

  this.shootSound = new Audio("sounds/shoot.ogg");
  this.specialShootSound = new Audio("sounds/special_shoot.ogg");

  this.img = new Image();
  this.img.src = "images/planes/plane_level1.png";

  this.imagesArray = [
    "images/planes/plane_damaged.png",
    "images/planes/plane_level1.png",
    "images/planes/plane_level2.png",
    "images/planes/plane_level3.png"
  ];

  this.setListeners();
}

// Dibujar el jugador
Player.prototype.draw = function(level) {
  this.img.src = this.imagesArray[level];
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

// Controles
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
      this.shootSpecial();
    }
  }.bind(this);
};

// Movimiento
Player.prototype.move = function() {
  if (this.moveLeft == true && this.x > 0) {
    this.x -= this.vx * this.ax;
  } else if (
    this.moveRight == true &&
    this.x + this.width <= this.game.canvas.width
  ) {
    this.x += this.vx * this.ax;
  } else if (this.moveLeft == false) {
    this.x = this.x;
    this.vx = 1;
  } else if (this.moveRight == false) {
    this.x = this.x;
    this.vx = 1;
  }
};

// Disparo
Player.prototype.shoot = function() {
  this.shootSound.play();
  if (this.playerLevel == 1) {
    this.shootLevelOne()    
  } else if (this.playerLevel == 2) {
    this.shootLevelTwo()    
  } else if (this.playerLevel >= 3) { 
    this.shootLevelThree()
};}

Player.prototype.shootSpecial = function() {
  if (this.specialCount > 0) {
    this.projectiles.push(
      new Projectile(
        this.game,
        "special",
        "player",
        this.x,
        this.y - this.height,
        0,
        -8,
        2,
        "images/missile.png"
      )
    );
    this.specialShootSound.play();
    this.specialCount--;
  }
};

Player.prototype.shootLevelOne = function () {
  this.projectiles.push(
    new Projectile(
      this.game,
      "normal",
      "player",
      this.x + 14,
      this.y,
      -0.5,
      -10,
      0.75,
      "images/missile.png"
    )
   )
 
  this.projectiles.push(
    new Projectile(
      this.game,
      "normal",
      "player",
      this.x + this.width - 28,
      this.y,
      +0.5,
      -10,
      0.75,
      "images/missile.png"
    )
  );
}

Player.prototype.shootLevelTwo = function () {
  this.shootLevelOne();
  this.projectiles.push(
    new Projectile(
      this.game,
      "normal",
      "player",
      this.x + this.width / 2 - 10,
      this.y,
      0,
      -10,
      1,
      "images/missile.png",
      20,
      40
    )
  );
}

Player.prototype.shootLevelThree = function () {
  this.shootLevelTwo();
  this.projectiles.push(
    new Projectile(
      this.game,
      "normal",
      "player",
      this.x,
      this.y,
      -1,
      -10,
      0.25,
      "images/missile.png",
      8,
      16
    )
  );
  this.projectiles.push(
    new Projectile(
      this.game,
      "normal",
      "player",
      this.x + this.width - 8,
      this.y,
      1,
      -10,
      0.25,
      "images/missile.png",
      8,
      16
    )
  );
}