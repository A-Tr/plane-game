function Enemy(game, enemyType) {
  this.x = 0;
  this.y = 0;

  this.vy = 1;

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
  if (enemyType === 1 && !this.isDestroyed) {
    this.vx = 3;
  }

  if (enemyType === 2 && !this.isDestroyed) {
    this.vx = -3;
    this.x = 400 - this.width;
  }

  if (enemyType === 3 && !this.isDestroyed) {
    this.vx = 0;
    this.vy = 1.5;
    this.x = 0;
  }

  if (enemyType === 4 && !this.isDestroyed) {
    this.vx = 0;
    this.vy = 1.5;
    this.x = this.game.canvas.width - this.width;
  }

  if (enemyType === 5 && !this.isDestroyed) {
    this.vx = 2;
    this.vy = 0;
    this.x = 50;
    this.width = 300;
    this.height = 200;
    this.health = 30;
    this.img.src = "images/boss.png";
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
  if (this.enemyType <= 4)
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width / 2, this.y)
    );
  else if (this.enemyType == 5) {
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width / 2, this.y)
    );
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width / 4, this.y)
    );
    this.enemyProjectiles.push(
      new Projectile(this.game, 1, "enemy", this.x + this.width * 3 / 4, this.y)
    );
  }
};

Enemy.prototype.destroyed = function () {
  this.isDestroyed = true;
  this.vx = 0;
  this.vy = 0;
}
