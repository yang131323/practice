/**
 * 953. 验证外星语词典
 * 解题思路：比较前后两个单词是否是按给定order顺序，前后两个单词大小比较时，要以给定order顺序来比较。
 * @param {Array} words 
 * @param {String} order 
 */
var isAlienSorted = function(words, order) {
  if (words.length === 0 || words.length === 1) { return true; }
  let flag = [], obj = {};
  for (let i = 0; i < order.length; i++) {
    obj[order[i]] = i;
  }
  function compare (one, two) {
    if (two.length > one.length) {
      for (let i = 0; i < one.length; i++) {
        if (obj[one[i]] < obj[two[i]]) { return true; }
        if (obj[one[i]] > obj[two[i]]) { return false; }
      }
      return true;
    } else {
      for (let i = 0; i < two.length; i++) {
        if (obj[one[i]] < obj[two[i]]) { return true; }
        if (obj[one[i]] > obj[two[i]]) { return false; }
      }
      if (one.length === two.length) { return true; }
      return false;
    }
  }
  for (let i = 1; i < words.length; i++) {
    if (!compare(words[i - 1], words[i])) { return false; }
  }
  return true;
};