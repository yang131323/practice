const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

let n = 0, m = 0, readNum = 1, evenCases = [], oddCases = [], evenKeys = [], oddKeys = [];

rl.on('line', function line(line) {
  let temp;
  switch (true) {
    case (readNum % 3 === 1): 
      temp = line.trim().split(' ').map(val => Number(val));
      n = temp[0];
      m = temp[1];
      break;
    case (readNum % 3 === 2):
      temp = line.trim().split(' ');
      temp.forEach(val => {
        val = Number(val);
        val % 2 === 0 ? evenCases.push(val) : oddCases.push(val);
      });
      break;
    default:
      temp = line.trim().split(' ');
      temp.forEach(val => {
        val = Number(val);
        val % 2 === 0 ? evenKeys.push(val) : oddKeys.push(val);
      });
      lookUp();
      break;
  }
  readNum++;
});

function lookUp() {
  if (n <= 0 || m <= 0) {
    console.log(0);
    return;
  }
  let result = 0;
  result = Math.min(evenCases.length, oddKeys.length) + Math.min(oddCases.length, evenKeys.length);
  console.log(result);
}