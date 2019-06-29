/**
 * 50. Pow(x, n)
 * @param {Number} x 
 * @param {Number} n 
 * @param {Boolean} isR 
 */
var myPow = function myPow (x, n, result = 1, temp = n) {
  if (x === 0 || x === 1) { return x; }
  if (x === -1) {
      if (n % 2 === 1) { return -1; }
      return 1;
  }
  if (n === 0) { return 1; }
  if (temp === 0) {
      if (n > 0) { return result; }
      if (n < 0) { return 1 / result; }
  }
  temp = n > 0 ? temp - 1 : temp + 1;
  result = result * x;
  return myPow(x, n, result, temp);
};

console.log(myPow(1.00001, 123456))