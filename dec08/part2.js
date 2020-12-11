const path = require('path');
const fs = require('fs');
const { parse } = require('path');

fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  var start = new Date();
  getCounts(data);
  var time = new Date() - start;
  console.log('Time:', time, 'ms');
});

const getCounts = data => {
  const rows = data.split('\n');
  const instructions = rows.map(row => {
    keyValue = row.split(' ');
    return {
      operation: keyValue[0],
      argument: parseInt(keyValue[1]),
      seen: false,
      flipped: false,
    };
  });
  // console.log({ instructions });

  let index = 0;
  while (index < instructions.length) {
    let acc = 0;
    index = 0;
    const instructionsCopy = JSON.parse(JSON.stringify(instructions));
    let flippedInLoop = false;

    while (index < instructions.length && !instructionsCopy[index].seen) {
      instructionsCopy[index].seen = true;
      let op = instructionsCopy[index].operation;
      const arg = instructionsCopy[index].argument;
      const flipped = instructionsCopy[index].flipped;

      if (op === 'nop' && !flipped && !flippedInLoop) {
        instructionsCopy[index].operation = op = 'jmp';
        instructions[index].flipped = true;
        flippedInLoop = true;
      } else if (op === 'jmp' && !flipped && !flippedInLoop) {
        instructionsCopy[index].operation = op = 'nop';
        instructions[index].flipped = true;
        flippedInLoop = true;
      }
      // console.log({ index, op, arg, flipped, flippedInLoop, acc });

      switch (op) {
        case 'acc':
          acc += arg;
          index += 1;
          break;
        case 'jmp':
          index += arg;
          break;
        case 'nop':
          index += 1;
          break;
        default:
          break;
      }
    }
    console.log({ acc });
  }
};
