const path = require('path');

console.log('dirname: ' + __dirname);
console.log('filename: ' + __filename);
console.log('cwd: ' + process.cwd());
console.log('./: ' + path.resolve('./'));