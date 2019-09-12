// const readline = require('readline');

// const rl = readline.Interface({
//   input: process.stdin,
//   output: process.stdout
// });

let str = [], mapObj = {};

// rl.on('line', function (line) {
//   str = line.trim().split(' ');
//   if (str.length > 0) { lengString(); }
// });

function lengString () {
  if (str[0].length <= 0 || str[1].length <= 0) { console.log('result='); }
  let len1 = str[0].length, result = '',len2 = str[1].length, item, temp = '', node;
  let flag1 = 0, flag2 = 0;
  for (let i = 0; i < len1; i++) {
    item = str[0][i];
    if (!mapObj[item]) { mapObj[item] = []; }
    mapObj[item].push(i);
  }
  for (let i = 0; i < len2; i++) {
    item = str[1][i];
    if (!mapObj[item]) {
      // result = result.length >= temp.length ? result : temp;
      // temp = '';
      continue;
    }
    flag2 = i;
    node = mapObj[item];
    for (let j = 0; j < node.length; j++) {
      flag1 = node[j];
      while (str[1][flag2] !== str[0][flag1]) {
        temp += str[0][flag1];
        flag1++;
        flag2++;
      }
      result = result.length >= temp.length ? result : temp;
      temp = '';
    }
  }
  console.log('result=' + result);
}

str = ['afhelk', 'afdzhelos'];

console.log(lengString())