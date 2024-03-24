// Get the canvas and its 2D rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to fit the window
window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
  canvas.width = window.innerWidth - 2;
  canvas.height = window.innerHeight - 1;
}
resizeCanvas();

let noiseMap = 3;
let phase = 1;

// Helper function to map a value from one range to another
function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function drawCircle(j){
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${j * 36}, 100%, 100%)`;    
  for (let i = 0; i < Math.PI * 2; i += 0.2) {
    let xoff = map(Math.cos(i + phase + j), -1, 1, 0, noiseMap);
    let yoff = map(Math.sin(i + j), -1, 1, 0, noiseMap);
    let zoff = map(Math.sin(i - phase + j), -1, 1, 0, noiseMap);
    let r = map(perlinRandom(xoff, yoff, zoff), 0, 1, 100, 250); 
    let x = r * Math.cos(i) + canvas.width / 2;
    let y = r * Math.sin(i) + canvas.height / 2;
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

// Function to continuously draw on canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw a circle
  for (let j = 0; j < 10; j++){
    drawCircle(j);
  }
  phase += 0.01;  

  requestAnimationFrame(draw);
}

draw();