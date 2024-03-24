var pRandom = new Array(512);
var permutation = [];
for (var i = 0; i < 256; i++) {
  permutation[i] = i;
}
permutation.sort(() => Math.random() - 0.5);
for (var i=0; i < 256 ; i++) 
  pRandom[256+i] = pRandom[i] = permutation[i];

function fadeRandom(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerpRandom(t, a, b) { return a + t * (b - a); }
function gradRandom(hash, x, y, z) {
  var h = hash & 15;
  var u = h<8 ? x : y,
      v = h<4 ? y : h==12||h==14 ? x : z;
  return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
}

function perlinRandom() {
  var x = arguments[0] || 0;
  var y = arguments[1] || 0;
  var z = arguments[2] || 0;

  var X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255,
      Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  var u = fadeRandom(x),
      v = fadeRandom(y),
      w = fadeRandom(z);
  var A = pRandom[X  ]+Y, AA = pRandom[A]+Z, AB = pRandom[A+1]+Z,
      B = pRandom[X+1]+Y, BA = pRandom[B]+Z, BB = pRandom[B+1]+Z;

  var rawNoise;
  if (arguments.length === 1) {
    // 1D Perlin noise
    rawNoise = lerpRandom(u, gradRandom(pRandom[AA  ], x, 0, 0), gradRandom(pRandom[BA  ], x-1, 0, 0));
  } else if (arguments.length === 2) {
    // 2D Perlin noise
    rawNoise = lerpRandom(v, lerpRandom(u, gradRandom(pRandom[AA  ], x, y, 0), gradRandom(pRandom[BA  ], x-1, y, 0)),
                        lerpRandom(u, gradRandom(pRandom[AB  ], x, y-1, 0), gradRandom(pRandom[BB  ], x-1, y-1, 0)));
  } else {
    // 3D Perlin noise
    rawNoise = lerpRandom(w, lerpRandom(v, lerpRandom(u, gradRandom(pRandom[AA  ], x, y, z), gradRandom(pRandom[BA  ], x-1, y, z)),
                              lerpRandom(u, gradRandom(pRandom[AB  ], x, y-1, z), gradRandom(pRandom[BB  ], x-1, y-1, z))),
                        lerpRandom(v, lerpRandom(u, gradRandom(pRandom[AA+1], x, y, z-1), gradRandom(pRandom[BA+1], x-1, y, z-1)),
                              lerpRandom(u, gradRandom(pRandom[AB+1], x, y-1, z-1), gradRandom(pRandom[BB+1], x-1, y-1, z-1))));
  }

  // Scale and shift the output to be between 0 and 1
  var noise = (rawNoise + 1) / 2;

  return noise;
}
