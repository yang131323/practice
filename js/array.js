// 使用Proxy模拟实现数组或者使用访问器属性模拟实现数组（286）
// 个人觉得扁平化就是递归，比较喜欢concat和reduce版本

/**
 * 多维数组扁平化
 * @param {Array} arr 
 */
function flatReduce (arr) {
  return !Array.isArray(arr) ? [arr] : arr.reduce((a, b) => {
    b = Array.isArray(b) ? flatReduce(b) : [b];
    return [...a, ...b];
  }, [])
}

/**
 * 有一个缺点，所有的数据都会转化为string类型/join
 * @param {Array} arr 
 */
function flatString (arr) {
  return arr.toString().split(',');
}

/**
 * 使用concat进行数组扁平化
 * @param {Array} arr 
 */
function flatConcat(arr) {
  if (!Array.isArray(arr)) { return [arr]; }
  if (arr.some(item => Array.isArray(item))) {
    return flatConcat([].concat(...arr));
  } else { return arr; }
}
