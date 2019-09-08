/**
 * 使用数组自带的sort方法，不是真正的随机
 * @param {Array} arr 
 */
function unSort (arr) {
  if (!Array.isArray(arr)) { throw new TypeError('except a Array'); }
  return arr.sort(val => .5 - Math.random());
}

function fullUnSort (arr) {
  if (!Array.isArray(arr)) { throw new TypeError('except a Array'); }
  const source = arr.slice(), len = arr.length;
  for (let i = len - 1; i >= 0; i--) {
    const index = Math.floor(Math.random() * (i + 1));
    if (index !== i) {
      const temp = source[i];
      source[i] = source[index];
      source[index] = temp;
    }
  }
  return source;
}