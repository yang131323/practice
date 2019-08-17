// const readline = require('readline');

// const rl = readline.Interface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.on('line', function (line) {
//   const arr = line.trim().split('.').map(val => Number(val));
//   judgeIsIp4(arr);
// })

// function judgeIsIp4 ([a, b, c, d]) {
//   let result = false;
//   if (a > 255 || b > 255 || c > 255 || d > 255 || a < 0 || b < 0 || c < 0 || d < 0) {
//     console.log(false);
//     return;
//   }
//   if (a === 10 || (a === 127 && b === 0 && c === 0 && d === 0)) {
//     result = true;
//   } else if (a === 172 && b >= 16 && b <= 31) {
//     result = true;
//   } else if (a === 192 && b === 172) {
//     result = true;
//   }
//   console.log(result);
// }

const buff = [];

function isPrivate(ip){
  let result = false;
  try {
    const index = ip.indexOf('/');
    let temp = 0;
    if (index > -1) {
      tmep = Number(ip.substr(index + 1));
      ip = ip.substring(0, index);
      console.log('ip: ', ip);
    }
    let [a, b, c, d] = ip.trim().split('.').map(val => Number(val));
    console.log(a, b, c, d);
    if (a > 192 || b > 255 || c > 255 || d > 255 || a < 0 || b < 0 || c < 0 || d < 0 || temp > 32 || temp < 0) {
      console.log(false);
      return;
    }
    if (a === 10 || (a === 127 && b === 0 && c === 0 && d === 0)) {
      result = true;
    } else if (a === 172 && b >= 16 && b <= 31) {
      result = true;
    } else if (a === 192 && b === 168) {
      result = true;
    }
  } catch (e) {
    result = false
  } finally {
    return result;
  }
}

process.stdin.on('data', (data) => {
    buff.push(data)
});

process.stdin.once('end', () => {
    const input = Buffer.concat(buff).toString('UTF-8');
    const res = isPrivate(input);
    console.log(res);
});