const path = require('path');
const fs = require('fs');

const solve = (data) => {
  values = data.split(',').map((val) => parseInt(val));
  console.log({ values });

  const lastSpokenIndex = new Map();
  values
    .slice(0, values.length - 1)
    .forEach((val, i) => lastSpokenIndex.set(val, i));
  // console.log({ lastSpokenIndex });

  const turns = [...values];
  for (let i = turns.length; i < 2020; i++) {
    const prevVal = turns[i - 1];

    // console.log({
    //   i: i,
    //   prevVal,
    //   lastSpokenIndex: lastSpokenIndex.get(prevVal),
    //   newVal: lastSpokenIndex.has(prevVal)
    //     ? i - 1 - lastSpokenIndex.get(prevVal)
    //     : 0,
    // });
    const newVal = lastSpokenIndex.has(prevVal)
      ? i - 1 - lastSpokenIndex.get(prevVal)
      : 0;
    turns[i] = newVal;
    lastSpokenIndex.set(prevVal, i - 1);
  }
  return turns[2019];
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
const result = solve(data);
console.log({ result });
var time = new Date() - start;
console.log('Time:', time, 'ms');
