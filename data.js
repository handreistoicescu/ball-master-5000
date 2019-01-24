// TODO - need to make sure all balls have the same speed
// research velocity/speed relations and theory

// TODO make sure positionX and positionY are not smaller than radius
const colorScheme = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900'];
const radius = 20;
const bgColor = "#E0E4CC";

// TODO: finish this generating function
function getThemBalls(ballNumber, sceneConstraints, colorScheme, radius, totalVelocity) {
  const balls = [];
  for(i=0; i<=ballNumber; ++i) {
    const ball = {
      color: 'red',
      posX: 30,
      posY: 20,
      radius: 20,
      vx: 15,
      vy: 15
    }
  }
  return balls;
}

export const balls = [
  { 
    color: 'red', 
    posX: 30, 
    posY: 30,
    radius: radius, 
    vx: 7, 
    vy: 1 
  },
  { 
    color: 'blue', 
    posX: 100, 
    posY: 150, 
    radius: radius, 
    vx: 4, 
    vy: 4 
  },
  { 
    color: 'black', 
    posX: 200, 
    posY: 200, 
    radius: radius, 
    vx: 6, 
    vy: 2 
  },
];

export default function getBalls() {
  return balls;
}