const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  const str = line.trim();
  havePalinDrome(str);
});

function havePalinDrome (str) {
  const len = str.length;
  const map = new Map();
  for (let i = 0; i < len; i++) {
    if (!map.has(str[i])) {
      map.set(str[i], 1);
    } else {
      map.set(str[i], map.get(str[i]) + 1);
    }
  }
  let odd = 0;
  for (let x of map) {
    if (x[1] % 2 === 1 && (++odd) > 1) {
      console.log(0);
      return;
    }
  }
  if (odd <= 1) {
    console.log(1);
  } else {
    console.log(0);
  }
}