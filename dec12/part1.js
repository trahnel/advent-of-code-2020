const path = require('path');
const fs = require('fs');

const solve = data => {
  const navigation = data
    .split('\n')
    .map(row => ({ action: row[0], distance: parseInt(row.substring(1)) }));
  // console.log({ navigation });

  // 0: 'EAST';
  // 1: 'SOUTH';
  // 2: 'WEST';
  // 3: 'NORTH';
  let direction = 0;
  let x = 0;
  let y = 0;

  const travel = (geoDirection, distance) => {
    switch (geoDirection) {
      case 'N':
        y += distance;
        break;
      case 'S':
        y -= distance;
        break;
      case 'E':
        x += distance;
        break;
      case 'W':
        x -= distance;
        break;
      default:
        break;
    }
  };

  const turn = (leftOrRight, degrees) => {
    const leftOrRightValue = leftOrRight === 'L' ? -1 : 1;
    const turnValue = degrees / 90;
    const tempDirection = (direction + turnValue * leftOrRightValue) % 4;
    if (tempDirection < 0) {
      direction = tempDirection + 4;
    } else {
      direction = tempDirection;
    }
  };

  const forward = distance => {
    switch (direction) {
      case 0:
        travel('E', distance);
        break;
      case 1:
        travel('S', distance);
        break;
      case 2:
        travel('W', distance);
        break;
      case 3:
        travel('N', distance);
        break;
      default:
        break;
    }
  };

  const navigate = row => {
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
    console.log({
      action: row.action,
      distance: row.distance,
      x,
      y,
      direction,
    });
  };

  navigation.forEach(row => navigate(row));
  console.log({ x, y, direction });
  const manhattanDistance = Math.abs(x) + Math.abs(y);
  console.log({ manhattanDistance });
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
