import balls from './data.js';

const ballsData = balls;

const canvas = document.getElementById('app-canvas');;
const ctx = canvas.getContext('2d');

const inputBalls = document.getElementById('input-config-balls');
const inputSize = document.getElementById('input-config-size');

inputBalls.addEventListener('keyup', (event) => {
  console.log(`${event.target.value}`);
});

// apply styles
canvas.style.backgroundColor = '#E0E4CC';
canvas.style.borderColor = '#6A6E57';
canvas.style.borderWidth = '8px';

class Ball {
  constructor(posX, posY, color, radius) {
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function draw() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ballsData.forEach((el) => {
    // display element
    const ball = new Ball(el.posX, el.posY, el.color, el.radius);
    ball.draw();
     
    // change element position according to velocity
    el.posX += el.vx;
    el.posY += el.vy;    

    // boundaries - compute velocity based on position
    if(el.posX + el.vx < el.radius || el.posX + el.vx > canvas.width - el.radius) {
      el.vx = -el.vx;
    }
    if(el.posY + el.vy < el.radius || el.posY + el.vy > canvas.height - el.radius) {
      el.vy = -el.vy;
    }
    
    // collisions
    // documentation from here: https://stackoverflow.com/questions/345838/ball-to-ball-collision-detection-and-handling
    ballsData.forEach((elem) => {
      if(elem !== el) {
        const distance = Math.sqrt(
          Math.pow(el.posX - elem.posX, 2) + Math.pow(el.posY - elem.posY, 2)
        );
        if(distance < (elem.radius + el.radius)) {
          el.vxTmp = el.vx;
          el.vyTmp = el.vy;
          el.vx = elem.vx;
          el.vy = elem.vy;
          elem.vx = el.vxTmp;
          elem.vy = el.vyTmp;
        }
      }
    }); 
  });
  requestAnimationFrame(draw);
}

draw();