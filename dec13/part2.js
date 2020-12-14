const path = require('path');
const fs = require('fs');

const solve = (data) => {
  const busIdStrings = data.split('\n')[1];
  // const busIdStrings = '1789,37,47,1889';
  const busIds = busIdStrings
    .split(',')
    .map((busId) => (busId === 'x' ? null : parseInt(busId)));
  const maxBusId = Math.max(...busIds);
  const maxBusIdIndex = busIds.findIndex((busId) => busId === maxBusId);
  console.log({ busIds, maxBusId, maxBusIdIndex });

  let allMatch = false;
  let t = maxBusId;
  while (!allMatch) {
    allMatch = true;
    for (let i = 0; i < busIds.length; i++) {
      const busId = busIds[i];
      if (busId !== null && busId !== maxBusId) {
        const indexDiff = maxBusIdIndex - i;
        const timeForI = t - indexDiff;
        // console.log({ t, busId, indexDiff, timeForI, mod: timeForI % busId });
        if (timeForI % busId !== 0) {
          // NO MATCH :/
          allMatch = false;
          break;
        }
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
