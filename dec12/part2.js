const path = require('path');
const fs = require('fs');

const solve = (data) => {
  const navigation = data
    .split('\n')
    .map((row) => ({ action: row[0], distance: parseInt(row.substring(1)) }));
  // console.log({ navigation });

  // 0: 'EAST';
  // 1: 'SOUTH';
  // 2: 'WEST';
  // 3: 'NORTH';
  let x = 0;
  let y = 0;

  let waypointDX = 10;
  let waypointDY = 1;

  const travel = (geoDirection, distance) => {
    switch (geoDirection) {
      case 'N':
        waypointDY += distance;
        break;
      case 'S':
        waypointDY -= distance;
        break;
      case 'E':
        waypointDX += distance;
        break;
      case 'W':
        waypointDX -= distance;
        break;
      default:
        break;
    }
  };

  const turn = (leftOrRight, degrees) => {
    const rDegrees = leftOrRight === 'R' ? degrees : -degrees + 360;

    const tempX = waypointDX;
    const tempY = waypointDY;
    switch (rDegrees) {
      case 90:
        waypointDY = -tempX;
        waypointDX = tempY;
        break;
      case 180:
        waypointDX = -tempX;
        waypointDY = -tempY;
        break;
      case 270:
        waypointDY = tempX;
        waypointDX = -tempY;
      default:
        break;
    }
  };

  const forward = (distance) => {
    x = x + waypointDX * distance;
    y = y + waypointDY * distance;
  };

  const navigate = (row) => {
    switch (row.action) {
      case 'N':
      case 'S':
      case 'E':
      case 'W':
        travel(row.action, row.distance);
        break;
      case 'L':
      case 'R':
        turn(row.action, row.distance);
        break;
      case 'F':
        forward(row.distance);
        break;
      default:
        break;
    }
    // console.log({
    //   action: row.action,
    //   distance: row.distance,
    //   x,
    //   y,
    //   waypointDX,
    //   waypointDY,
    // });
  };

  navigation.forEach((row) => navigate(row));
  const manhattanDistance = Math.abs(x) + Math.abs(y);
  console.log({ manhattanDistance });
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
