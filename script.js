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


// Function to continuously draw on canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw a circle
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  for (let i = 0; i < Math.PI * 2; i += 0.01) {
    let r = Math.random() * 30 + 100;
    let x = r * Math.cos(i) + canvas.width / 2;
    let y = r * Math.sin(i) + canvas.height / 2;
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  requestAnimationFrame(draw);
}

draw();