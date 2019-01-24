import balls from './data.js';

class Ball {
  constructor(context, posX, posY, color, radius) {
    context.beginPath();
    context.arc(posX, posY, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  }
}

const ballsData = balls;

const canvas = document.getElementById('app-canvas');
const ctx = canvas.getContext('2d');

function draw() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ballsData.forEach((el) => {
    // display element
    new Ball(ctx, el.posX, el.posY, el.color, el.radius);
     
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