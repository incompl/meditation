/* global $,$$,alert */

var $meditation = $('#meditation');
var $end = $('#end');
var $prep = $('#prep');
var $duration = $('#duration');
var $preview = $$('.preview');
var sound = $('#bong');//defaults to bong

var prepTimeout;
var meditationTimeout;

$meditation.addEventListener('submit', function(e) {
  var prep = Number($prep.value);
  var duration = Number($duration.value);
  var success = meditate(prep, duration);
  if (success) {
    $meditation.style.display = 'none';
    $end.style.display = 'block';
  }
  e.preventDefault();
}, false);

$end.addEventListener('submit', function(e) {
  done();
  e.preventDefault();
}, false);

$end.addEventListener('submit', function(e) {
  done();
  e.preventDefault();
}, false);

$preview.forEach(
  function(prev){
    prev.addEventListener('click', function(e) {
    stopMusic();
    var song = prev.getAttribute('data-attr')
    sound = $('#'+song);
    sound.currentTime = 0;
    sound.play();

    e.preventDefault();
  }, false);
});

function stopMusic(){
  //stop audio if already playing
  if (!sound.paused && !sound.ended && 0 < sound.currentTime){
    sound.currentTime = 0;
    sound.pause();
  }
}

function done() {
  window.clearTimeout(prepTimeout);
  window.clearTimeout(meditationTimeout);
  $meditation.style.display = 'block';
  $end.style.display = 'none';
}

function meditate(prep, duration) {
  if (isNaN(prep)) {
    alert('Please enter a preparation time in seconds.');
    return false;
  }
  if (isNaN(duration)) {
    alert('Please enter a meditation time in minutes.');
    return false;
  }
  sound.currentTime = 0;
  sound.play();
  prepTimeout = window.setTimeout(function() {
    sound.currentTime = 0;
    sound.play();
    meditationTimeout = window.setTimeout(function() {
      sound.currentTime = 0;
      sound.play();
      done();
    }, duration * 1000 * 60);
  }, prep * 1000);
  return true;
}
