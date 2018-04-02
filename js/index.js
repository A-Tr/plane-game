window.onload = function() {
  var game = new Game("canvas");

  document.getElementById("start-btn").onclick = function() {
    if (game.gameOn==true){return}
    else {game.start()};
  };

  document.getElementById("restart-btn").onclick = function() {
    game.reset();
    game.start();
  }
};
