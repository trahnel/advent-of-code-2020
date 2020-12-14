const path = require('path');
const fs = require('fs');

const solve = (data) => {
  input = data.split('\n');
  const timestamp = parseInt(input[0]);
  const busIds = input[1]
    .split(',')
    .filter((busId) => busId !== 'x')
    .map((busId) => parseInt(busId));
  console.log({ timestamp, busIds });

  const busIdToTime = new Map();
  busIds.forEach((busId) => {
    const closestTime = Math.floor(timestamp / busId) * busId + busId;
    busIdToTime.set(closestTime, busId);
  });
  console.log({ busIdToTime });

  const closestTime = Math.min(...busIdToTime.keys());
  const myBusId = busIdToTime.get(closestTime);
  const waitTime = closestTime - timestamp;
  const result = myBusId * waitTime;
  console.log({ closestTime, myBusId, waitTime, result });
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
