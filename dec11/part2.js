const path = require('path');
const fs = require('fs');

const solve = data => {
  const seating = data.split('\n').map(row => [...row]);

  const getSeatStatus = (y1, x1, layout) => {
    const getSeat = (y, x) =>
      y >= 0 && y < layout.length && x >= 0 && x < layout[y].length
        ? layout[y][x]
        : '';

    const getVisibleInDirection = (dy, dx) => {
      const getNewCoord = coord => {
        let newCoord;
        if (coord < 0) {
          newCoord = coord - 1;
        } else if (coord > 0) {
          newCoord = coord + 1;
        } else {
          newCoord = 0;
        }
        return newCoord;
      };

      const seat = getSeat(y1 + dy, x1 + dx);
      if (seat !== '.') {
        return seat;
      }
      return getVisibleInDirection(getNewCoord(dy), getNewCoord(dx));
    };

    const getVisibleSeats = (y, x) => {
      return [
        getVisibleInDirection(-1, -1),
        getVisibleInDirection(-1, 0),
        getVisibleInDirection(-1, 1),
        getVisibleInDirection(0, -1),
        getVisibleInDirection(0, 1),
        getVisibleInDirection(1, -1),
        getVisibleInDirection(1, 0),
        getVisibleInDirection(1, 1),
      ];
    };

    const willBeSeated = (y, x) => {
      return (
        layout[y][x] === 'L' &&
        getVisibleSeats(y, x).every(seat => seat !== '#')
      );
    };

    const willBeEmpty = (y, x) =>
      layout[y][x] === '#' &&
      getVisibleSeats(y, x).reduce((sum, seat) => {
        return seat === '#' ? sum + 1 : sum;
      }, 0) >= 5;

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
  console.log({ occupied });
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
solve(data);
var time = new Date() - start;
console.log('Time:', time, 'ms');
