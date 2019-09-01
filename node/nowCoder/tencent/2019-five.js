const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function line (line) {
  const num = Number(line.trim());
  febDays(num);
})

function febDays (years) {
  if (years % 4 === 0) {
    console.log(29);
  } else {
    console.log(28);
  }
}