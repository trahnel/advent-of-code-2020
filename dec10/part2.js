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

  const diffArray = adapters
    .map((value, index) => value - adapters[index - 1])
    .slice(1);
  // console.log({ diffArray });

  // let sums = new Map();
  // diffArray.forEach(diff => {
  //   if (sums.has(diff)) {
  //     sums.set(diff, sums.get(diff) + 1);
  //   } else {
  //     sums.set(diff, 1);
  //   }
  // });
  // console.log({ sums });

  const getVariations = (array, memo = new Map()) => {
    const key = array.join(',');
    if (memo.has(key)) {
      return memo.get(key);
    }
    console.log(key);

    let result = 1;
    for (let i = 1; i < array.length - 1; i++) {
      const prev = array[i - 1];
      const next = array[i + 1];
      if (next - prev <= 3) {
        const excluded = [array[i - 1]].concat(array.slice(i + 1));
        result += getVariations(excluded, memo);
      }
    }
    memo.set(key, result);
    return result;
  };

  const results = getVariations(adapters);
  console.log('result', results);
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
