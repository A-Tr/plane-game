function Game(canvas) {
  this.canvas = document.getElementById(canvas)  
  this.ctx = this.canvas.getContext("2d");
  this.gameOn = false
  
}

Game.prototype.start = function() {
  
  this.reset()
  this.interval = setInterval( function () {
    this.clear();
    this.move();
    this.draw();
    this.framesCounter += 1;
    if (this.framesCounter >= 1000){
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
  this.player.draw();

}

Game.prototype.reset = function () {
  this.background = new Background(this);
  this.player = new Player(this);

  this.framesCounter = 0;
}

Game.prototype.move = function () {
  this.background.move();
  this.player.move();
  this.player.projectiles.forEach(function(p) {
    p.move();
  })
  
}