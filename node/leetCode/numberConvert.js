/**
 * 13. 罗马数字转整数
 */
  var romanToInt = function(s) {
    if (!s) { return 0; }
    // s = s.toLocaleUpperCase();
    const mapObj = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    let pre = '';
    let result = 0;
    for (let i = 0, len = s.length; i < len; i++) {
        let num = mapObj[s[i]]
        if (pre === 'I' && (s[i] === 'V' || s[i] === 'X')) { result += num - 2;}
        else if (pre === 'X' && (s[i] === 'L' || s[i] === 'C')) { result += num - 20; }
        else if (pre === 'C' && (s[i] === 'D' || s[i] === 'M')) { result += num - 200; }
        else { result += num; }
        pre = s[i];
    }
    return result;
};

/**
 * 6. z字形转化
 */
var convert = function(s, numRows) {
  if (numRows === 0 || !s) { return s; }
  let row = 0;
  let col = 0;
  let temp = [];
  let flag = 1;
  temp.length = numRows;
  for (let i = 0, len = s.length; i < len; i++) {
      if (flag === -1) { row++; }
      !temp[col] ? ((temp[col] = []) && (temp[col][row] = s[i])) : temp[col][row] = s[i];
      col = col + flag;
      if (col >= numRows || col < 0) {
          flag *= -1;
          col = col + flag * 2;
      }
  }
  console.log(temp);
  return ;
};

/**
 * 
 * @param {Array} strs 
 */
var longestCommonPrefix = function(strs) {
  let flag = 0;
  while (true) {
      let temp = '';
      for (let i = 0, len = strs.length; i < len; i++) {
          if (i === 0) {
            temp = strs[0][flag];
          }
          else if (temp !== strs[i][flag]) {
              temp = false;
              break;
          }
      }
      if (!temp) { break; }
      flag++;
  }
  return strs[0].substring(0, flag);
};

console.log(longestCommonPrefix(["flower","flow","flight"]));
