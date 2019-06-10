/**
 * 12. 整数转罗马数
 * 可以进行优化，进行等级划分如1000、100、10三个等级，这样就不用每次都要做十二次运算，每次减少到最多四次运算
 * @param {Number} num 
 */
var intToRoman = function(num) {
  let result = '';
  while (num) {
      (num >= 1000 && (result += 'M') && (num -= 1000)) || (num >= 900 && (result += 'CM') && (num -= 900)) || (num >= 500 && (result += 'D') && (num -= 500)) || (num >= 400 && (result += 'CD') && (num -= 400)) || (num >= 100 && (result += 'C') && (num -= 100)) || (num >= 90 && (result += 'XC') && (num -= 90)) || (num >= 50 && (result += 'L') && (num -= 50)) || (num >= 40 && (result += 'XL') && (num -= 40)) || (num >= 10 && (result += 'X') && (num -= 10)) || (num >= 9 && (result += 'IX') && (num -= 9)) || (num >= 5 && (result += 'V') && (num -= 5)) || (num >= 4 && (result += 'IV') && (num -= 4)) || (num >= 1 && (result += 'I') && (num -= 1));
  }
  return result;
};

console.log(intToRoman(9));