const path = require('path');
const fs = require('fs');

const solve = (data) => {
  rows = data.split('\n');
  console.log({ rows });

  let mask;
  const assignments = [];
  rows.forEach((row) => {
    if (row.startsWith('mask')) {
      mask = row.split(' = ')[1];
    } else {
      const value = row.split(' = ')[1];
      const regExpMemPos = /\[(.*?)\]/;
      const memAddr = regExpMemPos.exec(row)[1];
      memAddrBin = parseInt(memAddr).toString(2).padStart(36, '0');

      const memPos = Array.from(memAddrBin).reduce(
        (acc, char, index) =>
          mask[index] === '0' ? acc + char : acc + mask[index],
        ''
      );
      assignments.push({ mask, memPos, value });
    }
  });

  const resolveFloating = (binaries) => {
    let resolved = true;
    const resolvedBinaries = [];
    binaries.forEach((binary) => {
      const xIndex = binary.indexOf('X');
      if (xIndex >= 0) {
        resolved = false;
        resolvedBinaries.push(
          binary.replace('X', '0'),
          binary.replace('X', '1')
        );
      } else {
        resolvedBinaries.push(binary);
      }
    });
    if (resolved) {
      return resolvedBinaries;
    }
    return resolveFloating(resolvedBinaries);
  };

  const resolved = [];
  assignments.forEach((assignment) => {
    const resolvedMemPositions = resolveFloating([assignment.memPos]);
    resolvedMemPositions.forEach((res) => {
      resolved.push({
        mask: assignment.mask,
        memPos: parseInt(res, 2),
        value: parseInt(assignment.value),
      });
    });
  });

  const memory = new Map();
  const assignToMemory = (memPos, value) => {
    memory.set(memPos, value);
  };

  resolved.forEach((res) => {
    assignToMemory(res.memPos, res.value);
  });

  const sum = Array.from(memory.values()).reduce(
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
