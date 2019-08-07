/**
 * 2. 替换空格
 * 解题思路：直接遍历一遍数组，遇到空格就替换
 * @param {String} str 
 */
function replaceSpace(str) {
  let result = '';
  for (let i = 0; i < str.length; i ++) {
    if (str[i] === ' ') {
      result += '%20';
    } else {
      result += str[i];
    }
  }
  return result;
}
console.log(replaceSpace('We Are Happy.'));