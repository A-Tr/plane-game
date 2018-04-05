function Game(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.gameOn = false;

  this.framesCounter = 0;
  this.enemies = [];
  this.enemiesGenerated = 0;
  this.activeProjectiles = [];
  this.score = 0;
  this.highScore = 0;
  this.loop = 0;

  this.gameOverSentences = ["JUST ONE MORE TIME", "AGAIN", "KEEP TRYING", "DON'T DISSAPOINT ME"]

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

  var linejump = 36
  this.ctx.fillStyle = "#00ffff";
  this.ctx.font = "bold 22px Orbitron";
  this.ctx.fillText("YOUR MISSION:", 10, this.canvas.height / 4 - linejump);
  this.ctx.fillText("Get on our latest experimental", 10, this.canvas.height / 4);
  this.ctx.fillText("ship and exterminate ", 10, this.canvas.height / 4 + linejump)
  this.ctx.fillText("the invaders.", 10, this.canvas.height / 4 + linejump * 2)
  this.ctx.fillText("Good luck.", 10, this.canvas.height / 4 + 72 + linejump * 3)
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
  this.sounds[6].play();
  this.loop++
  var that = this;
  if (this.score > this.highScore) {
    this.highScore = this.score;
  }
  setTimeout(function() {
    that.gameOn = false;
  }, 1000);

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
  this.ctx.font = "bold 42px Orbitron";
  this.ctx.fillText("YOU'RE DEAD", 30, 250);
  this.ctx.font = "bold 26px Orbitron";
  this.ctx.fillText("Please press PLAY", 30, 250 + 36);
  this.ctx.fillText("YOUR SCORE: " + this.score, 30, 250 + 36 * 2);
  this.ctx.fillText("HIGH SCORE: " + this.highScore, 30, 250 + 36 * 3);
  this.ctx.font = "bold 38px Orbitron";
  this.ctx.fillText(this.gameOverSentences[Math.floor(Math.random() * 4)] , 10, 600);
  clearInterval(this.interval);
};

// Limpiar pantalla y proyectiles sobrantes
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.activeProjectiles = this.activeProjectiles.filter(function(p) {
    return p.y < 800;
  });
};

// Dibujar puntuación
Game.prototype.scoreDraw = function() {
  (this.ctx.font = "bold 24px Orbitron"), (this.ctx.fillStyle = "#00ffff");
  this.ctx.fillText(this.score, 190, 790);
};

// Dibujar vidas
Game.prototype.healthDraw = function() {
  var that = this;
  this.x = 10;
  this.y = 720;
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
      28,
      28
    );
    this.x += 30;
  }
};

// Dibujar munición especial
Game.prototype.specialDraw = function() {
  var that = this;
  this.x = 280;
  this.y = 720;
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
      32,
      32
    );
    this.x += 30;
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

  //Comprobar daño a los enemigo
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
          if (indexE > -1 && p.bulletType != "special") {
            that.player.projectiles.splice(indexP, 1);
            if (e.health <= 0) {
              e.destroyed();
              that.sounds[0].play();
              that.score += 20;
            }
          }
        }
      });
    });
  };

  // Comprobar daño al jugador
  Game.prototype.checkPlayerDamage = function() {
    var that = this;
    this.activeProjectiles.forEach(function(e) {
      if (
        e.x < that.player.x + that.player.width &&
        e.x + e.width > that.player.x &&
        e.y < that.player.y + that.player.height &&
        e.y + e.height > that.player.y
      ) {
        var indexE = that.activeProjectiles.indexOf(e);
        if (indexE > -1 && that.player.isDamaged === false) {
          that.player.health -= 1;
          if (that.player.playerLevel > 1) {
            that.player.playerLevel -= 1;
          }
          that.activeProjectiles.splice(indexE, 1);
          that.sounds[5].play();
          that.player.isDamaged = true;
          setTimeout(function() {
            that.player.isDamaged = false;
          }, 2000);
        }
      }
    });
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
          that.score += 50;

          if (i.itemType == "weapon" && that.player.playerLevel <= 2) {
            that.player.playerLevel++;
            that.sounds[3].play();
          } else if (i.itemType == "health" && that.player.health < 5) {
            that.player.health++;
            that.sounds[2].play();
            return;
          } else if (i.itemType == "special" && that.player.specialCount < 3) {
            that.player.specialCount++;
            that.sounds[3].play();
          }
          that.sounds[1].play();
        }
      }
    });
  };
};
