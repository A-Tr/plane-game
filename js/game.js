function Game(canvas) {
  this.canvas = document.getElementById(canvas)
  debugger
  
  this.ctx = this.canvas.getContext("2d");

  //this.reset()
}

Game.prototype.start = function() { 
  this.interval = setInterval( function () {
    this.clear();
    // this.moveAll();
    this.background = new Background(this);
    this.draw();

    this.framesCounter += 1;
    if (this.framesCounter >= 1000){
      this.framesCounter = 0
    }
  }.bind(this), 1000/60);
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};



Game.prototype.draw = function () {
  this.background.draw();
}