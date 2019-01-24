// TODO - need to make sure all balls have the same speed
// research velocity/speed relations and theory

// TODO - make sure ball won't be generated on another balls' place
// TODO - make sure the canvas has enough space for all the balls

// TODO - make input fields for ball generating values
// TODO - fps counter
// TODO - speed research - make the speed the same for all balls

// TODO - don't rerender the background and border at every pass

const canvas = document.getElementById('app-canvas');
canvas.width = 500;
canvas.height = 500;

const ballsConfig = {
  ballNumber: 50,
  sceneWidth: canvas.width,
  sceneHeight: canvas.height,
  colorScheme: ['#69D2E7', '#63F4BC', '#638FF4', '#A7DBD8', '#A5E8BE', '#F38630', '#FA6900', '#FDAE0D', '#E3850B', '#5E8E8C'],
  radius: 10,
  totalVelocity: 10
}

canvas.style.backgroundColor = '#E0E4CC';
canvas.style.borderColor = '#6A6E57';
canvas.style.borderWidth = '8px';



// TODO: finish this generating function
function getThemBalls({ ballNumber, sceneWidth, sceneHeight, colorScheme, radius, totalVelocity }) {
  const balls = [];
  const grid = getGrid(sceneWidth, sceneHeight, radius);

  if(ballNumber > grid.length) {
    throw `Too many balls for this grid. Balls: ${ballNumber}. Grid: ${grid.length}`;
  }

  for(let i=0; i<=ballNumber; ++i) {
    const ball = {};

    // Q: how does this randomizing function actually work?
    // ball.color = colorScheme[Math.floor(Math.random()*colorScheme.length)];
    ball.color = getRandomArrayItem(colorScheme);

    // get a random position from the grid
    const gridPosition = getRandomArrayItem(grid);

    // assign the positions from the grid item
    ball.posX = gridPosition[0];
    ball.posY = gridPosition[1];

    // get rid of the position so next items won't use it
    // TODO - maybe optimize array searches and array resizing
    grid.splice(grid.indexOf(gridPosition), 1);

    ball.radius = radius;
    ball.vx = getRandomInt(1, totalVelocity);
    ball.vy = totalVelocity - ball.vx;

    balls.push(ball);
  };
  return balls;
}

// generates a grid in the container given the container size and the size of the grid cell
function getGrid(containerWidth, containerHeight, itemRadius) {
  const grid = [];

  for(let y = 1 + itemRadius; y < containerHeight; y = y + 2 * itemRadius) {
    for(let x = 1 + itemRadius; x < containerWidth; x = x + 2 * itemRadius) {
      const coordSet = [x, y];
      grid.push(coordSet);
    }
  }

  return grid;
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