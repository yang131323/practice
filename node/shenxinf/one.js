const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

const map = {
  a: 'bcd',
  b: '123',
  c: 'def',
  d: '321',
  e: '11',
  f: 'd',
  g: 'hf',
  h: '2'
}

rl.on('line', function (line) {
  line = line.trim();
  parse(line);
})

function parse (str) {
  if (!str || str && str.length <= 0) { return ''; }
  let result = '';
  for (let i = 0, len = str.length; i < len; i++) {
    if (map[str[i]]) {
      result += map[str[i]];
    } else {
      result += str[i];
    }
  }
  if (Array.from(result).some(val => map[val])) {
    parse(result);
  } else {
    console.log(result);
  }
}