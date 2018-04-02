function Game(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.gameOn = false;
  this.framesCounter = 0;
  this.enemies = [];
  this.enemiesGenerated = 0;
}

Game.prototype.start = function() {
  this.reset();
  this.interval = setInterval(
    function() {
      this.clear();
      this.generateEnemy();
      this.checkEnemyDamage();
      this.move();
      this.draw();
      this.framesCounter += 1;
      if (this.framesCounter >= 10000) {
        this.framesCounter = 0;
      }
    }.bind(this),
    1000 / 60
  );
  this.gameOn = true;
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.enemies.forEach(function(e) {
    e.draw()
  });
  this.player.draw();
};

Game.prototype.reset = function() {
  this.gameOn = false;
  var that = this;
  clearInterval(this.interval)
  this.clear()
  this.background = new Background(this);
  this.player = new Player(this);
  this.enemies = [];
  this.framesCounter = 0;
};

Game.prototype.move = function() {
  this.background.move();
  this.enemies.forEach(function(e) {
    e.move();
  });
  this.player.move();
  this.player.projectiles.forEach(function(p) {
    p.move();
  });
};

Game.prototype.generateEnemy = function() {
  if (this.framesCounter % 100 == 0 && this.enemiesGenerated <= 2) {
    this.enemies.push(new Enemy(this, 1));
    this.enemiesGenerated++;
  } else if (this.framesCounter % 100 == 0 && this.enemiesGenerated > 2 && this.enemiesGenerated <= 5) {
    this.enemies.push(new Enemy(this, 2));
    this.enemiesGenerated++;
  } else if (this.framesCounter % 100 == 0 && this.enemiesGenerated > 5 && this.enemiesGenerated <= 8) {
    this.enemies.push(new Enemy(this, 3));
    this.enemiesGenerated++;
  } else if (this.framesCounter % 100 == 0 && this.enemiesGenerated > 8 && this.enemiesGenerated <= 11 ){
    this.enemies.push(new Enemy (this, 4))
    this.enemiesGenerated++;
  } else if (this.framesCounter % 100 == 0 && this.enemiesGenerated == 12) {
    this.enemies.push(new Enemy(this, 5));
    this.enemiesGenerated++;
  } else if (this.enemiesGenerated == 12) {
    return;
  }
};


//Comprobar colisiones
Game.prototype.checkEnemyDamage = function() {
  var that = this;
  this.player.projectiles.forEach(function(p) {
    that.enemies.forEach(function(e) {
      if (
        p.x < e.x + e.width &&
        p.x + p.width > e.x &&
        p.y < e.y + e.height &&
        p.y + p.height > e.y
      ) {
        e.health -= p.damage
        var indexE = that.enemies.indexOf(e);
        var indexP = that.player.projectiles.indexOf(p);
        if (indexE > -1) {
          that.player.projectiles.splice(indexP, 1)
          if(e.health <= 0){
            that.enemies.splice(indexE, 1)
          }
        }
      }
    });
  });
};
