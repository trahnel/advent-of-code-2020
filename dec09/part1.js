const path = require('path');
const fs = require('fs');

const getCounts = data => {
  const fullList = data.split('\n').map(value => parseInt(value));

  const preambleSize = 25;
  let invalid;
  for (let x = preambleSize; x < fullList.length; x++) {
    let testList = fullList.slice(x - preambleSize, x);
    const next = fullList[x];
    const match = testList.some((value1, i, array) => {
      for (let j = i; j < array.length; j++) {
        const value2 = array[j];
        if (value1 !== value2 && value1 + value2 === next) {
          return true;
        }
      }
    });
    // console.log({ testList, next, match, x });
    if (!match) {
      invalid = next;
      break;
    }
  }
  console.log({ invalid });

  for (let i = 0; i < fullList.length; i++) {
    const value1 = fullList[i];
    let sum = value1;
    let values = [value1];
    for (let j = i + 1; j < fullList.length; j++) {
      const value2 = fullList[j];
      values.push(value2);
      sum += value2;
      if (sum === invalid) {
        console.log('match!');
        break;
      }
    }
    if (sum === invalid) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      console.log(invalid, min + max);
      break;
    }
  }
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
getCounts(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
