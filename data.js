// TODO - need to make sure all balls have the same speed
// research velocity/speed relations and theory

// TODO - make sure ball won't be generated on another balls' place
// TODO - make sure the canvas has enough space for all the balls

const canvas = document.getElementById('app-canvas');
canvas.width = 800;
canvas.height = 800;

const ballsConfig = {
  ballNumber: 1000,
  sceneWidth: canvas.width,
  sceneHeight: canvas.height,
  colorScheme: ['#69D2E7', '#A7DBD8', '#F38630', '#FA6900'],
  radius: 10,
  totalVelocity: 10
}

canvas.style.backgroundColor = '#E0E4CC';
canvas.style.borderColor = 'gray';
canvas.style.borderWidth = '8px';

// TODO: finish this generating function
function getThemBalls({ ballNumber, sceneWidth, sceneHeight, colorScheme, radius, totalVelocity }) {
  const balls = [];
  for(let i=0; i<=ballNumber; ++i) {
    const ball = {};

    // Q: how does this randomizing function actually work?
    // ball.color = colorScheme[Math.floor(Math.random()*colorScheme.length)];
    ball.color = getRandomArrayItem(colorScheme);
    ball.posX = getRandomInt(0 + radius, sceneWidth - radius);
    ball.posY = getRandomInt(0 + radius, sceneHeight - radius);
    ball.radius = radius;
    ball.vx = getRandomInt(1, totalVelocity);
    ball.vy = totalVelocity - ball.vx;

    balls.push(ball);
  };
  return balls;
}

// TODO: move to utility module
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayItem(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

const balls = getThemBalls(ballsConfig);

export default balls;