const fs = require('fs');

fs.readFile(__dirname + '/path.js', (err, data) => {
  if (err) { throw err; }
  console.log(data);
})