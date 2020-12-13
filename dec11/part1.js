const path = require('path');
const fs = require('fs');

const solve = data => {
  const seating = data.split('\n').map(row => [...row]);
  // console.log({ seating });

  const getSeatStatus = (y1, x1, layout) => {
    const getSeat = (y, x) =>
      y >= 0 && y < layout.length && x >= 0 && x < layout[y].length
        ? layout[y][x]
        : '';

    const getAdjecent = (y, x) => [
      getSeat(y - 1, x - 1),
      getSeat(y - 1, x),
      getSeat(y - 1, x + 1),
      getSeat(y, x - 1),
      getSeat(y, x + 1),
      getSeat(y + 1, x - 1),
      getSeat(y + 1, x),
      getSeat(y + 1, x + 1),
    ];

    const willBeSeated = (y, x) =>
      layout[y][x] === 'L' && !getAdjecent(y, x).some(seat => seat === '#');

    const willBeEmpty = (y, x) =>
      layout[y][x] === '#' &&
      getAdjecent(y, x).reduce((sum, seat) => {
        return seat === '#' ? sum + 1 : sum;
      }, 0) >= 4;

    if (willBeSeated(y1, x1)) {
      return '#';
    } else if (willBeEmpty(y1, x1)) {
      return 'L';
    } else {
      return layout[y1][x1];
    }
  };

  const step = layout => {
    const newLayout = JSON.parse(JSON.stringify(seating));
    for (let y = 0; y < seating.length; y++) {
      const row = seating[y];
      for (let x = 0; x < row.length; x++) {
        const newStatus = getSeatStatus(y, x, layout);
        newLayout[y][x] = newStatus;
      }
    }
    return newLayout;
  };

  const isSameLayout = (layout1, layout2) =>
    layout1.flat().join() === layout2.flat().join();

  const countOccupied = layout =>
    layout.flat().reduce((sum, seat) => (seat === '#' ? sum + 1 : sum), 0);

  let prevRound = seating;
  let newRound = step(prevRound);
  while (!isSameLayout(prevRound, newRound)) {
    prevRound = newRound;
    newRound = step(prevRound);
  }

  const occupied = countOccupied(newRound);
  console.log({ newRound }, occupied);
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
