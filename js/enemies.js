function Enemy(game, enemyType) {
  this.x = 0;
  this.y = 0;

  this.vy = 1;
  
  this.game = game;
  
  this.maxX = this.game.canvas.width;
  this.maxY = this.game.canvas.height - 200;
  this.enemyType = enemyType;

  this.width = 98;
  this.height = 50;

  this.health = 10;

  this.isDestroyed = false;

  this.img = new Image();
  this.img.src = "images/enemy_one_sprite.png";

  this.imgDestroyed = new Image();
  this.imgDestroyed.src = "images/explosion.png";


  //Tipos de enemigos
  if (enemyType === "typeOne" && !this.isDestroyed) {
    this.vx = 5;
  }

  if (enemyType === "typeTwo" && !this.isDestroyed) {
    this.vx = -5;
    this.x = 400 - this.width;
  }

  if (enemyType === "typeThree" && !this.isDestroyed) {
    this.vx = 0;
    this.vy = 2;
    this.x = 0;
  }

  if (enemyType === "typeFour" && !this.isDestroyed) {
    this.vx = 0;
    this.vy = 2;
    this.x = this.game.canvas.width - this.width;
  }

  
  if (enemyType === "typeFive" && !this.isDestroyed) {
    this.vx = 8;
    this.y = 200;
    this.img.src = "images/enemy_two_sprite.png";
    this.health = 15;
  }
  
  if (enemyType === "typeSix" && !this.isDestroyed) {
    this.vx = -8;
    this.x = 400 - this.width;
    this.y = 200;
    this.img.src = "images/enemy_two_sprite.png";
    this.health = 15;
  }
  
  if (enemyType === "typeSeven" && !this.isDestroyed) {
    this.vx = 0;
    this.vy = 4;
    this.x = 0;
    this.y = 200;
    this.img.src = "images/enemy_two_sprite.png";
    this.health = 15;
  }
  
  if (enemyType === "typeEight" && !this.isDestroyed) {
    this.vx = 0;
    this.vy = 4;
    this.y = 200;
    this.x = this.game.canvas.width - this.width;
    this.img.src = "images/enemy_two_sprite.png";
    this.health = 15;
  }
  
  if (enemyType === "randomEnemy" && !this.isDestroyed) {
    this.vx = Math.floor(Math.random() * 12) - 6;
    this.vy = Math.floor(Math.random() * 5);
    this.x = Math.floor(Math.random() * 400);
    this.y = Math.floor(Math.random() * 200);
    this.health = 15;
    this.img.src = "images/enemy_two_sprite.png";
  } 

  // Jefes
  if (enemyType === "bossOne" && !this.isDestroyed) {
    this.vx = 2;
    this.vy = 0;
    this.x = 50;
    this.width = 300;
    this.height = 200;
    this.health = 200;
    this.img.src = "images/boss.png";
  }


  if (enemyType === "bossTwo"  && !this.isDestroyed) {
    this.vx = 10;
    this.vy = 0.5;
    this.x = 140;
    this.width = 120;
    this.height = 150;
    this.health = 200;
    this.img.src = "images/boss_two.png";
  } 
  if (enemyType === "bossTwoA" && !this.isDestroyed) {
    this.vx = -1;
    this.vy = 0.5;
    this.x = 280;
    this.width = 120;
    this.height = 150;
    this.health = 200;
    this.img.src = "images/boss_two.png";
  } 
  
}

Enemy.prototype.draw = function() {
  if (this.isDestroyed == false) {
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
  } else {
    this.game.ctx.drawImage(
      this.imgDestroyed,
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
};

Enemy.prototype.move = function() {
  if (this.x + this.width > this.maxX) {
    this.x = this.maxX - this.width - 1;
    this.vx = this.vx * -1;
  } else if (this.x < 0) {
    this.x = 1;
    this.vx = this.vx * -1;
  } else if (this.y >= this.maxY) {
    this.y = this.maxY - 1;
    this.vx = 3;
    this.x += this.vx;
    this.vy = 0;
  } else {
    this.x += this.vx;
    this.y += this.vy;
  }
};

Enemy.prototype.shoot = function() {
  if (this.enemyType == "bossOne") {
    this.game.activeProjectiles.push(
      new Projectile(this.game, "normal", "enemy", this.x, this.y, 0, 8, 1, "images/enemy_missile.png", 20, 40)
    );
    this.game.activeProjectiles.push(
      new Projectile(this.game, "normal", "enemy", this.x + this.width / 2, this.y, 0, 8, 1, "images/enemy_missile.png", 20, 40)
    );
    this.game.activeProjectiles.push(
      new Projectile(this.game, "normal", "enemy", this.x + this.width, this.y, 0, 8, 1, "images/enemy_missile.png", 20, 40)
    );
  } else if (this.enemyType == "bossTwo" || this.enemyType == "bossTwoA") {
    this.game.activeProjectiles.push(
      new Projectile(this.game, "normal", "enemy", this.x + this.width / 3, this.y, 0, 8, 1, "images/enemy_missile.png", 20, 40)
    );
    this.game.activeProjectiles.push(
      new Projectile(this.game, "normal", "enemy", this.x + this.width * 2 / 3, this.y, 0, 8, 1, "images/enemy_missile.png", 20, 40)
    );
    } else {
    this.game.activeProjectiles.push(
      new Projectile(this.game, "normal", "enemy", this.x + this.width / 2, this.y, 0, 8, 1, "images/enemy_missile.png", 20, 40)
    );
  }
};

Enemy.prototype.destroyed = function() {
  this.isDestroyed = true;
  this.vx = 0;
  this.vy = 0;
};
