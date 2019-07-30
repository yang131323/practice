/**
 * 66. 加一
 * 解题思路：模拟大数运算过程
 * @param {Array} digits 
 */
var plusOne = function(digits) {
  let temp = 1, i = digits.length - 1;
  while (true) {
    if (i < 0) {
      digits.unshift(temp);
      break;
    }
    temp = +digits[i] + temp;
    digits[i] = temp % 10;
    if (temp <= 9) { break; }
    temp = Math.floor(temp / 10);
    i--;
  }
  return digits;
};