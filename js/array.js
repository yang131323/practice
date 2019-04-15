// 使用Proxy模拟实现数组或者使用访问器属性模拟实现数组（286

/**
 * 多维数组扁平化
 * @param {*} arr 
 */
function flatArray (arr) {
  return Array.isArray(arr) ? arr.reduce(function (a, b) {
    let ta = !a ? [] : [...a];
    let tb = !b ? [] : [...flatArray(b)];
    return [...ta, ...tb];
  }, []) : [arr];
}