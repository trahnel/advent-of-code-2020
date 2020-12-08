const path = require('path');
const fs = require('fs');

fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  countYeses(data);
});

const countYeses = data => {
  const groupAnswers = data.split('\n\n');

  const counter = group => {
    const answers = group.split('\n');

    let remainingChars = new Set(answers[0]);
    answers.shift();
    answers.forEach(answer => {
      remainingChars.forEach(remainingChar => {
        if (!answer.includes(remainingChar)) {
          remainingChars.delete(remainingChar);
        }
      });
    });
    // console.log({ remainingChars });
    return remainingChars.size;
  };

  const yeses = groupAnswers.reduce((sum, group) => {
    return sum + counter(group);
  }, 0);

  console.log({ yeses });
};
