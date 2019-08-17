const readline = require('readline');
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
})

let readNum = 1, times = [], max = -Infinity, N = 0, X = 0, A = 0, B = 0;
rl.on('line', function (line) {
  switch (true) {
    case readNum === 1:
      N = Number(line.trim());
      break;
    case (readNum > 1 && readNum <= N + 1):
      const temp = line.trim().split(' ');
      times.push(Number(temp[0]) * 60 + Number(temp[1]));
      break;
    case readNum === (N + 2):
      X = Number(line.trim());
      break;
    case readNum === (N + 3):
      const te = line.trim().split(' ');
      A = Number(te[0]);
      B = Number(te[1]);
      break;
  }
  if (readNum === (N + 3)) { latestTime(); }
  readNum++;
})

function latestTime () {
  times.sort((a, b) => {
    return a - b;
  })
  const later = A * 60 + B;
  for (let i = 0; i < times.length; i++) {
    let m = times[i] + X;
    if (m > later) { break; }
    max = max < times[i] ? times[i] : max;
  }
  console.log(Math.floor(max / 60), max % 60);
}