import { getBalls } from './data.js';

const canvas = document.getElementById('app-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const ballsConfig = {
  ballNumber: 2,
  sceneWidth: canvas.width,
  sceneHeight: canvas.height,
  colorScheme: ['#69D2E7', '#63F4BC', '#638FF4', '#A7DBD8', '#A5E8BE', '#F38630', '#FA6900', '#FDAE0D', '#E3850B', '#5E8E8C'],
  radius: 100,
  totalVelocity: 5
}

let ballsData = getBalls(ballsConfig);

function updateConfig(configData) {
  Object.keys(configData).forEach((key) => {
    if (ballsConfig.hasOwnProperty(key)) {
      ballsConfig[key] = configData[key];
    } else {
      throw "This key is not in the config object";
    }
  });
}

const inputBalls = document.getElementById('input-config-balls');
const inputSize = document.getElementById('input-config-size');

inputBalls.value = ballsConfig.ballNumber;
inputSize.value = ballsConfig.radius;

inputBalls.addEventListener('keyup', (event) => {
  updateConfig({ ballNumber: parseInt(event.target.value, 10) });
  ballsData = getBalls(ballsConfig);
});
inputSize.addEventListener('keyup', (event) => {
  updateConfig({ radius: parseInt(event.target.value, 10) });
  ballsData = getBalls(ballsConfig);
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