function Enemy(game, enemyType) {
  this.x = 0;
  this.y = 0;

  this.vy = 0.5;

  this.game = game;

  this.enemyType = enemyType;

  this.width = 98;
  this.height = 50;

  this.health = 2;
  this.enemyProjectiles = [];

  this.isDestroyed = false;

  this.img = new Image();
  this.img.src = "images/enemy_one_sprite.png";

  this.imgDestroyed = new Image();
  this.imgDestroyed.src = "images/explosion.png";

  this.enemyProjectiles = this.enemyProjectiles.filter(function(p) {
    return p.y < 800;
  });

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

  if (enemyType === "bossOne" && !this.isDestroyed) {
    this.vx = 2;
    this.vy = 0;
    this.x = 50;
    this.width = 300;
    this.height = 200;
    this.health = 40;
    this.img.src = "images/boss.png";
  }

  if (enemyType === "typeFive" && !this.isDestroyed) {
    this.vx = 8;
    this.y = 200;
    this.img.src = "images/enemy_two_sprite.png";
    this.health = 3;
  }

  if (enemyType === "typeSix" && !this.isDestroyed) {
    this.vx = -8;
    this.x = 400 - this.width;
    this.y = 200;
    this.img.src = "images/enemy_two_sprite.png";
    this.health = 3;
  }

  if (enemyType === "typeSeven" && !this.isDestroyed) {
    this.vx = 0;
    this.vy = 4;
    this.x = 0;
    this.y = 200;
    this.img.src = "images/enemy_two_sprite.png";
    this.health = 3;
  }

  if (enemyType === "typeEight" && !this.isDestroyed) {
    this.vx = 0;
    this.vy = 4;
    this.y = 200;
    this.x = this.game.canvas.width - this.width;
    this.img.src = "images/enemy_two_sprite.png";
    this.health = 3;
  }

  if (enemyType === "bossTwo" && !this.isDestroyed) {
    this.vx = 12;
    this.vy = 0.5;
    this.x = 140;
    this.width = 120;
    this.height = 150;
    this.health = 30;
    this.img.src = "images/boss_two.png";
  } 
  
  if (enemyType === "randomEnemy" && !this.isDestroyed) {
    this.vx = Math.floor(Math.random() * 12) - 6;
    this.vy = Math.floor(Math.random() * 5);
    this.x = Math.floor(Math.random() * 400);
    this.y = Math.floor(Math.random() * 200);
    this.health = 5;
    this.img.src = "images/enemy_two_sprite.png";
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
  if (this.x + this.width > 400) {
    this.x = this.game.canvas.width - 1 - this.width;
    this.vx = this.vx * -1;
  } else if (this.x < 0) {
    this.x = 1;
    this.vx = this.vx * -1;
  } else if (this.y >= 500) {
    this.y = 499;
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
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width / 2, this.y)
    );
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width / 4, this.y)
    );
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width * 3 / 4, this.y)
    );
  } else if (this.enemyType == "bossTwo") {
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width / 2, this.y)
    );
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width / 4, this.y)
    );
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width * 3 / 4, this.y)
    );
    } else {
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width / 2, this.y)
    );
  }
};

Enemy.prototype.destroyed = function() {
  this.isDestroyed = true;
  this.vx = 0;
  this.vy = 0;
};
