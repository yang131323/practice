var isPerfectSquareOne = function(num) {
  if (num === 0) { return false; }
  function judge (start, end) {
    let temp = -1;
    for (let i = start; i <= end; i++) {
      temp = i * i;
      if (temp > num) { return false; }
      if (temp === num) { return true; }
    }
    return false;
  }
  if (num < 16) {
    return judge(0, Math.ceil(num / 2));
  } else {
    return judge(4, Math.ceil(num / 4));
  }
};

/**
 * 367. 有效的完全平方数
 * 解题思路：每次试探性扩大两倍，如果大于给定数值，恢复原值加一，循环结束条件：当本数值平方小于num，本数值加一大于num时。
 * @param {*} num 
 */
var isPerfectSquare = function(num) {
  if (num === 0) { return false; }
 for (let i = 1; !(i * i < num && (i + 1) * (i + 1) > num);) {
     if (i * i === num) { return true; }
     else if (i * i > num) { i = Math.ceil(i * 0.5) + 1; }
     else if (i * i < num) { i = i * 2; }
 }
    return false;
};