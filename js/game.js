function Game(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.gameOn = false;

  if (window.innerWidth > 500) {
    this.canvas.width = 400;
    this.canvas.height = 800;
  } else {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  this.framesCounter = 0;
  this.enemies = [];
  this.enemiesGenerated = 0;
  this.activeProjectiles = [];
  this.score = 0;
  this.highScore = 0;
  this.loop = 0;

  this.gameOverSentences = [
    "ONE MORE TIME",
    "AGAIN",
    "KEEP TRYING",
    "ANOTHER ONE?"
  ];

  this.itemTypes = ["health", "special", "weapon"];

  this.enemyTypes = [
    "typeOne",
    "typeTwo",
    "typeThree",
    "typeFour",
    "typeFive",
    "typeSix",
    "typeSeven",
    "typeEight",
    "randomEnemy"
  ];

  this.canGenerate = true;

  // Sonidos del juego
  this.explosionSound = new Audio("sounds/explosion_one.ogg");
  this.coinSound = new Audio("sounds/coin.ogg");
  this.healthSound = new Audio("sounds/oneup.ogg");
  this.levelUpSound = new Audio("sounds/level_up.ogg");
  this.specialSound = new Audio("sounds/get_spec.ogg");
  this.playerHitSound = new Audio("sounds/player_hit.ogg");
  this.gameOverSound = new Audio("sounds/game_over.ogg");

  this.sounds = [
    this.explosionSound,
    this.coinSound,
    this.healthSound,
    this.levelUpSound,
    this.specialSound,
    this.playerHitSound,
    this.gameOverSound
  ];

  // Dibujo del fondo inicial
  var grd = this.ctx.createLinearGradient(
    0,
    0,
    this.canvas.width,
    this.canvas.height
  );
  grd.addColorStop(0, "#660066");
  grd.addColorStop(1, "#000000");
  this.ctx.fillStyle = grd;
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
        this.gameOver();
        return;
      }

      if (this.canGenerate == true) {
        this.generateEnemy(this.framesCounter, this.enemiesGenerated);
      }

      if (this.framesCounter % 200) {
        this.checkEnemiesDestroyed();
      }

      this.generateItem();

      if (this.framesCounter % 5 == 0) {
        this.player.shoot();
      }

      this.enemyShoot();

      this.update();
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
  this.sounds[6].play();
  this.loop++;
  var that = this;
  if (this.score > this.highScore) {
    this.highScore = this.score;
  }
  setTimeout(function() {
    that.gameOn = false;
  }, 1000);
  document.getElementById("start-btn").style.visibility = "visible";
  var grd = this.ctx.createLinearGradient(
    0,
    0,
    this.canvas.width,
    this.canvas.height
  );
  grd.addColorStop(0, "#660066");
  grd.addColorStop(1, "#000000");

  this.ctx.fillStyle = grd;
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "#00ffff";
  var linejump = 36;
  this.ctx.font = "bold 42px Orbitron";
  this.ctx.fillText("YOU'RE DEAD", 10, 50);
  this.ctx.font = "bold 26px Orbitron";
  this.ctx.fillText("YOUR SCORE: " + this.score, 10, 50 + linejump);
  this.ctx.fillText("HIGH SCORE: " + this.highScore, 10, 50 + linejump * 2);
  this.ctx.fillText("Please press PLAY", 10, 50 + linejump * 7);
  this.ctx.font = "bold 38px Orbitron";
    this.ctx.fillText(
      this.gameOverSentences[Math.floor(Math.random() * 4)],
      10,
      220
    );
  clearInterval(this.interval);
};

// Limpiar pantalla y proyectiles sobrantes
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.activeProjectiles = this.activeProjectiles.filter(function(p) {
    return p.y < this.canvas.height;
  });
};

// Dibujar puntuación
Game.prototype.scoreDraw = function() {
  (this.ctx.font = "bold 24px Orbitron"), (this.ctx.fillStyle = "#00ffff");
  this.ctx.fillText(this.score, this.canvas.width / 2 - 24, this.canvas.height - 20);
};

// Dibujar vidas
Game.prototype.healthDraw = function() {
  var that = this;
  this.x = 0;
  this.y = this.canvas.height - 40;
  this.img = new Image();
  this.img.src = "images/item_3.png";
  for (i = 1; i <= that.player.health; i++) {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x,
      this.y,
      24,
      24
    );
    this.x += 28;
  }
};

// Dibujar munición especial
Game.prototype.specialDraw = function() {
  var that = this;
  this.x = this.canvas.width - 84;
  this.y = this.canvas.height - 40;
  this.img = new Image();
  this.img.src = "images/bomb.png";
  for (i = 1; i <= that.player.specialCount; i++) {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x,
      this.y,
      24,
      24
    );
    this.x += 28;
  }
};

// Dibujar elementos
Game.prototype.draw = function() {
  this.background.draw();
  this.scoreDraw();
  this.healthDraw();
  this.specialDraw();
  this.enemies.forEach(function(e) {
    e.draw();
  });
  this.activeProjectiles.forEach(function(e) {
    e.draw();
  });
  this.items.forEach(function(i) {
    i.draw();
  });
  if (this.player.isDamaged === true && this.framesCounter % 5 === 0) {
    this.player.draw(0);
  } else {
    this.player.draw(this.player.playerLevel);
  }
};

// Mover elementos
Game.prototype.move = function() {
  this.background.move();
  this.enemies.forEach(function(e) {
    e.move();
  });
  this.activeProjectiles.forEach(function(e) {
    e.move();
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
  var that = this;
  if (this.framesCounter % 200 == 0) {
    this.items.push(new Item(this, "points"));
  } else if (this.framesCounter % 300 == 0) {
    this.items.push(
      new Item(this, this.itemTypes[Math.floor(Math.random() * 2)])
    );
    this.items.push(new Item(this, this.itemTypes[2]));
  }
};

// Generar enemigos
Game.prototype.generateEnemy = function(framesCounter, enemiesGenerated) {
  var that = this;
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
      setTimeout(function() {
        that.enemiesGenerated++;
        that.canGenerate = true;
      }, 5000);
      return;
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
      setTimeout(function() {
        that.enemiesGenerated++;
        that.canGenerate = true;
      }, 7000);
      return;
    } else if (enemiesGenerated >= 26 && enemiesGenerated < 40) {
      this.enemies.push(new Enemy(this, this.enemyTypes[8]));
      this.enemies.push(new Enemy(this, this.enemyTypes[8]));
    } else if (enemiesGenerated == 40) {
      this.canGenerate = false;
      this.enemies.push(new Enemy(this, "bossTwo"));
      this.enemies.push(new Enemy(this, "bossTwoA"));
      setTimeout(function() {
        that.enemiesGenerated++;
        that.canGenerate = true;
      }, 10000);
    } else if (enemiesGenerated > 40) {
      this.enemies.push(new Enemy(this, this.enemyTypes[8]));
      this.enemies.push(new Enemy(this, this.enemyTypes[8]));
      this.enemies.push(new Enemy(this, this.enemyTypes[8]));
    }
    this.enemiesGenerated++;
  }
};

//Eliminar enemigos
Game.prototype.checkEnemiesDestroyed = function() {
  this.enemies.forEach(
    function(e) {
      var indexE = this.enemies.indexOf(e);
      if (e.isDestroyed == true) {
        this.enemies.splice(indexE, 1);
      }
    }.bind(this)
  );
};

//Disparo enemigo
Game.prototype.enemyShoot = function() {
  if (this.framesCounter % 100 == 0) {
    this.enemies.forEach(function(e) {
      e.shoot();
    });
  }


// Comprobar cada colisión
  Game.prototype.checkCollision = function(a, b) {
    if (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    ) {
      return true;
    } else {
      return false;
    }
  };
};

// Efectos de las colisiones
Game.prototype.update = function() {
  // Disparos enemigos contra player
  this.activeProjectiles.forEach(
    function(e) {
      if (this.checkCollision(e, this.player)) {
        var indexE = this.activeProjectiles.indexOf(e);
        if (indexE > -1 && this.player.isDamaged === false) {
          this.player.health -= 1;
          if (this.player.playerLevel > 1) {
            this.player.playerLevel -= 1;
          }
          this.activeProjectiles.splice(indexE, 1);
          this.sounds[5].play();
          this.player.isDamaged = true;
          setTimeout(
            function() {
              this.player.isDamaged = false;
            }.bind(this),
            2000
          );
        }
      }
    }.bind(this)
  );
  // Disparos del player contra enemigos
  this.player.projectiles.forEach(
    function(p) {
      this.enemies.forEach(
        function(e) {
          if (this.checkCollision(e, p)) {
            e.health -= p.damage;
            if (p.type == "special"){
              console.log(e.health)
            }
            var indexE = this.enemies.indexOf(e);
            var indexP = this.player.projectiles.indexOf(p);
            if (indexE > -1 && p.type != "special") {
              this.player.projectiles.splice(indexP, 1);
              if (e.health <= 0) {
                e.destroyed();
                this.sounds[0].play();
                this.score += 20;
              }
            }
          }
        }.bind(this)
      );
    }.bind(this)
  );

  // Items que recoge el player
  this.items.forEach(
    function(i) {
      if (this.checkCollision(i, this.player)) {
        var indexI = this.items.indexOf(i);
        if (indexI > -1) {
          this.score += 50;
          this.items.splice(indexI, 1);
          if (i.itemType == "points") {
            this.sounds[1].play();
          }
          if (i.itemType == "weapon" && this.player.playerLevel <= 2) {
            this.player.playerLevel++;
            this.sounds[3].play();
          } else if (i.itemType == "health" && this.player.health < 5) {
            this.player.health++;
            this.sounds[2].play();
            return;
          } else if (i.itemType == "special" && this.player.specialCount < 3) {
            this.player.specialCount++;
            this.sounds[4].play();
          }
        }
      }
    }.bind(this)
  );
};
