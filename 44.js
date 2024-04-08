// Actualiza el medidor de niveles de audio
function updateAudioMeter() {
  var audioElement = document.getElementById('audioPlayer');
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var source = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 32;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    var bars = document.querySelectorAll('.audioMeterBar');
    for (var i = 0; i < bars.length; i++) {
      var barHeight = dataArray[i] / 2;
      bars[i].style.height = barHeight + 'px';
    }
  }

  draw();
}

// Llama a la función para actualizar el medidor de niveles de audio
updateAudioMeter();
// JavaScript Document