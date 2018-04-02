function play(game) {
  var audio = document.getElementById('sounds');
  if (audio.paused) {
      audio.play();
      $('#play').removeClass('glyphicon-play-circle')
      $('#play').addClass('glyphicon-pause')
  }else{
      audio.pause();
      audio.currentTime = 0
      $('#play').addClass('glyphicon-play-circle')
      $('#play').removeClass('glyphicon-pause')
  }
}