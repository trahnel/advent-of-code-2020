const path = require('path');
const fs = require('fs');

// Part 1
fs.readFile(path.resolve(__dirname, 'input04.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const passports = data.split('\n\n');

  const validPassports = passports.reduce((sum, passport) => {
    const byr = passport.includes('byr');
    const iyr = passport.includes('iyr');
    const eyr = passport.includes('eyr');
    const hgt = passport.includes('hgt');
    const hcl = passport.includes('hcl');
    const ecl = passport.includes('ecl');
    const pid = passport.includes('pid');
    const valid = byr && iyr && eyr && hgt && hcl && ecl && pid;
    return valid ? sum + 1 : sum;
  }, 0);
  console.log('Part1', validPassports);
});

const validatePassport = passport => {
  const byr = new RegExp('\\bbyr:(19[2-9][0-9]|200[0-2])\\b').test(passport); // 1920 - 2002
  const iyr = new RegExp('\\biyr:(201[0-9]|2020)\\b').test(passport); // 2010-2020
  const eyr = new RegExp('\\beyr:(20[1-2][0-9]|2030)\\b').test(passport); // 2010-2030
  const hgt = new RegExp(
    '\\bhgt:((1[5-8][0-9]|19[0-3])cm)|((59|6[0-9]|7[0-6])in)\\b'
  ).test(passport);
  const hcl = new RegExp('\\bhcl:#[a-f0-9]{6}\\b').test(passport);
  const ecl = new RegExp('\\becl:(amb|blu|brn|gry|grn|hzl|oth)\\b').test(
    passport
  );
  const pid = new RegExp('\\bpid:[0-9]{9}\\b').test(passport);
  // console.log(byr, iyr, eyr, hgt, hcl, ecl, pid);
  const valid = byr && iyr && eyr && hgt && hcl && ecl && pid;
  return valid;
};

// Part 2
fs.readFile(path.resolve(__dirname, 'input04.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const passports = data.split('\n\n');

  const validPassports = passports.reduce((sum, passport) => {
    const valid = validatePassport(passport);
    return valid ? sum + 1 : sum;
  }, 0);
  console.log('Part2', validPassports);
});
