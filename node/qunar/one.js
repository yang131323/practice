const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  const str = line.trim();
  if (str) { distanceTime(str); }
});

function distanceTime (s) {
  const arr = s.split('-');
  for (let i = 1; i < arr.length; i++) {
    arr[i].length === 1 ? (arr[i] = '0' + arr[i]) : arr[i];
  }
  s = arr.join('-');
  const date = (new Date(s)).getTime() / (1000 * 60); // 以分为单位
  const tenOne = (new Date('2019-10-01')).getTime() / (1000 * 60);
  if (s === '2019-10-01' || date >= tenOne) {
    console.log('国庆节快乐');
    return;
  }
  const days = (tenOne - date) / (60 * 24);
  switch (true) {
    case days < 1:
      console.log('明天是国庆节');
      break;
    case days < 2:
      console.log('后天是国庆节');
      break;
    default:
      console.log(`距离国庆节还有${Math.round(days)}天`);
      break;
  }
}

// console.log(distanceTime());

// function distanceTime (s) {
//   const date = (new Date(s)).getTime() / (1000 * 60); // 以分为单位
//   const tenOne = (new Date('2019-10-01')).getTime() / (1000 * 60);
//   if (s === '2019-10-01' || date >= tenOne) {
//     print('国庆节快乐');
//     return;
//   }
//   const days = (tenOne - date) / (60 * 24);
//   switch (true) {
//     case days < 1:
//       print('明天是国庆节');
//       break;
//     case days < 2:
//       print('后天是国庆节');
//     default:
//       print(`距离国庆节还有${Math.round(days)}天`);
//       break;
//   }
// }

// function getData() {
//     const line = read_line();
//     if (line.trim()) { distanceTime(line.trim()); }
// }

// getDate();