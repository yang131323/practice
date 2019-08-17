#!/usr/bin/env node
const buff = [];

function camel(str) {
  return str.trim().split(/[\-\_\@]/g).map((val, index) => {
    if (index !== 0 && val && /[a-z]/.test(val[0])) {
      return val[0].toUpperCase() + val.substr(1);
    }
    return val;
  }).join('').trim();
};


process.stdin.on('data', (data) => {
    buff.push(data)
});

process.stdin.once('end', () => {
    const input = Buffer.concat(buff).toString('UTF-8');
    process.stdout.write(camel(input));
});