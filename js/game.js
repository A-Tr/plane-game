function Game(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.gameOn = false;
  this.framesCounter = 0;
  this.enemies = [];
  this.enemiesGenerated = 0;
  this.items = [];
  this.score = 0;
  this.playerHealth = document.getElementById("player-health");

  this.explosionSound = new Audio("sounds/explosion_one.ogg");
}

Game.prototype.start = function() {
  this.reset();
  var that = this;
  this.interval = setInterval(
    function() {
      this.items = this.items.filter(function(i) {
        return i.y > 0;
      });
      this.clear();

      this.generateEnemy();
      this.generateItem();

      this.enemyShoot();

      this.checkEnemyDamage();
      this.checkItem();
      this.checkPlayerDamage();

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

Game.prototype.reset = function() {
  this.gameOn = false;
  var that = this;
  clearInterval(this.interval);
  this.clear();
  this.background = new Background(this);
  this.player = new Player(this);
  this.enemies = [];
  this.framesCounter = 0;
  this.enemiesGenerated = 0;
};

Game.prototype.gameOver = function() {
  clearInterval(this.interval);
  alert("game over");
};

// Dibujar objetos
Game.prototype.draw = function() {
  this.background.draw();
  this.scoreDraw();
  this.healthDraw();
  this.enemies.forEach(function(e) {
    e.draw();
    e.enemyProjectiles.forEach(function(ep) {
      ep.draw();
    });
  });
  this.items.forEach(function(i) {
    i.draw();
  });
  this.player.draw();
};

// Dibujar puntuacion
Game.prototype.scoreDraw = function() {
  (this.ctx.font = "bold 24px Orbitron"), (this.ctx.fillStyle = "#596cea");
  this.ctx.fillText("Score: " + this.score, 30, 750);
};

// Dibujar vidas
Game.prototype.healthDraw = function() {
  this.ctx.fillStyle = "#dc1054";
  this.ctx.fillText("Lives: " + this.player.health, 250, 750);
};

//Mover objetos
Game.prototype.move = function() {
  this.background.move();
  this.enemies.forEach(function(e) {
    e.move();
    e.enemyProjectiles.forEach(function(ep) {
      ep.move();
    });
  });
  this.items.forEach(function(i) {
    i.move();
  });
  this.player.move();
  this.player.projectiles.forEach(function(p) {
    p.move();
  });
};

//Generar objetos
Game.prototype.generateItem = function() {
  if (this.framesCounter % 300 == 0) {
    this.items.push(new Item(this, 1));
  } else if (this.framesCounter % 1000 == 0) {
    this.items.push(new Item(this, 2));
  }
};

//Generar enemigos

Game.prototype.generateEnemy = function() {
  if (this.framesCounter % 100 == 0 && this.enemiesGenerated <= 2) {
    this.enemies.push(new Enemy(this, 1));
    this.enemiesGenerated++;
  } else if (
    this.framesCounter % 100 == 0 &&
    this.enemiesGenerated > 2 &&
    this.enemiesGenerated <= 5
  ) {
    this.enemies.push(new Enemy(this, 2));
    this.enemiesGenerated++;
  } else if (
    this.framesCounter % 100 == 0 &&
    this.enemiesGenerated > 5 &&
    this.enemiesGenerated <= 8
  ) {
    this.enemies.push(new Enemy(this, 3));
    this.enemiesGenerated++;
  } else if (
    this.framesCounter % 100 == 0 &&
    this.enemiesGenerated > 8 &&
    this.enemiesGenerated <= 11
  ) {
    this.enemies.push(new Enemy(this, 4));
    this.enemiesGenerated++;
  } else if (this.framesCounter % 100 == 0 && this.enemiesGenerated == 12) {
    this.enemies.push(new Enemy(this, 5));
    setTimeout(this.enemiesGenerated++, 5);
    console.log(this.enemiesGenerated);
  } else if (this.framesCounter % 100 == 0 && this.enemiesGenerated > 12) {
    var randomizer = Math.floor(Math.random() * 5);
    this.enemies.push(new Enemy(this, Math.floor(Math.random() * 5)));
    this.enemiesGenerated++;
  }
};

//Disparo enemigo
Game.prototype.enemyShoot = function() {
  if (this.framesCounter % 100 == 0) {
    this.enemies.forEach(function(e) {
      e.shoot();
    });
  }

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
          e.health -= p.damage;
          var indexE = that.enemies.indexOf(e);
          var indexP = that.player.projectiles.indexOf(p);
          if (indexE > -1) {
            that.player.projectiles.splice(indexP, 1);
            if (e.health <= 0) {
              e.destroyed();
              that.explosionSound.play();
              that.score += 5;
              setTimeout(function() {
                that.enemies.splice(indexE, 1);
              }, 100);
            }
          }
        }
      });
    });
  };

  Game.prototype.checkPlayerDamage = function() {
    var that = this;
    this.enemies.forEach(function(e) {
      e.enemyProjectiles.forEach(function(ep) {
        if (
          ep.x < that.player.x + that.player.width &&
          ep.x + ep.width > that.player.x &&
          ep.y < that.player.y + that.player.height &&
          ep.y + ep.height > that.player.y
        ) {
          var indexEp = e.enemyProjectiles.indexOf(ep);
          if (indexEp > -1) {
            that.player.health -= 1;
            if (that.player.playerLevel > 1) {
              that.player.playerLevel -= 1;
            }
            e.enemyProjectiles.splice(indexEp, 1);
          }
          if (that.player.health <= 0) {
            that.gameOver();
          }
        }
      });
    });
  };

  Game.prototype.checkItem = function() {
    var that = this;
    this.items.forEach(function(i) {
      if (
        i.x < that.player.x + that.player.width &&
        i.x + i.width > that.player.x &&
        i.y < that.player.y + that.player.height &&
        i.y + i.height > that.player.y
      ) {
        var indexI = that.items.indexOf(i);
        if (indexI > -1) {
          that.items.splice(indexI, 1);
          that.score += 100;
          if (i.itemType == 2) {
            that.player.playerLevel++;
          }
        }
      }
    });
  };
};
