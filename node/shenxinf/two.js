// const readline = require('readline');

// const rl = readline.Interface({
//   input: process.stdin,
//   output: process.stdout
// });

// let readNum = 1, url, q;
// rl.on('line', function (line) {
//   switch (true) {
//     case (readNum % 2 === 1):
//       url = line.trim();
//       break;
//     case (readNum % 2 === 0):
//       q = line.trim();
//       judgeQuery();
//       break;
//   }
//   readNum++;
// });

function judgeQuery (url = 'http://www.google.com/?q=undefined&', q = '') {
  if (!q) { return false; }
  const temp = url ? url.split('?')[1] : '';
  let query = {};
  if (temp) {
    temp.split('&').map(val => {
      let keys = val.split('=');
      query[keys[0]] = keys[1] === undefined ? '' : keys[1];
    });
  }
 let result = query[q] !== undefined ? true : false;
 console.log(result);
}

console.log(judgeQuery());