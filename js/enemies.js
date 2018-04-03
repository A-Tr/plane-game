function Enemy(game, enemyType, enemyNumber) {
  this.x = 0;
  this.y = 0;
  
  this.vy = 1;
  
  this.game = game;
  
  this.enemyNumber = enemyNumber;
  this.width = 98;
  this.height = 50;

  this.health = 3;
  this.enemyProjectiles = [];

  this.img = new Image();
  this.img.src = "images/enemy_one_sprite.png";

  this.enemyProjectiles = this.enemyProjectiles.filter(function(p) {
    return p.y < 800;
  });

  //Tipos de enemigos
  if (enemyType === 1){
    this.vx = 5;
  }

  if (enemyType === 2) {
    this.vx = -5;
    this.x = 400 - this.width;
  }

  if (enemyType === 3) {
    this.vx = 0;
    this.vy = 1.5;
    this.x = 0;
  }

  if (enemyType === 4) {
    this.vx = 0;
    this.vy = 1.5;
    this.x = this.game.canvas.width - this.width;
  }

  if (enemyType === 5) {
    this.vx = 2;
    this.vy = 0;
    this.x = 50;
    this.width = 300;
    this.height = 200;
    this.health = 30;
    this.img.src = "images/boss.png"
  }


}

Enemy.prototype.draw = function() {
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

Enemy.prototype.move = function() {
    if (this.x + this.width > 400) {
      this.x = this.game.canvas.width - 1 - this.width;
      this.vx = this.vx * -1;
    } else if (this.x < 0) {
      this.x = 1;
      this.vx = this.vx * -1;
    } else if (this.y >= 500) {
      this.vy = 0;
    } else {
      this.x += this.vx;
      this.y += this.vy;
    }
};

Enemy.prototype.shoot = function() {
  this.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y));
};