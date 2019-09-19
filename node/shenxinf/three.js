// const readline = require('readline');

// const rl = readline.Interface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.on('line', function (line) {
//   const arr = line.trim().split(',');
//   if (arr[arr.length - 1] === '') { arr.pop(); }
//   judgePort(arr);
// });

function judgePort (arr) {
  let sum = 0, map = {};
  for (let x of arr) {
    if (x.indexOf('-') ) {
      let keys = x.split('-');
      for (let i = Number(keys[0]); i <= Number(keys[1]); i++) {
        if (Number(i) > 65535 || Number(i) < 0) {
          console.log(false);
          return;
        }
        if (map[i]) { continue; }
        else {
          sum++;
          map[i] = true;
        }
      }
    } else {
      if (Number(x) > 65535 || Number(x) < 0) {
        console.log(false);
        return;
      }
      map[x] ? '' : (sum++ && (map[x] = true));
    }
  }
  if (sum > 1024) {
    console.log(false);
    return;
  }
  console.log(true);
}

judgePort(['100-400', '65536']);