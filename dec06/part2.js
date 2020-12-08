const path = require('path');
const fs = require('fs');

fs.readFile(path.resolve(__dirname, 'test2.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  getCounts(data);
});

const getCounts = data => {
  const groupAnswers = data.split('\n\n');

  const yeses = groupAnswers.reduce((sum, group) => {
    const cleanGroup = group.split('\n').join('');
    const groupSet = new Set(cleanGroup);

    console.log({ group, cleanGroup, groupSet });
    return sum + groupSet.size;
  }, 0);

  console.log({ yeses });
};
