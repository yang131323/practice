
// 测试数据
const testArr = [[1, 2,[3, 4, [6]]], 1, 2, [3, [7, 8, [9, [10]]]]];

/**
 * 工具函数，用于比较最后扁平化的结果是否相等
 * @param {Function} fn 
 */
function judge(fn) {
	const result = fn(testArr);
	const answer = testArr.flat(Infinity);
	return result.join(',') === answer.join(',');
}

/**
 * 使用reduce实现数组扁平化
 * @param {Array} arr 
 */
function reduceFlat (arr) {
  if (!Array.isArray(arr)) { return [arr]; }
  return arr.reduce((a, b) => {
    a = a.concat(Array.isArray(b) ? reduceFlat(b) : b);
    return a;
  }, [])
}

/**
 * 使用concat实现数组扁平化
 * @param {Array} arr 
 */
function concatFlat (arr) {
  if (arr.some((a) => {
    return Array.isArray(a);
  })) {
    return concatFlat([].concat(...arr));
  }
  return  arr;
}