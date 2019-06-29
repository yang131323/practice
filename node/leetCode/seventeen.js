/**
 * 17. 电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if (!digits) { return []; }
  const mapDig = [[], ['*'], ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']];
  let result = [];
  for (let i = digits.length - 1; i >= 0; i--) {
      let temp = [];
      let cur = mapDig[digits[i]] || [];
      for (let k = 0, le = cur.length; k < le; k++) {
          if (result.length <= 0) { temp.push(cur[k]); }
          for (let j = 0, len = result.length; j < len; j++) {
              temp.push(cur[k] + result[j]);
          }
      }
      result = temp;
  }
  return result;
};