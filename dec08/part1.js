const path = require('path');
const fs = require('fs');
const { parse } = require('path');

fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  getCounts(data);
});

const getCounts = data => {
  const rows = data.split('\n');
  const instructions = rows.map(row => {
    keyValue = row.split(' ');
    return {
      operation: keyValue[0],
      argument: parseInt(keyValue[1]),
      seen: false,
    };
  });
  console.log({ instructions });

  let acc = 0;
  let index = 0;
  while (!instructions[index].seen) {
    instructions[index].seen = true;
    const op = instructions[index].operation;
    const arg = instructions[index].argument;
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
};
