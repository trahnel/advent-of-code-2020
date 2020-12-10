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
  const bags = new Map();

  const rows = data.split('\n');

  rows.forEach(row => {
    const innerAndOuter = row.split(' contain ');
    const outerBags = innerAndOuter[0].substring(
      0,
      innerAndOuter[0].lastIndexOf(' ')
    );
    const innerBags = innerAndOuter[1];

    if (innerBags !== 'no other bags.') {
      const allInnerBags = innerBags.split(', ').map(innerBag => {
        const count = parseInt(innerBag.substring(0, innerBag.indexOf(' ')));
        const color = innerBag
          .substring(0, innerBag.lastIndexOf(' '))
          .substring(innerBag.indexOf(' ') + 1);
        return { color, count };
      });
      bags.set(outerBags, allInnerBags);
    }
  });

  // console.log({ bags });

  const getBagCount = (outerCount, outerColor) => {
    if (!bags.has(outerColor)) {
      console.log(`Total of ${outerCount} ${outerColor} bags, nothing within.`);
      return outerCount;
    }

    const innerBags = bags.get(outerColor);
    const innerBagsCount = innerBags.reduce((sum, bag) => {
      return sum + getBagCount(outerCount * bag.count, bag.color);
    }, 0);
    console.log(
      `Total of ${outerCount} ${outerColor} bags, including ${innerBagsCount} bags within.`
    );
    return outerCount + innerBagsCount;
  };

  const outerBag = 'shiny gold';
  const bagCount = getBagCount(1, outerBag);
  console.log('Part2', bagCount - 1);
};
