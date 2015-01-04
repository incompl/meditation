/* global $,$$,alert */

var $meditation = $('#meditation');
var $end = $('#end');
var $prep = $('#prep');
var $duration = $('#duration');
var $preview = $('#preview');
var sound = $('#sound');

var prepTimeout;
var meditationTimeout;

$meditation.addEventListener('submit', function(e) {
  $meditation.style.display = 'none';
  $end.style.display = 'block';
  var prep = Number($prep.value);
  var duration = Number($duration.value);
  meditate(prep, duration);
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

$preview.addEventListener('click', function(e) {
  sound.currentTime = 0;
  sound.play();
  e.preventDefault();
}, false);

function done() {
  window.clearTimeout(prepTimeout);
  window.clearTimeout(meditationTimeout);
  $meditation.style.display = 'block';
  $end.style.display = 'none';
}

function meditate(prep, duration) {
  if (isNaN(prep)) {
    alert('Please enter a preparation time in seconds.');
    return;
  }
  if (isNaN(duration)) {
    alert('Please enter a meditation time in minutes.');
    return;
  }
  prepTimeout = window.setTimeout(function() {
    sound.currentTime = 0;
    sound.play();
    meditationTimeout = window.setTimeout(function() {
      sound.currentTime = 0;
      sound.play();
      done();
    }, duration * 1000 * 60);
  }, prep * 1000);
}
