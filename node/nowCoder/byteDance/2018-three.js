const readline = require('readline');
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
})

let readNum = 1, arr = [], rooms = [];
rl.on('line', function (line) {
  switch (readNum) {
    case 1:
      arr = line.trim().split(' ').map(val => Number(val));
      break;
    default:
      rooms = line.trim().split(' ').map(val => Number(val));
      personNum();
      break;
  }
  readNum++;
})

function personNum () {
  let len = arr[0], min = Infinity, sign = arr[1] - 1, flag = -1;
  while (true) {
    if (flag !== -1 && sign === (arr[1] - 1)) {
      let temp = flag >= arr[1] - 1 ? (len - flag - 1 + arr[1]) : (arr[1] - flag - 1);
      rooms[flag] = temp;
      break;
    }
    if (min > rooms[sign]) {
      min = rooms[sign];
      flag = sign;
    }
    if (min === 0) {
      let temp = flag >= arr[1] - 1 ? (len - flag - 1 + arr[1]) : (arr[1] - flag - 1);
      rooms[flag] = temp;
      break;
    }
    rooms[sign]--;
    sign = (sign - 1 + arr[0]) % arr[0];
  }
  if ((flag !== arr[1] - 1 && min === 1) || min > 1) {
    for (let i = 0; i < len; i++) {
      if (i === flag) { continue; }
      if ((flag <= arr[1] - 1 && (i < flag || i >= arr[1])) || (flag > arr[1] - 1 && i >= arr[i] && i < flag)) {
        rooms[i] = rooms[i] - min + 1;
      } else {
        rooms[i] = rooms[i] - min;
      }
    }
    if (flag === arr[1] - 1) { rooms[flag] += len * (min - 1); }
    else { rooms[flag] += len * min; }
  }
  console.log(rooms.join(' '));
}
