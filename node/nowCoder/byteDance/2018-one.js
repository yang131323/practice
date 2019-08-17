var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let readNum = 1, num = 0, valMap = {}, q = 0;
rl.on('line', function (line) {
  if (readNum === 1) { num = Number(line.trim()); }
  else if (readNum === 2) {
    const users = line.trim().split(' ');
    for (let i = 1; i <= num; i++) {
      if (!valMap[users[i - 1]]) { valMap[users[i - 1]] = new Set(); }
      valMap[users[i - 1]].add(Number(i));
    }
  }
  else if (readNum === 3) { q = Number(line.trim()); }
  else {
    const arr = line.trim().split(' ').map(val => Number(val));
    getUserNumber(arr);
  }
  readNum++;
})

function getUserNumber ([l, r, k]) {
  let sum = 0;
  if (!valMap[k] || valMap[k].length <= 0) {
    console.log(sum);
    return;
  }
  if ((r - l + 1) < valMap[k].length) {
    for (let i = l; i <= r; i++) {
      if (valMap[k].has(i)) { sum++; }
    }
  } else {
    valMap[k].forEach(val => {
      if (val >= l && val <= r) { sum++; }
    })
  }
  console.log(sum);
}
