const path = require('path');
const fs = require('fs');

const solve = (data) => {
  const busIdStrings = data.split('\n')[1];
  // const busIdStrings = '7,13,x,x,59,x,31,19';
  const buses = busIdStrings
    .split(',')
    .map((busId, index) =>
      busId === 'x' ? null : { id: parseInt(busId), index }
    )
    .filter((bus) => bus);
  console.log({ busIdNumbers: buses });

  let time = buses[0].id;
  let step = buses[0].id;
  for (let i = 1; i < buses.length; i++) {
    const { id, index } = buses[i];
    while ((time + index) % id !== 0) {
      time += step;
    }
    step = step * id;
  }
  return time;
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
const result = solve(data);
console.log({ result });
var time = new Date() - start;
console.log('Time:', time, 'ms');
