const path = require('path');
const fs = require('fs');

fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  getCounts(data);
});

const getCounts = data => {
  const rows = data.split('\n');

  let outerBags = new Set();
  const getBagPaths = innerBag => {
    rows.forEach(row => {
      const splittedRow = row.split(` ${innerBag}`);
      if (splittedRow.length > 1) {
        const explodedRow = row.split(' ');
        const outerBag = `${explodedRow[0]} ${explodedRow[1]}`;
        outerBags.add(outerBag);
        // console.log({ innerBag, outerBag, row });
        getBagPaths(outerBag);
      }
    });
    return outerBags.size;
  };

  const innerBag = 'shiny gold';
  const counter = getBagPaths(innerBag);
  console.log({ counter });
};
