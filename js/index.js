window.onload = function() {
  var game = new Game("canvas");

  document.getElementById("start-btn").onclick = function() {
    if (game.gameOn==true){return}
    else {game.start()};
  };
  document.getElementById("left-btn").ontouchstart = function() {
    game.player.moveLeft = true;
  }
  document.getElementById("left-btn").ontouchend = function() {
    game.player.moveLeft = false;
  }
}