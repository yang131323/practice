/**
 * 125. 验证回文串
 * 解题思路：先对数据进行加工，然后使用双指针进行判断，一旦遇到不满足的就跳出循环。
 * @param {String} s 
 */
var isPalindrome = function(s) {
  s = s.replace(/[^\w]/g, '').toLowerCase();
  if (s.length === 0) { return true; }
  let start = 0, end = s.length - 1;
  while (start < end) {
    if (s[start] !== s[end]) { break; }
    start++;
    end--;
  }
  return start >= end;
};