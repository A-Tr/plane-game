function Game(canvas) {
  this.canvas = document.getElementById(canvas)  
  this.ctx = this.canvas.getContext("2d");
  this.gameOn = false
  this.framesCounter = 0;
  this.enemies = [];
  this.enemiesGenerated = 0;
  
}

Game.prototype.start = function() {
  
  this.reset()
  this.interval = setInterval( function () {
    this.clear();
    this.generateEnemy();
    this.move();
    this.draw();
    this.framesCounter += 1;
    if (this.framesCounter >= 10000){
      this.framesCounter = 0
    }

  }.bind(this), 1000/60);
  this.gameOn = true;
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};



Game.prototype.draw = function () {
  this.background.draw();
  this.enemies.forEach(function (e) {
    e.draw()
  })
  this.player.draw();

}

Game.prototype.reset = function () {
  this.background = new Background(this);
  this.player = new Player(this);
  this.enemies = [];
  this.framesCounter = 0;
}

Game.prototype.move = function () {
  this.background.move();
  this.enemies.forEach(function(e) {
    e.move();
  })
  this.player.move();
  this.player.projectiles.forEach(function(p) {
    p.move();
  })
  
}

Game.prototype.generateEnemy = function () {
  if (this.framesCounter % 100 == 0 && this.enemiesGenerated < 6){
    this.enemies.push(new Enemy(this))
    this.enemiesGenerated++
    console.log(this.enemiesGenerated)
  } else if (this.enemiesGenerated > 4) {

  }
}