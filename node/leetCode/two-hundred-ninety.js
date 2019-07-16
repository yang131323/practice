/**
 * 290. 单词规律
 * 解题思路：抛弃所有原有数据特性，重新给两个数据进行特性标记，然后比较特性。
 * @param {String} pattern 
 * @param {String} str 
 */
var wordPattern = function(pattern, str) {
  str = str.split(' ');
  pattern = [...pattern];
  let reg = /^\d+$/;
  function convert (arr) {
    let num = 1;
    for (let i = 0; i < arr.length; i++) {
      if (reg.test(arr[i])) { continue; }
      let x = arr[i], index;
      arr[i] = num;
      while ((index = arr.indexOf(x)) && index !== -1) {
        arr[index] = num;
      }
      num++;
    }
    arr = Array.isArray(arr) ? arr : [];
    return arr;
  }
  let reOne = convert(pattern);
  let reTwo = convert(str);
  console.log(reOne, reTwo);
  return reOne.join('') === reTwo.join('');
};

console.log(wordPattern("abba", "dog cat cat dog"));