const readline = require('readline');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
})

const reg = /(\d+)/;
rl.on('line', function (line) {
  const s = line.trim();
  unZip(s);
})

function unZip (s) {
  let stack = [], brack = 0, result = '', temp = 0, str = '', stackS = [];
  while (s.length !== 0) {
    if (s[0] === '|') {
      s = s.substr(1);
      continue;
    }
    if (s[0] === '[') {
      str.length > 0 ? stackS.push(str) : '';
      str = '';
      brack++;
      s = s.substr(1);
    } else if (s[0] === ']') {
      s = s.substr(1);
      temp = stack.pop();
      str = str.repeat(temp);
      if (stackS.length === 0) {
        result += str;
        str = '';
      } else { str = stackS.pop() + '' + str; }
      brack--;
    } else if (/[0-9]/.test(s[0])) {
      temp = reg.exec(s)[1];
      stack.push(Number(temp));
      s = s.substr(temp.length);
    } else if (brack === 0 && /[A-Z]/.test(s[0])) {
      result += s[0];
      s = s.substr(1);
    } else {
      str += s[0];
      s = s.substr(1);
    }
  }
  console.log(result);
}
