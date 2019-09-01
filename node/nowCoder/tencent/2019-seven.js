const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

let readNum = 1, n = 0;
const arr = []; // ai, bi;

rl.on('line', function line(line) {
  switch (readNum) {
    case 1:
      n = Number(line.trim());
      break;
    default: 
      const temp = line.trim().split(' ').map(val => Number(val));
      arr.push(temp);
      break;
  }
  if (readNum === n + 1) {
    smallHate();
    readNum = 0;
    n = 0;
  }
  readNum++;
});

function smallHate(arr, n) {
  const aSort = arr.slice(0);
  const bSort = arr.slice(0);
  aSort.sort((a, b) => {
    if (a[0] < b[0] || a[0] > b[0]) { return b[0] - a[0]; }
    return a[1] - b[1];
  });
  bSort.sort((a, b) => {
    if (a[1] < b[1] || a[1] > b[1]) { return a[1] - b[1] };
    return b[0] - a[0];
  })
  let aSum = 0, bSum = 0;
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      aSum += aSort[i][1] * (n - 1);
      bSum += bSort[i][1] * (n - 1);
    } else if (i === n - 1) {
      aSum += aSort[i][0] * (n - 1);
      bSum += bSort[i][0] * (n - 1);
    } else {
      aSum += aSort[i][1] * (n - i - 1) + aSort[i][0] * i;
      bSum += bSort[i][1] * (n - i - 1) + bSort[i][0] * i;
    }
  }
  console.log(Math.min(aSum, bSum));
}

// console.log(smallHate([[1, 3], [1, 1], [4, 1]], 3));