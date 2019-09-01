const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function line(line) {
  flatten(line);
});

function flatten(arr) {
  if (typeof arr === 'string') {
    const reg = /[\[\]]/;
    reg.test(arr) ? (arr = JSON.parse(JSON.stringify(arr.trim()))) : (arr = Number(arr.trim()));
  }
  if (!Array.isArray(arr)) { return [arr]; }
  return arr.reduce((a, b) => {
    return Array.isArray(b) ? a.concat(flatten(b)) : a.concat(b);
  }, []);
}