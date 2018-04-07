window.onload = function() {
  var game = new Game("canvas");
  var leftButton = document.getElementById("left-ctrl");
  var rightButton = document.getElementById("right-ctrl");

  document.getElementById("start-btn").onclick = function() {
    if (game.gameOn==true){return}
    else {
      game.start()
      document.getElementById("start-btn").style.visibility = "hidden";
      document.getElementById("instructions").style.visibility = "hidden";
    };

  };

  leftButton.ontouchstart = function() {
    game.player.moveLeft = true;
  }
  leftButton.ontouchend = function() {
    game.player.moveLeft = false;
  }

  rightButton.ontouchstart = function() {
    game.player.moveRight = true;
  }

  rightButton.ontouchend = function() {
    game.player.moveRight = false;
  }

  document.getElementById("spec-shoot").ontouchstart = function () {
      game.player.shootSpecial()
  }
}