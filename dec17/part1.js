const path = require('path');
const fs = require('fs');

const solve = (data) => {
  const grid = data.split('\n').map((row) => row.split(''));

  const printGrid = (grid) => {
    console.log('----');
    grid.forEach((layer) => {
      console.log(layer);
    });
    console.log('----');
  };

  const enlargeGrid = (grid) => {
    const height = grid[0].length + 2;
    const width = grid[0][0].length + 2;

    const enlarged = [
      new Array(height).fill(new Array(width).fill('.')),
      ...grid.map((layer) => [
        new Array(width).fill('.'),
        ...layer.map((row) => ['.', ...row, '.']),
        new Array(width).fill('.'),
      ]),
      new Array(height).fill(new Array(width).fill('.')),
    ];
    return enlarged;
  };

  const getNeighbourCubeValues = (cube, grid) => {
    const { x1, y1, z1 } = cube;
    const neighbours = [];
    for (let z = z1 - 1; z !== z1 + 2; z++) {
      for (let y = y1 - 1; y !== y1 + 2; y++) {
        for (let x = x1 - 1; x !== x1 + 2; x++) {
          if (
            z >= 0 &&
            z < grid.length &&
            y >= 0 &&
            y < grid[0].length &&
            x >= 0 &&
            x < grid[0][0].length
          ) {
            // Exclude the cube itself
            if (!(x === x1 && y === y1 && z === z1)) {
              neighbours.push(grid[z][y][x]);
            }
          }
        }
      }
    }
    return neighbours;
  };

  const getNewGrid = (enlargedGrid) => {
    const newGrid = Array.from({ length: enlargedGrid.length }).map((_) =>
      Array.from({ length: enlargedGrid[0].length }).map((_) =>
        Array.from({ length: enlargedGrid[0][0].length })
      )
    );
    for (let z = 0; z < enlargedGrid.length; z++) {
      for (let y = 0; y < enlargedGrid[0].length; y++) {
        for (let x = 0; x < enlargedGrid[0][0].length; x++) {
          const cube = enlargedGrid[z][y][x];
          const neighbourValues = getNeighbourCubeValues(
            { x1: x, y1: y, z1: z },
            enlargedGrid
          );
          const activeNeighbours = neighbourValues.filter((val) => val === '#')
            .length;
          if (
            cube === '#' &&
            (activeNeighbours === 2 || activeNeighbours === 3)
          ) {
            newGrid[z][y][x] = '#';
          } else if (cube === '.' && activeNeighbours === 3) {
            newGrid[z][y][x] = '#';
          } else {
            newGrid[z][y][x] = '.';
          }
        }
      }
    }
    return newGrid;
  };

  const cycle = (grid) => {
    const enlargedGrid = enlargeGrid(grid);
    const newGrid = getNewGrid(enlargedGrid);
    return newGrid;
  };

  const grid0 = [grid];

  let currentGrid = grid0;
  for (let i = 0; i < 6; i++) {
    currentGrid = cycle(currentGrid);
  }

  return currentGrid.flat(2).filter((cell) => cell === '#').length;

  // enlargeGrid([
  //   [
  //     ['.', '#', '.'],
  //     ['.', '.', '#'],
  //     ['#', '#', '#'],
  //   ],
  // ]);
};

const data = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
var start = new Date();
const result = solve(data);
console.log({ result });
var time = new Date() - start;
console.log('Time:', time, 'ms');
