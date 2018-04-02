window.onload = function() {
  var game = new Game("canvas");

  document.getElementById("start-btn").onclick = function() {
    game.start();
  };

  document.getElementById("start-btn").onclick = function() {
    clearInterval
    game.reset();
    game.start();
  }
};
