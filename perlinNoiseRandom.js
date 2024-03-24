var p = new Array(512);
var permutation = [];
for (var i = 0; i < 256; i++) {
  permutation[i] = i;
}
permutation.sort(() => Math.random() - 0.5);
for (var i=0; i < 256 ; i++) 
  p[256+i] = p[i] = permutation[i];

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t, a, b) { return a + t * (b - a); }
function grad(hash, x, y, z) {
  var h = hash & 15;
  var u = h<8 ? x : y,
      v = h<4 ? y : h==12||h==14 ? x : z;
  return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
}

function perlinRandom(x, y, z) {
  var X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255,
      Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  var u = fade(x),
      v = fade(y),
      w = fade(z);
  var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,
      B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;

  return lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),
                                 grad(p[BA  ], x-1, y  , z   )),
                       lerp(u, grad(p[AB  ], x  , y-1, z   ),
                                 grad(p[BB  ], x-1, y-1, z   ))),
                 lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),
                                 grad(p[BA+1], x-1, y  , z-1 )),
                       lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
                                 grad(p[BB+1], x-1, y-1, z-1 ))));
}