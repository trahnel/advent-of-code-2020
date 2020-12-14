const path = require('path');
const fs = require('fs');

const solve = (data) => {
  rows = data.split('\n');
  console.log({ rows });

  const resultMap = new Map();
  let mask;
  rows.forEach((row) => {
    if (row.startsWith('mask')) {
      mask = row.split(' = ')[1];
    } else {
      const regExpMemPos = /\[(.*?)\]/;
      const memPos = regExpMemPos.exec(row)[1];
      const int = row.split(' = ')[1];
      intBinary = parseInt(int).toString(2);
      intBinaryPadded = intBinary.padStart(36, '0');

      const binaryOutput = Array.from(intBinaryPadded).reduce(
        (acc, char, index) =>
          mask[index] === 'X' ? acc + char : acc + mask[index],
        ''
      );

      const outputValue = parseInt(binaryOutput, 2);
      resultMap.set(parseInt(memPos), outputValue);
      // console.log({
      //   memPos,
      //   int,
      //   intBinary,
      //   intBinaryPadded,
      //   binaryOutput,
      //   outputValue,
      // });
    }
  });
  console.log({ resultMap });
  const sum = Array.from(resultMap.values()).reduce(
    (acc, value) => acc + value,
    0
  );
  console.log({ sum });
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
