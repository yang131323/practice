const readline = require('readline');
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

let readNum = 1, N = 0, persons = [];
rl.on('line', function (line) {
  switch (readNum) {
    case 1:
      N = Number(line.trim());
      break;
    case 2:
      persons = line.trim().split(' ').map(val => Number(val));
      break;
  }
  if (readNum === 2) { lessMoney(); }
  readNum++;
})

function lessMoney () {
  if (N === 1) {
    console.log(100);
    return;
  }
  let arr = [], sum = 0;
  for (let i = 0; i < N; i++) {
    arr.push(i);
  }
  arr.sort((a, b) => {
    return persons[a] - persons[b];
  })
  for (let i = 0; i < N; i++) {
    if (i === 0) {
      persons[arr[i]] = 100;
      sum += 100;
      continue;
    }
    if (arr[i] === N - 1) {
      persons[N - 1] = persons[N - 2] >= 100 ? (persons[N - 2] % 100 === 0 ? (persons[N - 2] + 100) : 100): 100;
      sum += persons[N - 1];
      continue;
    }
    if (arr[i] === 0) {
      persons[0] = persons[1] >= 100 ? (persons[1] % 100 === 0 ? (persons[1] + 100) : 100): 100;
      sum += persons[0];
      continue;
    }
    persons[arr[i]] = persons[arr[i] - 1] > persons[arr[i] + 1] ? (persons[arr[i] - 1] % 100 === 0 ? (persons[arr[i] - 1] + 100) : 100) : (persons[arr[i] + 1] % 100 === 0 ? (persons[arr[i] + 1] + 100) : 100);
    sum += persons[arr[i]];
  }
  console.log(sum);
}