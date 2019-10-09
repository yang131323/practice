const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  let min = Infinity, max = -Infinity;
  line.trim().split(',').forEach(val => {
    val = Number(val);
    min = min > val ? val : min;
    max = max < val ? val : max;
  });
  console.log(max);
  console.log(min);
  console.log(max - min);
});