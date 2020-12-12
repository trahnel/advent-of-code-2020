const path = require('path');
const fs = require('fs');

const solve = data => {
  const adapters = data
    .split('\n')
    .map(value => parseInt(value))
    .sort((a, b) => a - b);
  adapters.unshift(0);
  adapters.push(Math.max(...adapters) + 3);
  // console.log({ adapters });

  const diffs = new Map();
  adapters.forEach((value, index) => {
    if (index !== 0) {
      diff = value - adapters[index - 1];
      diffs.has(diff)
        ? diffs.set(diff, diffs.get(diff) + 1)
        : diffs.set(diff, 1);
    }
  });
  console.log({ diffs }, diffs.get(1) * diffs.get(3));
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
