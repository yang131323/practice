const fs = require('fs');

function getFile (name) {
  return __dirname + '/' + name;
 }

const A = getFile('path.js');
const B = getFile('fs.js');
const C = getFile('c.js');

/**
 * 将函数封装为返回Promise形式
 * @param {Function} fn 
 */
function promisify (fn) {
  return function (...args) {
    const self = this;
    return new Promise((resolve, reject) => {
      fn.apply(self, [...args, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }]);
    });
  }
}

/**
 * 生成器运行器
 * @param {Generator} iterator 
 */
function run (iterator) {
  return new Promise((resolve, reject) => {
    function next (val) {
      let {value, done} = iterator.next(val)
      if (done) {
        resolve();
      } else {
        value.then((data) => {
          console.log(data);
          next(data);
        }).catch((e) => {
          reject(e);
        })
      }
    }
    next();
  });
}

const readFile = promisify(fs.readFile);

function *read () {
  const a = yield readFile(A, 'utf-8');
  console.log('a: ' + a);
  const b = yield readFile(B, 'utf-8');
  console.log('b: ' + b);
  const c = yield readFile(C, 'utf-8');
  console.log('c: ' + c);
}

run(read()).then((data) => {
  console.log('data: ' + data);
}).catch((e) => {
  console.log(e);
})