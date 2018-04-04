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

  this.enemyTypes = ["typeOne", "typeTwo", "typeThree", "typeFour", "typeFive", "typeSix", "typeSeven", "typeEight", "randomEnemy"]

  this.canGenerate = true;

  this.explosionSound = new Audio("sounds/explosion_one.ogg");

  // Dibujo del fondo inicial
  var grd = this.ctx.createLinearGradient(0,0,this.canvas.width,this.canvas.height);
    grd.addColorStop(0,"#660066");
    grd.addColorStop(1,"#000000");

  this.ctx.fillStyle = grd;
  this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
}

// Empezar el juego
Game.prototype.start = function() {
  this.reset();
  var that = this;
  this.interval = setInterval(
    function() {
      this.items = this.items.filter(function(i) {
        return i.y > 0;
      });
      this.clear();
      
      if (this.player.health <= 0) {
        this.gameOver()
        return;
      }

      if (this.canGenerate == true) {
        this.generateEnemy(this.framesCounter, this.enemiesGenerated);
      }
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

// Resetear juego
Game.prototype.reset = function() {
      var that = this;
      clearInterval(this.interval);
      this.clear();
      this.background = new Background(this);
      this.player = new Player(this);
      this.enemies = [];
      this.enemiesGenerated = 0;
      this.framesCounter = 0;
      this.items = [];
      this.score = 0;  
};

// GAME OVER
Game.prototype.gameOver = function() {
  this.clear();
  this.gameOn = false;  
  var grd = this.ctx.createLinearGradient(0,0,this.canvas.width,this.canvas.height);
    grd.addColorStop(0,"#660066");
    grd.addColorStop(1,"#000000");

  this.ctx.fillStyle = grd;
  this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  this.ctx.fillStyle = "#00ffff"
  this.ctx.font = "bold 42px Orbitron";
  this.ctx.fillText("YOU'RE DEAD", 30, 300);
  this.ctx.font = "bold 26px Orbitron";
  this.ctx.fillText("Please press RESTART", 30, 360);
  this.ctx.fillText("YOUR SCORE: " + this.score, 30, 420);
  clearInterval(this.interval);
};

// Limpiar pantalla
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

// Dibujar elementos
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

// Mover elementos
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

// Generar objetos
Game.prototype.generateItem = function() {
  if (this.framesCounter % 300 == 0) {
    this.items.push(new Item(this, "points"));
  } else if (this.framesCounter % 400 == 0) {
    this.items.push(new Item(this, "weapon"));
  }
};

// Generar enemigos
Game.prototype.generateEnemy = function(framesCounter, enemiesGenerated) {
  var that = this
  if (framesCounter % 100 == 0) {
    if (enemiesGenerated <= 2) {
      this.enemies.push(new Enemy(this, this.enemyTypes[0]));
    } else if (enemiesGenerated > 2 && enemiesGenerated <= 5) {
      this.enemies.push(new Enemy(this, this.enemyTypes[1]));
    } else if (enemiesGenerated > 5 && enemiesGenerated <= 8) {
      this.enemies.push(new Enemy(this, this.enemyTypes[2]));
    } else if (enemiesGenerated > 8 && enemiesGenerated <= 11) {
      this.enemies.push(new Enemy(this, this.enemyTypes[3]));
    } else if (enemiesGenerated == 12) {
      this.enemies.push(new Enemy(this, "bossOne"));
      this.canGenerate = false;
      setTimeout(function () {
        that.enemiesGenerated++;
        that.canGenerate = true}, 5000)
      return      
    } else if (enemiesGenerated > 12 && enemiesGenerated <= 15) {
      this.enemies.push(new Enemy(this, this.enemyTypes[4]));
    } else if (enemiesGenerated > 15 && enemiesGenerated <= 18) {
      this.enemies.push(new Enemy(this, this.enemyTypes[5]));
    } else if (enemiesGenerated > 18 && enemiesGenerated <= 21) {
      this.enemies.push(new Enemy(this, this.enemyTypes[6]));
    } else if (enemiesGenerated > 21 && enemiesGenerated <= 24) {
      this.enemies.push(new Enemy(this, this.enemyTypes[7]));
    } else if (enemiesGenerated == 25) {
      this.canGenerate = false;
      this.enemies.push(new Enemy(this, "bossTwo"));
      setTimeout(function () {
        that.enemiesGenerated++;
        that.canGenerate = true}, 5000)
      return     
    }
    this.enemiesGenerated++;
  } else if (framesCounter % 50 == 0 && that.enemiesGenerated >= 26) {
    this.enemies.push(new Enemy(this, this.enemyTypes[8]))
    this.enemies.push(new Enemy(this, this.enemyTypes[8]))
  } else {return}
};

//Disparo enemigo
Game.prototype.enemyShoot = function() {
  if (this.framesCounter % 100 == 0) {
    this.enemies.forEach(function(e) {
      e.shoot();
    });
  }

  //Comprobar daño enemigo
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

  // Comprobar daño al jugador
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
            //that.gameOver();
          }
        }
      });
    }.bind(this));
  };

  // Comprobar si se ha cogido objeto
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
          if (i.itemType == "weapon" && that.player.playerLevel < 3) {
            that.player.playerLevel++;
          }
        }
      }
    });
  };
};
