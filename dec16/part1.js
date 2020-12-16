const path = require('path');
const fs = require('fs');

const solve = (data) => {
  const categories = data.split('\n\n');
  console.log({ values: categories });

  const parseRange = (range) => {
    range = range.split('-');
    const first = parseInt(range[0]);
    const last = parseInt(range[1]);
    const vals = [];
    for (let i = first; i <= last; i++) {
      vals.push(i);
    }
    return vals;
  };

  let fields = new Map();
  let myTicket;
  let nearbyTickets;

  categories.forEach((category) => {
    if (category.startsWith('your ticket')) {
      myTicket = category
        .split('\n')[1]
        .split(',')
        .map((val) => parseInt(val));
    } else if (category.startsWith('nearby tickets')) {
      nearbyTickets = category
        .split('\n')
        .slice(1)
        .join(',')
        .split(',')
        .map((val) => parseInt(val));
    } else {
      const fieldRows = category.split('\n');

      fieldRows.forEach((fieldRow) => {
        const [field, values] = fieldRow.split(': ');
        const ranges = values.split(' or ');
        const allValues = ranges.map((range) => parseRange(range)).flat();
        fields.set(field, allValues);
      });
    }
  });
  // console.log({ fields, myTicket, nearbyTickets });

  const allValues = new Set(Array.from(fields.values()).flat());
  // console.log({ allValues });

  const invalid = [];
  nearbyTickets.forEach((ticket) => {
    if (!allValues.has(ticket)) {
      invalid.push(ticket);
    }
  });

  return invalid.reduce((acc, val) => acc + val, 0);
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
const result = solve(data);
console.log({ result });
var time = new Date() - start;
console.log('Time:', time, 'ms');
