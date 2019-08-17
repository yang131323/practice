const readline = require('readline');
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
})

let readNum = 1, arr = [], valMap = {};
rl.on('line', function (line) {
  switch (readNum) {
    case 1:
      arr = line.trim().split(' ').map(val => Number(val));
      break;
    default:
      const temp = line.trim().split(' ');
      const len = Number(temp[0]);
      for (let i = 1; i <= len; i++) {
        if (!valMap[temp[i]]) { valMap[temp[i]] = []; }
        valMap[temp[i]].push(readNum - 1);
      }
      break;
  }
  if (readNum === arr[0] + 1) {
    colorNum();
  }
  readNum++;
})

function colorNum () {
  let sum = 0;
  // console.log(valMap);
  for (let x in valMap) {
    const len = valMap[x].length;
    if (len === 1 && arr[1] > 1) { continue; }
    else if (len === 1 && arr[1] === 1) {
      sum++;
      continue;
    }
    // console.log(x + ': ', valMap[x]);
    for (let i = 0; i < len; i++){
      if (i === 0 && (arr[0] - valMap[x][len - 1] + valMap[x][0] <= arr[1] - 1)) {
        sum++;
        break;
      }
      if (i > 1 && (valMap[x][i] - valMap[x][i - 1] <= arr[1] - 1)) {
        sum++;
        break;
      }
    }
  }
  console.log(sum);
}