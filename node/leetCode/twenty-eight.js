/**
 * 28. 实现strStr()
 * 解题思路：通过匹配不断增加匹配索引，一旦未完成匹配，应该回退到匹配成功的第一位的后一位。
 * @param {String} haystack 
 * @param {String} needle 
 */
var strStr = function(haystack, needle) {
  if (needle.length <= 0 ) { return 0; }
  let end = 0, len = needle.length;
  for (let i = 0; i < haystack.length; i++) {
    if (end === len) { return i - len; }
    if (needle[end] === haystack[i]) { end++; }
    else {
      end > 0 ? (i = i - end) : 0;
      end = 0;
    }
  }
  if (end === len) { return haystack.length - len; }
  return -1;
};

console.log(strStr("mississippi", "pi"));