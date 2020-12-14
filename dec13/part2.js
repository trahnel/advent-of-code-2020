const path = require('path');
const fs = require('fs');

const solve = (data) => {
  // const busIdStrings = data.split('\n')[1];
  const busIdStrings = '1789,37,47,1889';
  const busIdNumbers = busIdStrings
    .split(',')
    .map((busId) => (busId === 'x' ? null : parseInt(busId)));
  const maxBusId = Math.max(...busIdNumbers);
  const maxBusIdIndex = busIdNumbers.findIndex((busId) => busId === maxBusId);
  console.log({ busIdNumbers, maxBusId, maxBusIdIndex });

  const busIdToIndexDiff = new Map();
  busIdNumbers.forEach((busId, index) => {
    if (busId !== null && busId !== maxBusId) {
      const indexDiff = maxBusIdIndex - index;
      busIdToIndexDiff.set(busId, indexDiff);
    }
  });
  console.log({ busIdToIndexDiff, length: busIdToIndexDiff.size });

  let allMatch = false;
  let t = maxBusId;
  while (!allMatch) {
    allMatch = true;
    for (let [busId, indexDiff] of busIdToIndexDiff) {
      const busTime = t - indexDiff;
      if (busTime % busId !== 0) {
        // NO MATCH :/
        allMatch = false;
        break;
      }
    }
    t += maxBusId;
  }
  const result = t - maxBusId - maxBusIdIndex;
  console.log({ t, maxBusIdIndex, result });
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
