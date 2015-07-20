export default function(){
  if(typeof arguments[0].ampSpectrum !== "object"){
    throw new TypeError();
  }
  var NUM_BARK_BANDS = 24;
  var specific = new Float32Array(NUM_BARK_BANDS);
  var total = 0;
  var normalisedSpectrum = arguments[0].ampSpectrum;
  var bbLimits = new Int32Array(NUM_BARK_BANDS+1);

  bbLimits[0] = 0;
  var currentBandEnd = arguments[0].barkScale[normalisedSpectrum.length-1]/NUM_BARK_BANDS;
  var currentBand = 1;
  for(var i = 0; i<normalisedSpectrum.length; i++){
    while(arguments[0].barkScale[i] > currentBandEnd) {
      bbLimits[currentBand++] = i;
      currentBandEnd = currentBand*arguments[0].barkScale[normalisedSpectrum.length-1]/NUM_BARK_BANDS;
    }
  }

  bbLimits[NUM_BARK_BANDS] = normalisedSpectrum.length-1;

  //process

  for (var i = 0; i < NUM_BARK_BANDS; i++){
    var sum = 0;
    for (var j = bbLimits[i] ; j < bbLimits[i+1] ; j++) {

      sum += normalisedSpectrum[j];
    }
    specific[i] = Math.pow(sum,0.23);
  }

  //get total loudness
  for (var i = 0; i < specific.length; i++){
    total += specific[i];
  }
  return {
    "specific": specific,
    "total": total
  };
}
